import { AiInsight } from "./AiInsight";
import { AiTips } from "./AiTips";

export function AiSection() {
  return (
    <section className="*:bg-tertiary mt-10 grid grid-cols-[1fr_400px] items-start gap-10 *:rounded-xl *:border *:border-slate-700 *:p-4">
      <AiInsight />
      <AiTips />
    </section>
  );
}
