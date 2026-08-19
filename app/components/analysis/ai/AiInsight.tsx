"use client";

import { useDailyAiInsight } from "@/libs/hooks/useDailyAiInsight";
import { useWeeklyInsight } from "@/libs/hooks/useWeeklyInsight";
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
    return (
      <div className="bg-cart-bg border-br shadow-cart grid h-52 place-items-center rounded-lg border *:text-slate-200">
        <p>AI insights are loading, please wait.</p>
      </div>
    );
  }

  if (dailyError) {
    return (
      <div className="bg-cart-bg border-br shadow-cart grid h-52 place-items-center rounded-lg border *:text-red-400">
        <p>{dailyError.message}</p>
      </div>
    );
  } else if (weeklyError) {
    return (
      <div className="bg-cart-bg border-br shadow-cart grid h-52 place-items-center rounded-lg border *:text-red-400">
        <p>{weeklyError.message}</p>
      </div>
    );
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
