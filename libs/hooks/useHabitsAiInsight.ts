import { HabitAnalysis } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";

const fetchHabitAnalysis = async (): Promise<HabitAnalysis[]> => {
  const res = await fetch("/api/habits-analysis");
  if (!res.ok) throw new Error("Failed to fetch streak data");
  return res.json();
};

export function useHabitsAiInsight() {
  return useQuery({
    queryKey: queryKeys.habitInsight,
    queryFn: fetchHabitAnalysis,
  });
}
