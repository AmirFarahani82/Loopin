import { WeekdayStat } from "@/app/types";
import {
  Bar,
  BarChart as BarC,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function BarChart({ data }: { data: WeekdayStat[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarC
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="day"
            width={40}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Completion"]}
            cursor={false}
          />
          <Bar
            dataKey="rate"
            fill="#8b5cf6"
            activeBar={{ fill: "#9974f8" }}
            radius={[0, 4, 4, 0]}
          />
        </BarC>
      </ResponsiveContainer>
    </div>
  );
}
