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
      target_value: data.type === "count" ? data.targetValue : null,
    },
  ]);

  if (error) throw new Error(`error when adding new habit - ${error.message}`);
}
