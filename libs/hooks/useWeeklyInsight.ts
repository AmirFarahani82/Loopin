import { WeeklyInsight } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { fetcher } from "@/utils/fetcher";

const fetchWeeklyInsight = () =>
  fetcher<WeeklyInsight>("/api/ai/weekly", "Failed to load weekly insight");

export function useWeeklyInsight() {
  return useQuery({
    queryKey: queryKeys.aiWeeklyInsight,
    queryFn: fetchWeeklyInsight,
  });
}
