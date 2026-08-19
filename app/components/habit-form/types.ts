import { Habit } from "@/app/types";

export type HabitTypeOption = {
  type: "boolean" | "count";
  label: string;
  description: string;
};
export type HabitFormValues = Omit<
  Habit,
  "id" | "user_id" | "created_at" | "frequency"
> & {
  frequency: "daily" | "custom";
  selectedDays: string[];
};
export function habitToFormValue(habit: Habit): HabitFormValues {
  const { id, user_id, created_at, frequency, ...rest } = habit;
  return {
    ...rest,
    frequency: habit.frequency.type,
    selectedDays: habit.frequency.type === "custom" ? habit.frequency.days : [],
  };
}
