type Frequency =
  | { type: "daily" }
  | { type: "weekly" }
  | {
      type: "custom";
      days: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[];
    };

type Category =
  | "health"
  | "fitness"
  | "mind"
  | "work"
  | "education"
  | "finance"
  | "social"
  | "creative"
  | "routine";

type LogStatus = "completed" | "frozen" | "broken";

type User = {
  id: string;
  name: string;
};

type Habit = {
  id: string;
  user_id: string;
  name: string;
  category: Category;
  type: "boolean" | "count";
  unit?: string;
  targetValue?: number;
  frequency: Frequency;
};

type HabitLog = {
  id: string;
  habit_id: string;
  user_id: string;
  date: string;
  status: LogStatus;
  value?: number;
  logged_at: string;
};
