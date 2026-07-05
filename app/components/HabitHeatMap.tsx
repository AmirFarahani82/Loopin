"use client";
import HeatMap from "@uiw/react-heat-map";

const data = [
  { date: "2026-01-01", count: 1 },
  { date: "2026-01-02", count: 8 },
  { date: "2026-01-03", count: 2 },
  { date: "2026-01-04", count: 3 },
  { date: "2026-01-05", count: 4 },
  { date: "2026-01-06", count: 0 },
  { date: "2026-01-07", count: 6 },
  { date: "2026-01-08", count: 9 },
  { date: "2026-02-08", count: 9 },
  { date: "2026-04-08", count: 1 },
  { date: "2026-07-05", count: 1 },

  { date: "2026-12-31", count: 1 },
];
const heatmapColorTheme = {
  dark: ["#12141a", "#6c31f6", "#8251f6", "#9b74f6"],
};
export default function HabitHeatMap() {
  const today = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setFullYear(today.getFullYear() - 1);
  return (
    <div className="flex w-full flex-col gap-10 p-4">
      <h2 className="text-xl font-bold text-slate-200">
        Your Yearly Performance
      </h2>
      <div className="w-full min-w-0 overflow-x-auto">
        <HeatMap
          key={`${twelveMonthsAgo.toISOString()}-${data.length}`}
          value={data}
          startDate={twelveMonthsAgo}
          endDate={today}
          weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
          style={{ color: "#8b5cf6" }}
          className="w-207 max-w-none min-w-207"
          rectSize={12}
          width={830}
          panelColors={{
            0: "#0d0a12",
            2: "#441ca3",
            4: "#683bd0",
            6: "#9e79f4",
          }}
        />
      </div>
    </div>
  );
}
