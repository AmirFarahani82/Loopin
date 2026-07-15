import { Habit, HabitLog } from "@/app/types";
import { createClient } from "../../utils/supabase/server";
import { getSession } from "../actions/auth";

export async function requireSession() {
  const session = await getSession();

  if (!session?.id) {
    throw new Error("No active session (user not authenticated)");
  }

  return session;
}

export async function getHabits(): Promise<Habit[]> {
  const supabase = await createClient();
  const session = await requireSession();
  try {
    const { data: habits, error: habitsError } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", session?.id)
      .or(
        `frequency->>type.eq.daily,and(frequency->>type.eq.custom,frequency->days.cs.["${session?.timezone}"])`,
      );

    if (habitsError) {
      throw new Error(`Failed to fetch habits — ${habitsError.message}`, {
        cause: habitsError,
      });
    }
    return habits;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Unexpected error while fetching habits", { cause: err });
  }
}

export async function getHabitLog(): Promise<HabitLog[]> {
  const supabase = await createClient();
  const session = await requireSession();
  try {
    const { data: habitLogs, error } = await supabase
      .from("habit_logs")
      .select("*")
      .eq("user_id", session?.id);

    if (error) {
      throw new Error(`Failed to fetch habit logs - ${error.message}`, {
        cause: error,
      });
    }
    return habitLogs;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Unexpected error while fetching habit logs", {
      cause: err,
    });
  }
}
