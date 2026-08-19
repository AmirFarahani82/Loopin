"use client";
import { FaCheckCircle } from "react-icons/fa";
import { Habit, HabitLog } from "../types";
import { useCompleteHabit } from "@/libs/hooks/useCompleteHabit";

export default function HabitCard({
  habit,
  isDone,
  isFrozen,
  frozenHabitlog,
}: {
  habit: Habit;
  isDone?: boolean;
  isFrozen?: boolean;
  frozenHabitlog?: HabitLog[];
}) {
  const {
    value,
    setValue,
    frozenLogValue,
    handleCompleteHabit,
    isPending,
    isInputInvalid,
  } = useCompleteHabit(habit, frozenHabitlog);
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
      "bg-sky-500/10 text-sky-300  border border-sky-400/40 cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:-translate-y-0.5 active:translate-y-0.5";
  } else if (isInputInvalid) {
    buttonStyles = "bg-primary/30 cursor-not-allowed";
  }
  return (
    <div
      className={`w-[90%] space-y-4 self-center rounded-xl border p-4 ${cardStyles}`}
    >
      <h3 className={`text-lg font-semibold ${titleStyles}`}>{habit?.name}</h3>

      {habit?.type === "count" && !isDone && !isFrozen && (
        <>
          <div>
            <h4 className="font-bold text-slate-200">
              Habit goal: {habit?.target_value} {habit.unit}
            </h4>
            <p className="text-red-300 italic">
              Make sure to reach your goal, otherwise, your habit will become
              frozen!
            </p>
          </div>
          <input
            type="number"
            onChange={(e) =>
              setValue(e.target.value === "" ? null : Number(e.target.value))
            }
            value={value ?? ""}
            min="0.01"
            step="0.01"
            placeholder="type value here"
            className="placeholder-secondary/50 border-br bg-tertiary focus:border-primary w-full [appearance:textfield] rounded-xl border p-2.5 text-white transition-colors outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </>
      )}
      {habit?.type === "count" && !isDone && isFrozen && (
        <>
          <div>
            <h4 className="font-bold text-slate-200">
              Habit goal: {habit?.target_value} {habit.unit}
            </h4>
            <p className="text-sky-300 italic">
              Current progress: {frozenLogValue}, keep going,{" "}
              {habit.target_value! - frozenLogValue!} more {habit.unit} to reach
              your goal, otherwise, your habit will mark as frozen for today
            </p>
          </div>
          <input
            type="number"
            onChange={(e) =>
              setValue(e.target.value === "" ? null : Number(e.target.value))
            }
            value={value ?? ""}
            min="0.01"
            step="0.01"
            placeholder="type value here"
            className="placeholder-secondary/50 border-br bg-tertiary focus:border-primary w-full [appearance:textfield] rounded-xl border p-2.5 text-white transition-colors outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </>
      )}
      <button
        onClick={handleCompleteHabit}
        disabled={isDone || isPending || isInputInvalid}
        className={`flex w-full items-center justify-center gap-2 rounded-xl p-2.5 font-medium transition-all duration-300 ${buttonStyles}`}
      >
        {" "}
        <span>
          <FaCheckCircle />
        </span>{" "}
        <span>
          {isDone
            ? "Completed"
            : isFrozen
              ? "Frozen"
              : isPending
                ? "Submiting..."
                : "Complete"}
        </span>
      </button>
    </div>
  );
}
