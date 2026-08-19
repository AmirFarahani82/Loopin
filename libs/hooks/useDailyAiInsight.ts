import { DailyInsight } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";

const fetchDailyAiInsight = async (): Promise<DailyInsight> => {
  const res = await fetch("/api/ai/daily");
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Failed to fetch ai analysis - ${error.message}`);
  }
  return res.json();
};

export function useDailyAiInsight() {
  return useQuery({
    queryKey: queryKeys.aiDailyInsight,
    queryFn: fetchDailyAiInsight,
  });
}
