"use client";
import CardSkeleton from "../ui/CardSkeleton";
import { useTodayHabits } from "@/libs/hooks/useTodayHabits";
import { useAllHabits } from "@/libs/hooks/useAllHabits";
import { useHabitsAiInsight } from "@/libs/hooks/useHabitsAiInsight";

export default function DashboardCard({ today }: { today: string }) {
  const { todayProgress, isPending: todayPending } = useTodayHabits(today);

  const {
    habits,
    habitLog,
    isPending: allPending,
    isError,
    error,
  } = useAllHabits();
  const { data: habitsAnalysis = [], isPending: habitsAnalysisPending } =
    useHabitsAiInsight();

  const longestStreak = habitsAnalysis.reduce((max, curr) => {
    return curr.currentStreak > max.currentStreak ? curr : max;
  }, habitsAnalysis[0]);
  const longestStreakHabit = habits.find(
    (h) => h.id === longestStreak?.habitId,
  );
  const activeStreak = habitsAnalysis.filter((a) => a.isActive === true);
  const streakCardContent = { ...longestStreak, ...longestStreakHabit };

  if (todayPending || allPending || habitsAnalysisPending) {
    return (
      <div className="flex gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  } else if (isError) {
    return (
      <p className="text-subtitle text-center text-red-400">{error?.message}</p>
    );
  } else if (habits.length === 0) {
    return (
      <p className="text-subtitle text-center text-slate-200">
        Add habit to see your progress here.
      </p>
    );
  } else if (habitLog.length === 0) {
    return (
      <p className="text-subtitle text-center text-slate-200">
        No habit activity yet. Start tracking today!
      </p>
    );
  }
  return (
    <div className="*:shadow-cart *:bg-cart-bg grid grid-cols-2 gap-4 *:text-center *:h-25 *:rounded-lg **:text-slate-200 sm:grid-cols-3">
      <div className="relative flex flex-col items-center justify-center">
        <span>Longest streak</span>
        <span>
          {streakCardContent.type === "boolean"
            ? `${streakCardContent.name} ${streakCardContent.currentStreak}  ${streakCardContent.currentStreak === 1 ? "day" : "days"} streak`
            : `${streakCardContent.name} ${streakCardContent.totalValue} ${streakCardContent.unit} over ${streakCardContent.currentStreak} ${streakCardContent.currentStreak === 1 ? "day" : "days"} `}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span>Active streaks</span>
        {activeStreak?.length} / {habits?.length}
      </div>
      <div className="flex flex-col items-center justify-center col-span-2 sm:col-span-1">
        <span>Today completion rate</span>
        <span>{todayProgress}%</span>
        <div className="h-2.5 w-4/5 rounded-2xl bg-slate-800">
          <div
            style={{ width: `${todayProgress}%` }}
            className={`bg-primary h-full rounded-2xl`}
          ></div>
        </div>
      </div>
    </div>
  );
}
