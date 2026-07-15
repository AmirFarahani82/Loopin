"use client";
import CardSkeleton from "./CardSkeleton";
import { useTodayHabits } from "@/libs/hooks/useTodayHabits";

export default function DashboardCard({ today }: { today: string }) {
  const { habitLogs, todayProgress, isPending } = useTodayHabits(today);

  if (isPending) {
    return (
      <div className="flex gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="*:shadow-cart *:bg-cart-bg grid grid-cols-3 gap-x-4 *:h-25 *:rounded-lg **:text-slate-200">
      <div className="flex flex-col items-center justify-center">
        <span>Current streak</span>
        {/*TODO*/}
        <span>{habitLogs?.length}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span>Today completion rate</span>
        <span>{todayProgress}%</span>
        <div className="h-2.5 w-4/5 rounded-2xl bg-slate-800">
          <div
            style={{ width: `${todayProgress}%` }}
            className={`bg-primary h-full rounded-2xl`}
          ></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span>How is your mood today?</span>
        <span>😢 ☹️ 😕 😐 🙂 😀</span>
      </div>
    </div>
  );
}
