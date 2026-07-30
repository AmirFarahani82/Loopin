import { Habit, HabitLog } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

const fetchHabits = async (): Promise<Habit[]> => {
  const res = await fetch("/api/habits");
  if (!res.ok) throw new Error("Failed to fetch habits");
  return res.json();
};
const fetchHabitLog = async (): Promise<HabitLog[]> => {
  const res = await fetch("/api/habit-logs");
  if (!res.ok) throw new Error("Failed to fetch habit logs");
  return res.json();
};
export function useTodayHabits(today: string) {
  const {
    data: habits = [],
    isPending: habitsPending,
    error: habitsError,
  } = useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabits,
  });
  const { data: habitLogs = [], isPending: habitLogsPending } = useQuery({
    queryKey: ["habitLogs"],
    queryFn: fetchHabitLog,
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
