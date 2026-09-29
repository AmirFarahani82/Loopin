import { HabitAnalysis } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { fetcher } from "@/utils/fetcher";

const fetchHabitAnalysis = () =>
  fetcher<HabitAnalysis[]>(
    "/api/habits-analysis",
    "Failed to load streak data",
  );

export function useHabitsAiInsight() {
  return useQuery({
    queryKey: queryKeys.habitInsight,
    queryFn: fetchHabitAnalysis,
  });
}
