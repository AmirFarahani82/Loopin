import { requireSession } from "../data/habits";
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
export async function getDailyAiInsight() {
  const user = await requireSession();
  const periodKey = createDailyPeriodKey(user.timezone);
  if (!periodKey) return null;
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

  const insight = await getOrGenerateInsight("daily", systemPrompt, periodKey);
  return insight;
}
