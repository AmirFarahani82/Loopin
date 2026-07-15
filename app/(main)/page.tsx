import DashboardCard from "@/app/components/DashboardCard";
import HabitHeatMap from "@/app/components/HabitHeatMap";
import HabitsPanel from "@/app/components/HabitsPanel";
import { getSession } from "@/libs/actions/auth";
import { getHabitLog, getHabits } from "@/libs/data/habits";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  const user = await getSession();
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: user?.timezone,
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["habits"],
      queryFn: getHabits,
    }),
    queryClient.prefetchQuery({
      queryKey: ["habitLogs"],
      queryFn: getHabitLog,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-cols-[minmax(0,2fr)_1fr]">
        <div className="flex flex-col gap-15 p-4">
          <div className="shadow-main bg-tertiary space-y-6 rounded-xl border border-slate-700 p-4">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-3xl font-bold text-slate-200 capitalize">
                  Welcome Back, {user?.name}
                </h2>
                <h3 className="text-text-lg text-slate-400">
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
            <HabitHeatMap />
          </div>
        </div>

        <HabitsPanel today={today} />
      </div>
    </HydrationBoundary>
  );
}
