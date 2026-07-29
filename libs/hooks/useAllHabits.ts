import { Habit, HabitLog } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

const fetchAllHabits = (): Promise<Habit[]> =>
  fetch("/api/all-habits").then((res) => res.json());
const fetchHabitLog = (): Promise<HabitLog[]> =>
  fetch("/api/habit-logs").then((res) => res.json());

export function useAllHabits() {
  const { data: habits } = useQuery({
    queryKey: ["allHabits"],
    queryFn: fetchAllHabits,
  });
  const { data: habitLog } = useQuery({
    queryKey: ["habitLogs"],
    queryFn: fetchHabitLog,
  });

  return { habits, habitLog };
}
