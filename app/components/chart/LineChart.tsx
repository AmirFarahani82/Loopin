"use client";
import { HabitStats } from "@/app/types";
import {
  LineChart as LineC,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const LINE_COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export function LineChart({
  isFetching,
  lineChartData,
}: {
  isFetching: boolean;
  lineChartData: HabitStats[];
}) {
  const dataMap = new Map();
  lineChartData.forEach((habit) => {
    habit.timeSeries.forEach((series) => {
      if (!dataMap.has(series.date)) {
        dataMap.set(series.date, { date: series.date });
      }
      const date = dataMap.get(series.date);
      date[habit.habitId] = series.normalizedPct;
    });
  });
  const chartData = Array.from(dataMap.values());
  chartData.sort((a, b) => a.date.localeCompare(b.date));

  if (isFetching) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-center text-slate-200">Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineC data={chartData}>
          <XAxis dataKey="date" padding={{ left: 5 }} tickMargin={2} />
          <YAxis padding={{ bottom: 5 }} tickFormatter={(v) => `${v}%`} />
          <Tooltip />
          {lineChartData.map((habit, index) => (
            <Line
              key={habit.habitId}
              dataKey={habit.habitId}
              name={habit.habitName}
              type="bump"
              stroke={LINE_COLORS[index % LINE_COLORS.length]}
              strokeWidth={2}
            />
          ))}
        </LineC>
      </ResponsiveContainer>
    </div>
  );
}
