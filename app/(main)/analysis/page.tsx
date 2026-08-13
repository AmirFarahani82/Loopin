import { AiSection } from "@/app/components/ai/AiSection";

export default function AnalysisPage() {
  return (
    <div className="p-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-200">Analysis</h2>
        <h3 className="text-lg text-slate-400">
          A closer look at the patterns behind your progress.
        </h3>
      </div>

      {/*AI INSIGHTS*/}
      <AiSection />
      {/*CHARTS*/}
    </div>
  );
}
