type Frequency =
  | { type: "daily" }
  | {
      type: "custom";
      days: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[];
    };

export type Category =
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

export type Habit = {
  id: string;
  user_id: string;
  name: string;
  category: Category;
  type: "boolean" | "count";
  unit?: string;
  targetValue?: number;
  frequency: Frequency;
  created_at: string;
};

export type HabitLog = {
  id: string;
  habit_id: string;
  user_id: string;
  date: string;
  status: LogStatus;
  value?: number;
  logged_at: string;
};
export type SigninForm = {
  email: string;
  password: string;
};
export type SignupForm = {
  name: string;
  email: string;
  password: string;
  timezone: string;
};
