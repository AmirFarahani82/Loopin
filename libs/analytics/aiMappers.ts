import { Frequency, Habit, HabitAnalysisData, HabitLog } from "@/app/types";
import { createClient } from "@/utils/supabase/server";
import { getAllHabits, getHabitLog, requireSession } from "../data/habits";
import { getAiInsightData } from "../data/habitAnalysis";
import { createAnalysisData } from "./core";
import OpenAI from "openai";
function isScheduledDay(frequency: Frequency, dateStr: string): boolean {
  if (frequency.type === "daily") return true;

  const d = new Date(dateStr + "T12:00:00Z");
  const dayIndex = d.getUTCDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

  return frequency.days.includes(dayNames[dayIndex]);
}
function getDateBefore(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().split("T")[0];
}

function summarizeRange(
  habit: Habit,
  logs: HabitLog[],
  dates: string[],
  timezone: string,
) {
  const createdDate = new Date(habit.created_at).toLocaleDateString("en-CA", {
    timeZone: timezone,
  });
  let scheduled = 0;
  let completed = 0;
  let totalValue = 0;
  dates.forEach((date) => {
    if (date < createdDate) return;
    if (isScheduledDay(habit.frequency, date)) {
      scheduled++;
      const logDay = logs.find((log) => log.date === date);
      if (logDay?.status === "completed") completed++;
      if (habit.type === "count" && logDay?.value) totalValue += logDay.value;
    }
  });
  return {
    scheduled,
    completed,
    successRate: scheduled > 0 ? Math.round((completed / scheduled) * 100) : 0,
    ...(habit.type === "count" && { totalValue, unit: habit.unit }),
  };
}

export function createDailyAiPayload(
  analysisData: HabitAnalysisData[],
  today: string,
) {
  const payload = analysisData.map(({ habit, stats, logs }) => {
    const todayLog = logs.find((log) => log.date === today);
    const isScheduled = isScheduledDay(habit.frequency, today);
    let statusToday = "pending";
    if (todayLog) {
      statusToday = todayLog.status;
    } else if (!isScheduled) {
      statusToday = "not_scheduled";
    }

    return {
      habit: habit.name,
      status: statusToday,
      Currentstreak: stats?.currentStreak ?? 0,
      successRate: stats?.completionRate ?? 0,
    };
  });
  return payload;
}

export function createWeeklyAiPayload(
  analysisData: HabitAnalysisData[],
  today: string,
  timezone: string,
) {
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    getDateBefore(today, i + 1),
  );
  const previous7Days = Array.from({ length: 7 }, (_, i) =>
    getDateBefore(today, i + 8),
  );
  const payload = analysisData.map(({ habit, stats, logs }) => {
    const currentWeek = summarizeRange(habit, logs, last7Days, timezone);
    const previousWeek = summarizeRange(habit, logs, previous7Days, timezone);

    return {
      habit: habit.name,
      currentStreak: stats?.currentStreak ?? 0,
      currentWeek,
      previousWeek,
      overallSuccessRate: stats?.completionRate ?? 0,
    };
  });

  return payload.filter(
    (p) => p.currentWeek.scheduled > 0 || p.previousWeek.scheduled > 0,
  );
}
export async function getOrGenerateInsight(
  type: "daily" | "weekly",
  systemPrompt: string,
  periodKey: string,
) {
  const supabase = await createClient();
  const user = await requireSession();
  const [habits, habitLogs, habitsAnalysis] = await Promise.all([
    getAllHabits(),
    getHabitLog(),
    getAiInsightData(),
  ]);
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: user.timezone,
  });

  const analysisData = createAnalysisData(habits, habitLogs, habitsAnalysis);
  const payload =
    type === "weekly"
      ? createWeeklyAiPayload(analysisData, today, user.timezone)
      : createDailyAiPayload(analysisData, today);

  const { data: existingInsight, error } = await supabase
    .from("ai_insights")
    .select("content, created_at")
    .eq("user_id", user.id)
    .eq("type", type)
    .eq("period_key", periodKey)
    .maybeSingle();
  if (error) {
    throw new Error(`Failed to fetch ai insight - ${error.message}`);
  }

  if (existingInsight) {
    if (type === "weekly") return existingInsight.content;

    const todayLogs = habitLogs.filter((log) => log.date === today);
    const latestLogTime =
      todayLogs.length > 0
        ? Math.max(...todayLogs.map((log) => new Date(log.logged_at).getTime()))
        : null;

    const isStale =
      latestLogTime !== null &&
      existingInsight &&
      latestLogTime > new Date(existingInsight.created_at).getTime();

    if (type === "daily" && !isStale) return existingInsight.content;
  }

  const openai = new OpenAI({
    apiKey: process.env.NINEROUTER_API_KEY,
    baseURL: process.env.AI_BASE_URL,
  });
  const userContext = {
    name: user.name,
    currentDate: today,
    currentPeriod: periodKey,
  };
  const completion = await openai.chat.completions.create({
    model: process.env.AI_MODEL!,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: JSON.stringify({
          context: userContext,
          habitData: payload,
        }),
      },
    ],
    temperature: 0.5,
    max_tokens: 2000,
    response_format: { type: "json_object" },
  });
  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Ai returned empty content");

  const insight = JSON.parse(content);

  const { error: insertError } = await supabase.from("ai_insights").upsert(
    {
      created_at: new Date().toISOString(),
      user_id: user.id,
      type: type,
      period_key: periodKey,
      content: insight,
    },
    { onConflict: "user_id, type, period_key" },
  );
  if (insertError && insertError.code !== "23505") {
    throw new Error(`Failed to fetch ai insight - ${insertError.message}`);
  }
  return insight;
}
