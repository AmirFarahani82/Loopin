import { AiInsight } from "./AiInsight";
import { AiTips } from "./AiTips";

export function AiSection() {
  return (
    <section className="*:bg-tertiary mt-10 grid grid-cols-1 items-start gap-10 *:rounded-xl *:border *:border-slate-700 *:p-4 lg:grid-cols-[1fr_400px]">
      <AiInsight />
      <AiTips />
    </section>
  );
}
