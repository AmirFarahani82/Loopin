import { principles } from "./constants";

export default function PrinciplesList() {
  return (
    <>
      {principles.map((p, i) => (
        <li
          key={i}
          className="flex w-full flex-col gap-3 rounded-2xl border border-violet-500/25 bg-slate-800 p-6 transition-all hover:scale-101 hover:border-violet-500/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:brightness-110 sm:p-8 md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
        >
          <span className="flex size-9 items-center justify-center self-start rounded-md border border-sky-500/20 bg-sky-500/10 font-semibold text-sky-400 md:size-12">
            0{i + 1}
          </span>
          <h3 className="text-xl font-semibold text-slate-200">{p.label}</h3>
          <p className="leading-relaxed text-slate-400">{p.content}</p>
        </li>
      ))}
    </>
  );
}
