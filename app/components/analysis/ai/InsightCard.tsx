import { MdOutlineTipsAndUpdates } from "react-icons/md";

type InsightCardProp = {
  period: "today" | "week";
  greeting?: string;
  summary: string;
  tip: string;
};
export function InsightCard({
  period,
  greeting,
  summary,
  tip,
}: InsightCardProp) {
  return (
    <div className="bg-cart-bg border-br shadow-cart space-y-3 rounded-lg border p-3 *:text-slate-200">
      <h4 className="text-secondary-hover!">
        {period === "today" ? "Daily insight" : "Weekly insight"}
      </h4>
      {greeting && <p className="text-subtitle font-medium">{greeting}</p>}
      <p className="text-slate-400!">{summary}</p>
      <div className="flex gap-1 rounded-md border border-purple-500/20 bg-purple-500/10 p-1.5 text-purple-300">
        <MdOutlineTipsAndUpdates className="size-5 shrink-0" />
        <p className="">{tip}</p>
      </div>
    </div>
  );
}
