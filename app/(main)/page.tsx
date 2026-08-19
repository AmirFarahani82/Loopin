import DashboardCard from "@/app/components/dashboard/DashboardCard";
import HabitHeatMap from "@/app/components/dashboard/HabitHeatMap";
import HabitsPanel from "@/app/components/habits-panel/HabitsPanel";
import {
  getAllHabits,
  getHabitLog,
  getHabits,
  requireSession,
} from "@/libs/data/habits";
import { TooltipProvider } from "@/app/components/ui/TooltipConfig";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAiInsightData, getHabitAnalytics } from "@/libs/data/habitAnalysis";
import { getDailyAiInsight } from "@/libs/analytics/dailyAiInsight";
import { getWeeklyAiInsight } from "@/libs/analytics/weeklyAiInsight";

export default async function Home() {
  const queryClient = new QueryClient();
  const user = await requireSession();
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: user.timezone,
  });
  await getHabitAnalytics();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["allHabits"],
      queryFn: getAllHabits,
    }),
    queryClient.prefetchQuery({
      queryKey: ["habits"],
      queryFn: getHabits,
    }),
    queryClient.prefetchQuery({
      queryKey: ["habitLogs"],
      queryFn: getHabitLog,
    }),
    queryClient.prefetchQuery({
      queryKey: ["habitInsight"],
      queryFn: getAiInsightData,
    }),
    queryClient.prefetchQuery({
      queryKey: ["ai-dailyInsight"],
      queryFn: getDailyAiInsight,
    }),
    queryClient.prefetchQuery({
      queryKey: ["ai-weeklyInsight"],
      queryFn: getWeeklyAiInsight,
    }),
    queryClient.prefetchQuery({
      queryKey: ["chartData"],
      queryFn: () => getHabitAnalytics(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative grid grid-cols-[minmax(0,2fr)_1fr]">
        <div className="flex flex-col gap-15 p-4">
          <div className="shadow-main bg-tertiary space-y-6 rounded-xl border border-slate-700 p-4">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-3xl font-bold text-slate-200 capitalize">
                  Welcome Back, {user?.name}
                </h2>
                <h3 className="text-lg text-slate-400">
                  Here's your productivity overview for today.
                </h3>
              </div>
              <div className="text-slate-300">{today}</div>
            </div>

            <div>
              <DashboardCard today={today} />
            </div>
          </div>
          <div className="shadow-main bg-tertiary border-br w-full min-w-0 rounded-xl border">
            <TooltipProvider>
              <HabitHeatMap today={today} />
            </TooltipProvider>
          </div>
        </div>
        <HabitsPanel today={today} />
      </div>
    </HydrationBoundary>
  );
}
