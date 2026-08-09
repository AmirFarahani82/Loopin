import OpenAI from "openai";
import { createClient } from "@/utils/supabase/server";
import { getAllHabits, getHabitLog, requireSession } from "../data/habits";
import { getHabitAnalysis } from "../data/habitAnalysis";
import { createAnalysisData } from "./core";
import { createDailyAiPayload } from "./aiMappers";
function createDailyPeriodKey(timezone: string) {
  const now = new Date();
  const dateForamtter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
  });
  const date = dateForamtter.format(now);
  const hour = Number(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      hour12: false,
      hour: "2-digit",
    }).format(now),
  );
  if (hour < 9) {
    const previousDay = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const previousDate = dateForamtter.format(previousDay);
    return `${previousDate}_21-24`;
  }
  const bucket = Math.floor((hour - 9) / 3);

  const periods = ["09-12", "12-15", "15-18", "18-21", "21-24"];
  return `${date}_${periods[bucket]}`;
}
export async function getDailyAiInsight() {
  const supabase = await createClient();
  const user = await requireSession();

  const periodKey = createDailyPeriodKey(user.timezone);
  if (!periodKey) return null;

  const [habits, habitLogs, habitsAnalysis] = await Promise.all([
    getAllHabits(),
    getHabitLog(),
    getHabitAnalysis(),
  ]);
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: user.timezone,
  });

  const analysisData = createAnalysisData(habits, habitLogs, habitsAnalysis);
  const payload = createDailyAiPayload(analysisData, today);

  const { data: existingInsight, error } = await supabase
    .from("ai_insights")
    .select("content, created_at")
    .eq("user_id", user.id)
    .eq("type", "daily")
    .eq("period_key", periodKey)
    .maybeSingle();
  if (error) {
    throw new Error(`Failed to fetch ai insight - ${error.message}`);
  }
  const todayLogs = habitLogs.filter((log) => log.date === today);
  const latestLogTime =
    todayLogs.length > 0
      ? Math.max(...todayLogs.map((log) => new Date(log.logged_at).getTime()))
      : null;

  const isStale =
    latestLogTime !== null &&
    existingInsight &&
    latestLogTime > new Date(existingInsight.created_at).getTime();

  if (existingInsight && !isStale) {
    return existingInsight.content;
  }

  const openai = new OpenAI({
    apiKey: process.env.NINEROUTER_API_KEY,
    baseURL: "https://9router-production-d75c.up.railway.app/v1",
  });
  const systemPrompt = `You are an empathetic, insightful, and data-driven personal habit coach.
Your task is to analyze the user's daily habit tracking data and provide a personalized daily insight.

GUIDELINES:
1. Output Format: Return ONLY a valid JSON object. Do not include markdown code block syntax.
2. The current date and period provided in the user message are authoritative.
3. Always use the current period when choosing time-sensitive greetings.
4. Never infer the time of day from habit data
5. Use the current period only to understand the general time context.
6. Response Language: English for all JSON text values.
7. Tone: Warm, constructive, professional, and encouraging.
8. Convert raw data into human-centered insights without just repeating raw numbers.

JSON RESPONSE SCHEMA:
{
"greeting": "A short, warm greeting (Max 15 words)",
"summary": "A concise overview of today's performance (Max 40 words)",
"highlights": ["1 to 2 positive highlights"],
"areasToWatch": ["1 to 2 gentle recommendations"],
"dailyTip": "One actionable tip (Max 25 words)"
}`;
  const userContext = {
    name: user.name,
    currentDate: today,
    currentPeriod: periodKey,
  };

  const completion = await openai.chat.completions.create({
    model: "nvidia/nvidia/nemotron-3-ultra-550b-a55b",
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
    temperature: 0.2,
    max_tokens: 1000,
    response_format: { type: "json_object" },
  });
  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Ai returned empty content");

  const insight = JSON.parse(content);

  const { error: insertError } = await supabase.from("ai_insights").upsert(
    {
      created_at: new Date().toISOString(),
      user_id: user.id,
      type: "daily",
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
