import DashboardCard from "@/app/components/dashboard/DashboardCard";
import HabitHeatMap from "@/app/components/dashboard/HabitHeatMap";
import HabitsPanel from "@/app/components/habits-panel/HabitsPanel";
import { requireSession } from "@/libs/data/habits";
import { TooltipProvider } from "@/app/components/ui/TooltipConfig";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  prefetchAnalysisData,
  prefetchDashboardData,
} from "@/libs/data/prefetch";

export default async function Home() {
  const queryClient = new QueryClient();
  const user = await requireSession();
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: user.timezone,
  });

  await Promise.all([
    prefetchDashboardData(queryClient),
    prefetchAnalysisData(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative lg:grid lg:grid-cols-[minmax(0,2fr)_1fr]">
        <div className="flex flex-col gap-15 p-4">
          <div className="shadow-main bg-tertiary space-y-6 rounded-xl border border-slate-700 p-4">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-heading font-bold text-slate-200 capitalize">
                  Welcome Back, {user?.name}
                </h2>
                <h3 className="text-subtitle text-slate-400 text-wrap">
                  Here's your productivity overview for today.
                </h3>
              </div>
              <span className="text-slate-300 text-base text-nowrap self-start sm:self-center">{today}</span>
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
