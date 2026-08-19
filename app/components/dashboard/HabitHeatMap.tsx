"use client";
import { useQuery } from "@tanstack/react-query";
import HeatMap, { HeatMapValue } from "@uiw/react-heat-map";
import { CustomTooltip } from "../ui/Tooltip";
import CardSkeleton from "../ui/CardSkeleton";

const fetchHeatmap = async (
  startDate: string,
  endDate: string,
): Promise<HeatMapValue[]> => {
  const params = new URLSearchParams({ startDate, endDate });
  const res = await fetch(`/api/heatmap?${params}`);
  if (!res.ok) throw new Error("Failed to fetch heatmap data");
  return res.json();
};

export default function HabitHeatMap({ today }: { today: string }) {
  const twelveMonthsAgo = new Date(today);
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
  const twelveMonthsAgoStr = twelveMonthsAgo.toLocaleDateString("en-CA");
  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["heatmap", twelveMonthsAgoStr, today],
    queryFn: () => fetchHeatmap(twelveMonthsAgoStr, today),
  });

  if (isPending) {
    return (
      <div className="flex w-full items-center justify-center p-4">
        <CardSkeleton />
      </div>
    );
  } else if (error) {
    return (
      <div className="flex w-full items-center justify-center p-14">
        <p className="text-lg text-red-400">{error.message}</p>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col gap-10 p-4">
      <h2 className="text-xl font-bold text-slate-200">
        Your Yearly Performance
      </h2>
      <div className="w-full min-w-0 overflow-x-auto">
        <HeatMap
          key={`${twelveMonthsAgo}-${today}-${data.length}`}
          value={data}
          startDate={twelveMonthsAgo}
          endDate={new Date(today)}
          weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
          style={{ color: "#8b5cf6" }}
          className="w-207 max-w-none min-w-207"
          rectSize={12}
          width={830}
          panelColors={{
            0: "#0d0a12",
            1: "#3a1987",
            3: "#683bd0",
            5: "#9e79f4",
          }}
          rectRender={(props, dayData) => {
            const count = dayData.count || 0;
            const formattedDate = dayData.date;
            const { key, ...rectProps } = props;
            return (
              <CustomTooltip
                key={props.key}
                side="top"
                content={
                  <span>
                    <strong>{count}</strong> habit{count !== 1 ? "s" : ""}{" "}
                    completed on {formattedDate}
                  </span>
                }
              >
                <rect key={key} {...rectProps} />
              </CustomTooltip>
            );
          }}
        />
      </div>
    </div>
  );
}
