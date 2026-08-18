export function HabitHistorySkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-64 rounded bg-slate-700/70" />
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <StatSkeleton key={index} />
        ))}
      </div>
      <BarChartSkeleton />
    </div>
  );
}
function StatSkeleton() {
  return (
    <div className="rounded-lg border border-slate-700/70 bg-slate-900/40 p-3">
      <div className="h-3.5 w-24 rounded bg-slate-700/70" />

      <div className="mt-2 h-6 w-16 rounded bg-slate-700/50" />
    </div>
  );
}
function BarChartSkeleton() {
  const barWidth = ["w-100", "w-48", "w-60", "w-70", "w-56", "w-81", "w-44"];
  return (
    <div className="mt-6 rounded-lg border border-slate-700/70 bg-slate-900/40 p-4">
      <div className="h-4 w-36 rounded bg-slate-700/70" />
      <div className="mt-6 flex h-60 flex-col gap-3 px-4 pt-2 pb-4">
        {barWidth.map((width, i) => (
          <div key={i} className="flex flex-1 items-center gap-2">
            <div className="h-4 w-6 rounded bg-slate-700/70" />
            <div
              className={`h-full max-h-[48px] rounded-r-md bg-slate-700/50 ${width}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
