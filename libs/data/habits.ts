import { Habit, HabitLog } from "@/app/types";
import { createClient } from "../../utils/supabase/server";
import { requireSession } from "../actions/auth";

export async function getAllHabits() {
  const supabase = await createClient();
  const session = await requireSession();

  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", session.id);

  if (error) {
    throw new Error(`Failed to fetch habits — ${error.message}`, {
      cause: error,
    });
  }

  return data;
}
export async function getHabits(): Promise<Habit[]> {
  const supabase = await createClient();
  const session = await requireSession();
  const today = new Date().toLocaleDateString("en-CA", {
    weekday: "short",
    timeZone: session.timezone,
  });

  const { data: habits, error: habitsError } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", session.id)
    .or(
      `frequency->>type.eq.daily,and(frequency->>type.eq.custom,frequency->days.cs.["${today}"])`,
    );

  if (habitsError) {
    throw new Error(`Failed to fetch habits — ${habitsError.message}`, {
      cause: habitsError,
    });
  }
  return habits;
}

export async function getHabitLog(): Promise<HabitLog[]> {
  const supabase = await createClient();
  const session = await requireSession();
  const { data: habitLogs, error } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", session.id);

  if (error) {
    throw new Error(`Failed to fetch habit logs - ${error.message}`, {
      cause: error,
    });
  }
  return habitLogs;
}
