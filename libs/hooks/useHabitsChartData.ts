import { HabitStats } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { fetcher } from "@/utils/fetcher";

const fetchHabitsChartData = (daysBack: string) =>
  fetcher<HabitStats[]>(
    `/api/habits-chart-data?daysBack=${daysBack}`,
    "Failed to load chart data",
  );

export function useHabitsChartData(daysBack: string = "30") {
  return useQuery({
    queryKey: [queryKeys.chartData, daysBack],
    queryFn: () => fetchHabitsChartData(daysBack),
    placeholderData: [] as HabitStats[],
  });
}
