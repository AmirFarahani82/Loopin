import { Habit, HabitLog } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

const fetchAllHabits = async (): Promise<Habit[]> => {
  const res = await fetch("/api/all-habits");
  if (!res.ok) throw new Error("Failed to fetch habits");
  return res.json();
};
const fetchHabitLog = async (): Promise<HabitLog[]> => {
  const res = await fetch("/api/habit-logs");
  if (!res.ok) throw new Error("Failed to fetch habit logs");
  return res.json();
};

export function useAllHabits() {
  const {
    data: habits = [],
    isPending: habitsIsPending,
    error: habitError,
    isError: isHabitsError,
  } = useQuery({
    queryKey: ["allHabits"],
    queryFn: fetchAllHabits,
  });
  const {
    data: habitLog = [],
    isPending: habitLogsIsPending,
    error: habitLogError,
    isError: isHabitLogsError,
  } = useQuery({
    queryKey: ["habitLogs"],
    queryFn: fetchHabitLog,
  });

  return {
    habits,
    habitLog,
    isPending: habitsIsPending || habitLogsIsPending,
    error: habitError || habitLogError,
    isError: isHabitsError || isHabitLogsError,
  };
}
