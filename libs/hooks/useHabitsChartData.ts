import { HabitStats } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";

const fetchHabitsChartData = async (
  daysBack: string,
): Promise<HabitStats[]> => {
  const res = await fetch(`/api/habits-chart-data?daysBack=${daysBack}`);
  if (!res.ok) throw new Error("Failed to fetch chart data");
  return res.json();
};
export function useHabitsChartData(daysBack: string = "30") {
  return useQuery({
    queryKey: [queryKeys.chartData, daysBack],
    queryFn: () => fetchHabitsChartData(daysBack),
    placeholderData: [] as HabitStats[],
  });
}
