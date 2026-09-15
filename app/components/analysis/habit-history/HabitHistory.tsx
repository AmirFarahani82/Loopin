import { HabitStats } from "@/app/types";
import { BarChart } from "./BarChart";

export function HabitHistory({ habit }: { habit: HabitStats }) {
  return (
    <div>
      <h4 className="text-subtitle text-slate-200">
        Here is a brief stats for {habit.habitName}
      </h4>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
        <Stat label="Current streak" value={`${habit.currentStreak} days`} />
        <Stat label="Longest streak" value={`${habit.longestStreak} days`} />
        <Stat
          label="Range completion rate"
          value={`${habit.rangeCompletionRate}%`}
        />
        {habit.habitType === "count" && (
          <>
            <Stat
              label="Average / per active day"
              value={`${habit.averageValuePerActiveDay} ${habit.unit}`}
            />
            <Stat
              label="Target hit rate"
              value={`${habit.rangeTargetHitRate}%`}
            />
            <Stat
              label="Minimum value"
              value={`${habit.rangeMinValue} ${habit.unit}`}
            />
            <Stat
              label="Maximum value"
              value={`${habit.rangeMaxValue} ${habit.unit}`}
            />
          </>
        )}
      </div>
      <BarChart data={habit.weekdayStats} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-700/70 bg-slate-900/40 p-3">
      <p className="text-xs font-medium text-slate-400">{label}</p>

      <p className="text-subtitle mt-1 font-semibold text-slate-100">{value}</p>
    </div>
  );
}
