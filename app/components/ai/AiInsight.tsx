"use client";

import { useDailyAiInsight } from "@/libs/analytics/useDailyAiInsight";
import { useWeeklyInsight } from "@/libs/analytics/useWeeklyInsight";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { InsightCard } from "./InsightCard";

export function AiInsight() {
  const {
    data: dailyInsight,
    isPending: dailyPending,
    error: dailyError,
  } = useDailyAiInsight();
  const {
    data: weeklyInsight,
    isPending: weeklyPending,
    error: weeklyError,
  } = useWeeklyInsight();

  if (dailyPending || weeklyPending) {
    return <p>Loading AI insight</p>;
  }
  if (dailyError || weeklyError) {
    return <p>error</p>;
  }
  return (
    <div className="space-y-4">
      <h3 className="text-primary text-xl font-semibold">
        {dailyInsight?.greeting}
      </h3>
      <InsightCard
        period="today"
        summary={dailyInsight?.summary}
        tip={dailyInsight.dailyTip}
      />
      <InsightCard
        period="week"
        greeting={weeklyInsight.greeting}
        summary={weeklyInsight.summary}
        tip={weeklyInsight.weeklyTip}
      />

      <p className="text-center text-sm text-slate-400">
        AI-generated content may be inaccurate.
      </p>
    </div>
  );
}
