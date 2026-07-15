import { FaCheckCircle } from "react-icons/fa";
import { Habit } from "../types";

export default function HabitCard({
  habit,
  isDone,
  isFrozen,
}: {
  habit?: Habit;
  isDone?: boolean;
  isFrozen?: boolean;
}) {
  let cardStyles = "border-slate-700 bg-cart-bg shadow-cart";
  let titleStyles = "text-slate-200";
  let buttonStyles =
    "bg-primary hover:bg-secondary text-[#0f172a] shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_15px_rgb(109,73,253)] hover:-translate-y-0.5 active:translate-y-0.5";

  if (isDone) {
    cardStyles =
      "border-emerald-500/30 bg-emerald-950/20 opacity-80 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
    titleStyles = "text-emerald-400 line-through decoration-emerald-500/50";
    buttonStyles =
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-not-allowed";
  } else if (isFrozen) {
    cardStyles =
      "border-sky-500/40 bg-sky-950/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]";
    titleStyles = "text-sky-300 italic";
    buttonStyles =
      "bg-sky-500/10 text-sky-300 border border-sky-400/30 cursor-not-allowed";
  }
  return (
    <div
      className={`w-[90%] space-y-4 self-center rounded-xl border p-4 ${cardStyles}`}
    >
      <h3 className={`text-lg font-semibold ${titleStyles}`}>{habit?.name}</h3>

      {habit?.type === "count" && !isDone && !isFrozen && (
        <input
          type="number"
          placeholder="type value here"
          className="placeholder-secondary/50 border-br bg-tertiary focus:border-primary w-full [appearance:textfield] rounded-xl border p-2.5 text-white transition-colors outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      )}
      <button
        className={`flex w-full items-center justify-center gap-2 rounded-xl p-2.5 font-medium transition-all duration-300 ${buttonStyles}`}
      >
        {" "}
        <span>
          <FaCheckCircle />
        </span>{" "}
        <span>{isDone ? "Completed" : isFrozen ? "Frozen" : "Complete"}</span>
      </button>
    </div>
  );
}
