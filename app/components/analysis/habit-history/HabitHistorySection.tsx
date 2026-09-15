"use client";
import { useHabitsChartData } from "@/libs/hooks/useHabitsChartData";
import { HabitSelector } from "../HabitSelector";
import { useState } from "react";
import { HabitHistory } from "./HabitHistory";
import { HabitHistorySkeleton } from "./HabitHistorySkeleton";

export function HabitHistorySection() {
  const { data = [], isFetching, isError, error } = useHabitsChartData("30");
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const currentHabit =
    data.find((h) => h.habitId === selectedHabitId) ?? data[0];

  return (
    <section className="bg-tertiary mt-10 space-y-3 rounded-xl border border-slate-700 p-4">
      <h3 className="text-primary text-section-title font-semibold">
        Habit history
      </h3>
      {isFetching ? (
        <HabitHistorySkeleton />
      ) : (
        <>
          <div className="flex w-full overflow-x-auto gap-1 *:shrink-0 lg:w-4/5 lg:flex-wrap">
            {data.map((habit) => (
              <HabitSelector
                key={habit.habitId}
                habit={habit.habitName}
                habitId={habit.habitId}
                isSelected={selectedHabitId === habit.habitId}
                onSelect={() => setSelectedHabitId(habit.habitId)}
              />
            ))}
          </div>
          {currentHabit && <HabitHistory habit={currentHabit} />}
        </>
      )}
      {isError && <p className="text-red-400">{error.message}</p>}
    </section>
  );
}
