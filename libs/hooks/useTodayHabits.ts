import { Habit, HabitLog } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { fetcher } from "@/utils/fetcher";

const fetchHabits = () =>
  fetcher<Habit[]>("/api/habits", "Failed to fetch habits");
const fetchHabitLogs = () =>
  fetcher<HabitLog[]>("/api/habit-logs", "Failed to load habit logs");

export function useTodayHabits(today: string) {
  const {
    data: habits = [],
    isPending: habitsPending,
    error: habitsError,
  } = useQuery({
    queryKey: queryKeys.habits,
    queryFn: fetchHabits,
  });
  const { data: habitLogs = [], isPending: habitLogsPending } = useQuery({
    queryKey: queryKeys.habitLogs,
    queryFn: fetchHabitLogs,
  });

  const todayLogs = (habitLogs || [])?.filter((log) => log.date === today);
  const doneIDs = new Set(
    todayLogs
      .filter((log) => log.status === "completed")
      .map((log) => log.habit_id),
  );
  const frozenIDs = new Set(
    todayLogs
      .filter((log) => log.status === "frozen")
      .map((log) => log.habit_id),
  );
  const frozenHabitlog = todayLogs.filter((log) => frozenIDs.has(log.habit_id));

  const todayDoneHabits = habits.filter((habit) => doneIDs.has(habit.id));
  const todayFrozenHabits = habits.filter((habit) => frozenIDs.has(habit.id));
  const todayActiveHabits = habits.filter(
    (habit) => !doneIDs.has(habit.id) && !frozenIDs.has(habit.id),
  );

  const totalHabitsCount = habits.length;
  const todayProgress =
    totalHabitsCount > 0
      ? Math.round((todayDoneHabits.length / totalHabitsCount) * 100)
      : 0;

  return {
    habits,
    habitLogs,
    frozenHabitlog,
    todayDoneHabits,
    todayFrozenHabits,
    todayActiveHabits,
    todayProgress,
    isPending: habitsPending || habitLogsPending,
    habitsError,
  };
}
