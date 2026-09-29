import { DailyInsight } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { fetcher } from "@/utils/fetcher";

const fetchDailyAiInsight = () =>
  fetcher<DailyInsight>("/api/ai/daily", "Failed to load ai analysis");
export function useDailyAiInsight() {
  return useQuery({
    queryKey: queryKeys.aiDailyInsight,
    queryFn: fetchDailyAiInsight,
  });
}
