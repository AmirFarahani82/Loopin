import DashboardCard from "./components/DashboardCard";
import HabitHeatMap from "./components/HabitHeatMap";
import HabitsPanel from "./components/HabitsPanel";

export default function Home() {
  const today = new Date().toDateString();
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_1fr]">
      <div className="flex flex-col gap-15 p-4">
        <div className="shadow-main bg-tertiary space-y-6 rounded-xl border border-slate-700 p-4">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-200">
                Welcome Back, [user]
              </h2>
              <h3 className="text-text-lg text-slate-400">
                Here's your productivity overview for today.
              </h3>
            </div>
            <div className="text-slate-300">{today}</div>
          </div>
          <div>
            <DashboardCard />
          </div>
        </div>
        <div className="shadow-main bg-tertiary border-br w-full min-w-0 rounded-xl border">
          <HabitHeatMap />
        </div>
      </div>
      <HabitsPanel />
    </div>
  );
}
