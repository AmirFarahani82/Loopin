export type Frequency =
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

type LogStatus = "completed" | "frozen";

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
  target_value?: number;
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

export type HabitAnalysis = {
  habit_id: string;
  current_streak: number;
  longest_streak: number;
  total_value?: number;
  current_streak_total_value?: number;
  last_completed_date: string | null;
  is_active: boolean;
  freeze_days_used: number;
  last_log_date: string | null;
  completion_rate: number;
  total_scheduled_days: number;
  total_completed_days: number;
  missed_days: string[];
};
export type HabitAnalysisData = {
  stats: HabitAnalysis | undefined;
  logs: HabitLog[];
  habit: Habit;
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
