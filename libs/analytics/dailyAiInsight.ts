import { DailyInsight } from "@/app/types";
import { requireSession } from "../actions/auth";
import { getOrGenerateInsight } from "./aiMappers";

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
export async function getDailyAiInsight(): Promise<DailyInsight | null> {
  const user = await requireSession();
  const periodKey = createDailyPeriodKey(user.timezone);
  if (!periodKey) return null;
  const systemPrompt = `You are an empathetic, insightful, and data-driven personal habit coach.
Your task is to analyze the user's daily habit tracking data and provide a personalized daily insight.

RULES:
1. Return ONLY a valid JSON object. All text values must be in English.
2. The provided date and period are authoritative. Use the period for time context and greetings; never infer time from habit data.
3. Be warm, constructive, professional, and encouraging.
4. Prioritize behavioral insight over statistics. Use exact numbers only when they add meaningful context.
5. Do not invent problems. Only populate areasToWatch when there is a genuine negative pattern or neglected habit; otherwise return [].
6. Be time-aware:
   - 09-12: pending habits are normal; do not treat them as concerns.
   - 12-15: only flag concerns with strong supporting evidence.
   - 15-24: late or repeated inactivity may be a concern when supported by the data.
   - Never treat a habit as neglected simply because it has not been completed yet.
7. Early in the day (09-15), when most habits are pending, frame the insight around opportunity and recent momentum rather than lack of progress.
8. Combine related habits and observations into meaningful patterns instead of listing them individually. Do not create multiple highlights for the same underlying behavior.
9. A highlight or warning must provide interpretation, not merely report habit status. Mention specific habits only when they add useful context.
10. Do not create unnecessary highlights or warnings just to fill the allowed slots.

JSON RESPONSE SCHEMA:
{
  "greeting": "Short, warm greeting (max 15 words)",
  "summary": "Concise overview of today's performance (max 40 words)",
  "highlights": ["1-2 meaningful positive observations"],
  "areasToWatch": ["0-2 meaningful warnings"],
  "dailyTip": "One specific, actionable tip (max 25 words)"
}`;

  const insight = await getOrGenerateInsight("daily", systemPrompt, periodKey);
  return insight;
}
