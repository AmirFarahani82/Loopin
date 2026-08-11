import { useQuery } from "@tanstack/react-query";

const fetchWeeklyInsight = async () => {
  const res = await fetch("/api/ai/weekly");
  if (!res.ok) throw new Error("Failed to fetch weekly insight.");

  return res.json();
};
export function useWeeklyInsight() {
  return useQuery({
    queryKey: ["ai-weeklyInsight"],
    queryFn: fetchWeeklyInsight,
  });
}
