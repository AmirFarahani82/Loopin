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
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalValue?: number;
  currentStreakTotalValue?: number;
  lastCompletedDate: string | null;
  isActive: boolean;
  freezeDaysUsed: number;
  lastLogDate: string | null;
  completionRate: number;
  totalScheduledDays: number;
  totalCompletedDays: number;
  missedDays: string[];
};
export type HabitAnalysisData = {
  stats: HabitAnalysis | undefined;
  logs: HabitLog[];
  habit: Habit;
};
export type DailyInsight = {
  greeting: string;
  dailyTip: string;
  summary: string;
  highlights: string[];
  areasToWatch: string[] | [];
};
export type WeeklyInsight = Omit<DailyInsight, "dailyTip"> & {
  weeklyTip: string;
};
export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface WeekdayStat {
  day: Weekday;
  rate: number;
}

export interface CountTimeSeriesItem {
  date: string;
  value: number;
  target: number;
  scheduled: boolean;
  isCompleted: boolean;
  normalizedPct: number;
}

export interface BooleanTimeSeriesItem {
  date: string;
  value: null;
  target: null;
  scheduled: boolean;
  isCompleted: boolean | null;
  normalizedPct: null;
}

interface BaseHabitStats {
  habitId: string;
  habitName: string;
  rangeCompletionRate: number;
  rangeMissedDays: number;
  currentStreak: number;
  longestStreak: number;
  weekdayStats: WeekdayStat[];
}

export interface CountHabitStats extends BaseHabitStats {
  habitType: "count";
  targetValue: number;
  unit: string;
  rangeTotalValue: number;
  averageValuePerScheduledDay: number;
  averageValuePerActiveDay: number;
  rangeTargetHitRate: number;
  rangePartialDays: number;
  rangeMinValue: number;
  rangeMaxValue: number;
  timeSeries: CountTimeSeriesItem[];
}

export interface BooleanHabitStats extends BaseHabitStats {
  habitType: "boolean";
  targetValue: null;
  unit: null;
  rangeTotalValue: null;
  averageValuePerScheduledDay: null;
  averageValuePerActiveDay: null;
  rangeTargetHitRate: null;
  rangePartialDays: null;
  rangeMinValue: null;
  rangeMaxValue: null;
  timeSeries: BooleanTimeSeriesItem[];
}
export type HabitStats = CountHabitStats | BooleanHabitStats;

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
