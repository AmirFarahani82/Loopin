import { AiSection } from "@/app/components/analysis/ai/AiSection";
import { ChartSection } from "@/app/components/analysis/chart/ChartSection";
import { HabitHistorySection } from "@/app/components/analysis/habit-history/HabitHistorySection";

export default function AnalysisPage() {
  return (
    <div className="p-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-200">Analysis</h2>
        <h3 className="text-lg text-slate-400">
          A closer look at the patterns behind your progress.
        </h3>
      </div>
      <AiSection />
      <ChartSection />
      <HabitHistorySection />
    </div>
  );
}
