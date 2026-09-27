export default function InsightUpdating({ type }: { type: "insight" | "tip" }) {
  return (
    <div className="mx-auto flex max-w-max items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500"></span>
      </span>
      <span className="text-xs text-purple-400/80">Updating {type}...</span>
    </div>
  );
}
