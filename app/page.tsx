import DashboardCard from "./components/DashboardCard";

export default function Home() {
  const today = new Date().toDateString();
  return (
    <div className="p-4">
      <div className="shadow-main space-y-6 rounded-xl border border-slate-700 bg-[#151D31] p-4">
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
    </div>
  );
}
