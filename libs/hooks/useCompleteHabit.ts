import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { completeHabit } from "../actions/habits";
import { Habit, HabitLog } from "@/app/types";

export function useCompleteHabit(habit: Habit, frozenHabitlog?: HabitLog[]) {
  const [value, setValue] = useState<null | number>(null);
  const queryClient = useQueryClient();
  const frozenLogValue = frozenHabitlog
    ?.filter((log) => log.habit_id === habit?.id)
    .map((log) => log.value)
    .pop();

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
      await queryClient.cancelQueries({ queryKey: ["allHabits"] });
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
    onSuccess: () => {
      setValue(null);
    },
  });
  function handleCompleteHabit() {
    let status = "completed";
    let numValue: number | undefined = undefined;
    const currentValue = frozenLogValue ?? 0;
    if (habit?.type === "count") {
      if (value === null || value <= 0) return;

      numValue = currentValue + Number(value);
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
  const isInputInvalid = habit?.type === "count" && value === null;

  return {
    value,
    setValue,
    frozenLogValue,
    isPending,
    handleCompleteHabit,
    isInputInvalid,
  };
}
