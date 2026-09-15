import { createClient } from "@/utils/supabase/server";
import { requireSession } from "../actions/auth";
function snakeToCamel(str: string): string {
  return str.replace(/_([a-zA-Z0-9])/g, (_, match) => match.toUpperCase());
}
function convertKeysToCamelCase(data: any): any {
  if (Array.isArray(data)) {
    return data.map((item) => convertKeysToCamelCase(item));
  }

  if (data !== null && typeof data === "object") {
    return Object.keys(data).reduce((acc: any, key) => {
      const camelKey = snakeToCamel(key);
      acc[camelKey] = convertKeysToCamelCase(data[key]);
      return acc;
    }, {});
  }

  return data;
}
export async function getAiInsightData() {
  const supabase = await createClient();
  const user = await requireSession();
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: user.timezone,
  });

  const { data, error } = await supabase.rpc("get_habits_ai_insight_data", {
    p_user_id: user.id,
    p_today: today,
  });

  if (error) throw new Error(`Failed to fetch Habits data - ${error.message}`);
  return convertKeysToCamelCase(data);
}
export async function getHabitAnalytics(daysBack: string = "30") {
  const supabase = await createClient();
  const user = await requireSession();
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: user.timezone,
  });

  const { data, error } = await supabase.rpc("get_habit_analytics", {
    p_user_id: user.id,
    p_today: today,
    p_days_back: daysBack,
  });

  if (error) throw new Error(`Failed to fetch charts data - ${error.message}`);
  return convertKeysToCamelCase(data);
}
