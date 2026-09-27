export default function InsightSkeleton() {
  return (
    <div className="col-span-2 mx-auto grid w-full max-w-7xl animate-pulse grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-12">
      {/* ==== LEFT COLUMN ==== */}
      <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-slate-800/80 bg-[#0c1222]/80 p-5 md:p-6 lg:col-span-7">
        <div className="space-y-5">
          <div className="h-5 w-3/4 max-w-md rounded-md bg-purple-500/20" />

          <div className="space-y-4 rounded-xl border border-slate-800/60 bg-[#0e1629]/50 p-4 md:p-5">
            <div className="h-4 w-28 rounded bg-purple-400/20" />

            <div className="space-y-2">
              <div className="h-3.5 w-full rounded bg-slate-700/40" />
              <div className="h-3.5 w-4/5 rounded bg-slate-700/40" />
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-purple-900/40 bg-purple-950/20 p-3.5">
              <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-purple-400/30" />
              <div className="w-full space-y-2">
                <div className="h-3 w-11/12 rounded bg-purple-300/20" />
                <div className="h-3 w-3/5 rounded bg-purple-300/20" />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-slate-800/60 bg-[#0e1629]/50 p-4 md:p-5">
            <div className="h-4 w-32 rounded bg-purple-400/20" />

            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-full rounded bg-slate-600/50" />
              <div className="h-3.5 w-2/3 rounded bg-slate-600/50" />
            </div>

            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-full rounded bg-slate-700/40" />
              <div className="h-3.5 w-full rounded bg-slate-700/40" />
              <div className="h-3.5 w-11/12 rounded bg-slate-700/40" />
              <div className="h-3.5 w-1/2 rounded bg-slate-700/40" />
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-purple-900/40 bg-purple-950/20 p-3.5">
              <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-purple-400/30" />
              <div className="w-full space-y-2">
                <div className="h-3 w-full rounded bg-purple-300/20" />
                <div className="h-3 w-4/5 rounded bg-purple-300/20" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <div className="h-3 w-64 rounded bg-slate-800/80" />
        </div>
      </div>

      {/* ==== RIGHT COLUMN ("What I noticed") ==== */}
      <div className="flex flex-col space-y-5 lg:col-span-5">
        <div className="h-5 w-44 rounded-md bg-purple-500/20" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="space-y-2.5 rounded-xl border border-emerald-900/50 bg-emerald-950/10 p-4">
              <div className="mx-auto h-3 w-3/4 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-full rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-5/6 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-4/5 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-1/2 rounded bg-emerald-500/20" />
            </div>

            <div className="space-y-2.5 rounded-xl border border-emerald-900/50 bg-emerald-950/10 p-4">
              <div className="mx-auto h-3 w-4/5 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-3/4 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-full rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-2/3 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-4/5 rounded bg-emerald-500/20" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="space-y-2.5 rounded-xl border border-emerald-900/50 bg-emerald-950/10 p-4">
              <div className="mx-auto h-3 w-4/5 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-full rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-2/3 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-3/4 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-5/6 rounded bg-emerald-500/20" />
            </div>
            <div className="space-y-2.5 rounded-xl border border-emerald-900/50 bg-emerald-950/10 p-4">
              <div className="mx-auto h-3 w-4/5 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-full rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-2/3 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-3/4 rounded bg-emerald-500/20" />
              <div className="mx-auto h-3 w-5/6 rounded bg-emerald-500/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
