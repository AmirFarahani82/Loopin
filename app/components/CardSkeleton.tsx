export default function CardSkeleton() {
  return (
    <div className="bg-cart-bg shadow-cart w-[90%] animate-pulse space-y-4 self-center rounded-xl border border-slate-700 p-4">
      <div className="h-6 w-2/3 rounded-lg bg-slate-700/50" />
      <div className="h-11 w-full rounded-xl bg-slate-700/30" />
    </div>
  );
}
