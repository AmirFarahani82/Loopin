import { HabitStats } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

const fetchHabitsChartData = async (daysBack: number): Promise<HabitStats> => {
  const res = await fetch(`/api/habits-chart-data?daysBack=${daysBack}`);
  if (!res.ok) throw new Error("Failed to fetch chart data");
  return res.json();
};
export function useHabitsChartData(daysBack: number = 30) {
  return useQuery({
    queryKey: ["chartData", daysBack],
    queryFn: () => fetchHabitsChartData(daysBack),
  });
}
