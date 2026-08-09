import { createClient } from "@/utils/supabase/server";
import { requireSession } from "./habits";

export async function getHabitAnalysis() {
  const supabase = await createClient();
  const user = await requireSession();
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: user.timezone,
  });

  const { data, error } = await supabase.rpc("get_user_habits_analysis", {
    p_user_id: user.id,
    p_today: today,
  });

  if (error) throw new Error(`Failed to fetch Habits data - ${error.message}`);

  return data;
}
