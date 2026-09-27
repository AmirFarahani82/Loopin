import { WeeklyInsight } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";

const fetchWeeklyInsight = async (): Promise<WeeklyInsight> => {
  const res = await fetch("/api/ai/weekly");
  if (!res.ok) throw new Error("Failed to fetch weekly insight.");

  return res.json();
};
export function useWeeklyInsight() {
  return useQuery({
    queryKey: queryKeys.aiWeeklyInsight,
    queryFn: fetchWeeklyInsight,
  });
}
