import { QueryClient } from "@tanstack/react-query";
import { getAllHabits, getHabitLog, getHabits } from "./habits";
import { getAiInsightData, getHabitAnalytics } from "./habitAnalysis";
import { getDailyAiInsight } from "../analytics/dailyAiInsight";
import { getWeeklyAiInsight } from "../analytics/weeklyAiInsight";
import { queryKeys } from "../query/keys";

export async function prefetchDashboardData(queryClient: QueryClient) {
  return Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.allHabits,
      queryFn: getAllHabits,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.habits,
      queryFn: getHabits,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.habitLogs,
      queryFn: getHabitLog,
    }),
  ]);
}

export async function prefetchAnalysisData(queryClient: QueryClient) {
  return Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.habitInsight,
      queryFn: getAiInsightData,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.aiDailyInsight,
      queryFn: getDailyAiInsight,
    }),
    queryClient.prefetchQuery({
      queryKey: ["ai-weeklyInsight"],
      queryFn: getWeeklyAiInsight,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.chartData,
      queryFn: () => getHabitAnalytics(),
    }),
  ]);
}
