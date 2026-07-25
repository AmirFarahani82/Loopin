"use server";

import { Addhabit } from "@/app/types";
import { createClient } from "@/utils/supabase/server";
import { getSession } from "./auth";

export async function addHabit(data: Addhabit) {
  const supabase = await createClient();
  const session = await getSession();
  const frequency =
    data.frequency === "daily"
      ? { type: "daily" }
      : { type: "custom", days: data.selectedDays };

  const { error } = await supabase.from("habits").insert([
    {
      name: data.name.trim(),
      user_id: session?.id,
      category: data.category,
      frequency,
      type: data.type,
      unit: data.type === "count" ? data.unit?.trim() : null,
      target_value: data.type === "count" ? data.target_value : null,
    },
  ]);

  if (error) throw new Error(`error when adding new habit - ${error.message}`);
}

export async function completeHabit(
  habitId: string,
  status: string,
  value?: number,
) {
  const supabase = await createClient();
  const session = await getSession();

  const date = new Date().toLocaleDateString("en-CA", {
    timeZone: session?.timezone,
  });
  const logged_at = new Date().toISOString();

  try {
    const { error } = await supabase.from("habit_logs").upsert(
      [
        {
          user_id: session?.id,
          habit_id: habitId,
          status,
          value: value ? value : null,
          date,
          logged_at,
        },
      ],
      { onConflict: "user_id, habit_id, date" },
    );

    if (error) throw new Error(`Failed to complete habit - ${error.message}`);
  } catch (err) {
    if (err instanceof Error)
      throw new Error(
        `Unexpected error while compeleting habit - ${err.message}`,
      );
  }
}
