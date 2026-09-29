import { Habit, HabitLog } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { fetcher } from "@/utils/fetcher";

const fetchAllHabits = () =>
  fetcher<Habit[]>("/api/all-habits", "Failed to load habits");
const fetchHabitLog = () =>
  fetcher<HabitLog[]>("/api/habit-logs", "Failed to load habit logs");

export function useAllHabits() {
  const {
    data: habits = [],
    isPending: habitsIsPending,
    error: habitError,
    isError: isHabitsError,
  } = useQuery({
    queryKey: queryKeys.allHabits,
    queryFn: fetchAllHabits,
  });
  const {
    data: habitLog = [],
    isPending: habitLogsIsPending,
    error: habitLogError,
    isError: isHabitLogsError,
  } = useQuery({
    queryKey: queryKeys.habitLogs,
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
