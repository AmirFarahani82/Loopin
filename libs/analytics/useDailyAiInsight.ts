import { useQuery } from "@tanstack/react-query";

const fetchDailyAiInsight = async () => {
  const res = await fetch("/api/ai/daily");
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Failed to fetch ai analysis - ${error.message}`);
  }
  return res.json();
};

export function useDailyAiInsight() {
  return useQuery({
    queryKey: ["ai-dailyInsight"],
    queryFn: fetchDailyAiInsight,
  });
}
