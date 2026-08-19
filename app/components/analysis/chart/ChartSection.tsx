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
      <h3 className="text-primary text-xl font-semibold">Charts</h3>
      <div className="flex items-center justify-between">
        <div>
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
        <div className="relative grid grid-cols-2 items-center gap-2 rounded-md border border-slate-700 p-1">
          <button
            className="w-[80px] text-center text-slate-200 hover:cursor-pointer"
            onClick={() => setDaysBack("30")}
          >
            Monthly
          </button>
          <button
            className="w-[80px] text-center text-slate-200 hover:cursor-pointer"
            onClick={() => setDaysBack("7")}
          >
            Weekly
          </button>
          <div
            className={`absolute top-0 left-1 h-full w-[calc(50%-4px)] transform rounded-md bg-slate-400/20 duration-400 ${daysBack === "30" ? "translate-x-0" : "translate-x-full"}`}
          ></div>
        </div>
      </div>
      <LineChart isFetching={isFetching} lineChartData={lineChartData} />
    </section>
  );
}
