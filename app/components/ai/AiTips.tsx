"use client";
import { useDailyAiInsight } from "@/libs/analytics/useDailyAiInsight";
import { useWeeklyInsight } from "@/libs/analytics/useWeeklyInsight";
import { TipsCard } from "./TipsCard";

export function AiTips() {
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
  if (dailyPending || weeklyPending) return null;
  if (dailyError || weeklyError) return null;
  return (
    <div>
      <h3 className="text-primary text-xl font-semibold">What I noticed</h3>
      <div className="grid grid-cols-2 gap-2">
        {dailyInsight?.highlights.map((daily) => (
          <TipsCard key={daily} type="highlight" content={daily} />
        ))}
        {weeklyInsight?.highlights.map((weekly) => (
          <TipsCard key={weekly} type="highlight" content={weekly} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {dailyInsight?.areasToWatch.map((daily) => (
          <TipsCard key={daily} type="warning" content={daily} />
        ))}
        {weeklyInsight?.areasToWatch.map((weekly) => (
          <TipsCard key={weekly} type="warning" content={weekly} />
        ))}
      </div>
    </div>
  );
}
