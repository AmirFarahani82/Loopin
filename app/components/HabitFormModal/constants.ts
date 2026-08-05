import { HabitFormValues } from "./types";
import { HabitTypeOption } from "./types";

// prettier-ignore
export const categories = ["health","fitness","mind","work","education","finance","social","creative","routine",
];
export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const habitTypes: HabitTypeOption[] = [
  {
    type: "boolean",
    label: "Check off",
    description: "Just mark it down each day",
  },
  {
    type: "count",
    label: "Track a number",
    description: "Log a count against a target, glasses of water or pages read",
  },
];
export const formDefaults: HabitFormValues = {
  name: "",
  category: "health",
  frequency: "daily",
  selectedDays: [],
  type: "boolean",
  unit: "",
  target_value: undefined,
};
