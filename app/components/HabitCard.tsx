"use client";
import { FaCheckCircle } from "react-icons/fa";
import { Habit } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeHabit } from "@/libs/actions/habits";

export default function HabitCard({
  habit,
  isDone,
  isFrozen,
}: {
  habit?: Habit;
  isDone?: boolean;
  isFrozen?: boolean;
}) {
  const [value, setValue] = useState<null | number>(null);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      habitId,
      status,
      value,
    }: {
      habitId: string;
      status: string;
      value?: number;
    }) => completeHabit(habitId, status, value),
    onMutate: async (newLog) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });
      await queryClient.cancelQueries({ queryKey: ["habitLogs"] });
      await queryClient.cancelQueries({ queryKey: ["heatmap"] });
      const previousLogs = queryClient.getQueryData(["habitLogs"]);
      const previousHeatmap = queryClient.getQueryData(["heatmap"]);
      const todayStr = new Date().toLocaleDateString("en-CA");

      queryClient.setQueryData(["habitLogs"], (old: any) => {
        if (!old) return old;
        const optimisticEntry = {
          id: `temp-${Date.now()}`,
          habit_id: newLog.habitId,
          status: newLog.status,
          value: newLog.value ?? null,
          date: todayStr,
          logged_at: new Date().toISOString(),
        };

        if (Array.isArray(old)) {
          const filtered = old.filter(
            (log) =>
              !(log.habit_id === newLog.habitId && log.date === todayStr),
          );
          return [...filtered, optimisticEntry];
        }
        return old;
      });
      return { previousLogs, previousHeatmap };
    },
    onError: (err, newLog, context) => {
      console.error("Mutation failed, rolling back...", err);
      if (context?.previousLogs) {
        queryClient.setQueryData(["habitLogs"], context.previousLogs);
      }
      if (context?.previousHeatmap) {
        queryClient.setQueryData(["heatmap"], context.previousHeatmap);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habitLogs"] });
      queryClient.invalidateQueries({ queryKey: ["heatmap"] });
    },
  });
  function handleCompleteHabit() {
    let status = "completed";
    let numValue: number | undefined = undefined;
    if (habit?.type === "count") {
      if (value === null || value <= 0) return;

      numValue = Number(value);
      const target = Number(habit.target_value ?? 0);

      if (numValue < target) {
        status = "frozen";
      } else {
        status = "completed";
      }
    }

    mutate({
      habitId: habit!.id,
      status,
      value: numValue,
    });
  }
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
  } else if (habit?.type === "count" && value === null) {
    buttonStyles = "bg-primary/30 cursor-not-allowed";
  }
  return (
    <div
      className={`w-[90%] space-y-4 self-center rounded-xl border p-4 ${cardStyles}`}
    >
      <h3 className={`text-lg font-semibold ${titleStyles}`}>{habit?.name}</h3>

      {habit?.type === "count" && !isDone && !isFrozen && (
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
      )}
      <button
        onClick={handleCompleteHabit}
        disabled={
          isDone ||
          isFrozen ||
          isPending ||
          (habit?.type === "count" && value === null)
        }
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
