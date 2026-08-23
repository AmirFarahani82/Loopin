import { AiSection } from "@/app/components/analysis/ai/AiSection";
import { ChartSection } from "@/app/components/analysis/chart/ChartSection";
import { HabitHistorySection } from "@/app/components/analysis/habit-history/HabitHistorySection";
import { getAllHabits, getHabitLog } from "@/libs/data/habits";
import Link from "next/link";

export default async function AnalysisPage() {
  const habits = await getAllHabits();
  const habitLogs = await getHabitLog();

  if (habits.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col p-8">
        <div className="">
          <h2 className="text-heading font-bold text-slate-200">Analysis</h2>
          <h3 className="text-subtitle text-slate-400">
            A closer look at the patterns behind your progress.
          </h3>
        </div>
        <div className="text-subtitle flex h-full flex-1 items-center justify-center gap-1">
          <span className="text-slate-200">You have no habits yet!</span>{" "}
          <Link
            href="/dashboard"
            className="text-primary hover:text-secondary-hover font-semibold"
          >
            Go to dashboard to add one.
          </Link>
        </div>
      </div>
    );
  }
  if (habitLogs.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col p-8">
        <div className="">
          <h2 className="text-heading font-bold text-slate-200">Analysis</h2>
          <h3 className="text-subtitle text-slate-400">
            A closer look at the patterns behind your progress.
          </h3>
        </div>
        <div className="text-subtitle flex h-full flex-1 items-center justify-center gap-1">
          <span className="text-slate-200">You have no activity yet! </span>{" "}
          <Link
            href="/dashboard"
            className="text-primary hover:text-secondary-hover font-semibold"
          >
            Complete a habit
          </Link>
          <span className="text-slate-200">to see your progress here</span>
        </div>
      </div>
    );
  }
  return (
    <div className="p-8">
      <div>
        <h2 className="text-heading font-bold text-slate-200">Analysis</h2>
        <h3 className="text-subtitle text-slate-400">
          A closer look at the patterns behind your progress.
        </h3>
      </div>
      <AiSection />
      <ChartSection />
      <HabitHistorySection />
    </div>
  );
}
