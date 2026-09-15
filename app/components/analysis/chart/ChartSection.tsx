"use client";

import { useHabitsChartData } from "@/libs/hooks/useHabitsChartData";
import { LineChart } from "./LineChart";
import { useEffect, useState } from "react";
import { HabitSelector } from "../HabitSelector";

export function ChartSection() {
  const [daysBack, setDaysBack] = useState("30");
  const {
    data = [],
    isFetching,
    isError,
    error,
  } = useHabitsChartData(daysBack);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  useEffect(() => {
    const countHabits = data.filter((h) => h.habitType === "count");
    setSelectedHabits((prev) => {
      const validSelected = prev.filter((id) =>
        countHabits.some((habit) => habit.habitId === id),
      );

      return validSelected.length > 0
        ? validSelected
        : countHabits.slice(0, 3).map((habit) => habit.habitId);
    });
  }, [data, daysBack]);

  function handleSelectHabit(habitId: string) {
    const isSelected = selectedHabits.includes(habitId);
    if (isSelected && selectedHabits.length !== 1) {
      setSelectedHabits(selectedHabits.filter((h) => h !== habitId));
    } else if (selectedHabits.length < 3) {
      const habitToAdd = data.find((h) => h.habitId === habitId);
      if (habitToAdd) {
        setSelectedHabits((prev) => [...prev, habitToAdd.habitId]);
      }
    }
  }
  const lineChartData = data.filter((habit) =>
    selectedHabits.includes(habit.habitId),
  );
  if (isError) {
    return (
      <section className="bg-tertiary mt-10 space-y-3 rounded-xl border border-slate-700 p-4">
        <p className="text-center text-red-400">{error.message}</p>
      </section>
    );
  }
  return (
    <section className="bg-tertiary mt-10 space-y-3 rounded-xl border border-slate-700 p-4">
      <h3 className="text-primary text-section-title font-semibold">Charts</h3>
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
        <div className="flex self-start flex-wrap gap-1">
          {data
            .filter((habit) => habit.habitType === "count")
            .map((habit) => (
              <HabitSelector
                key={habit.habitId}
                habit={habit.habitName}
                habitId={habit.habitId}
                isSelected={selectedHabits.includes(habit.habitId)}
                onSelect={handleSelectHabit}
              />
            ))}
        </div>
        <div className="grid grid-cols-[80px_80px] self-start gap-1.5 rounded-md border border-slate-700 p-1 sm:items-center">
          <button
            className={`w-[80px] transform duration-200 text-center text-slate-200 hover:cursor-pointer ${daysBack === '30' ? 'bg-slate-400/20 rounded-md' : ''}`}
            onClick={() => setDaysBack("30")}
          >
            Monthly
          </button>
          <button
            className={`w-[80px] transform duration-200 text-center text-slate-200 hover:cursor-pointer ${daysBack === '7' ? 'bg-slate-400/20 rounded-md' : ''}`}
            onClick={() => setDaysBack("7")}
          >
            Weekly
          </button>
        </div>
      </div>
      <LineChart isFetching={isFetching} lineChartData={lineChartData} />
    </section>
  );
}
