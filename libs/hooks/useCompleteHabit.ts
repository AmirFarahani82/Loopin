import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { completeHabit } from "../actions/habits";
import { Habit, HabitLog } from "@/app/types";
import { queryKeys } from "../query/keys";

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
      await queryClient.cancelQueries({ queryKey: queryKeys.habits });
      await queryClient.cancelQueries({ queryKey: queryKeys.allHabits });
      await queryClient.cancelQueries({ queryKey: queryKeys.habitLogs });
      await queryClient.cancelQueries({ queryKey: queryKeys.heatmap });
      await queryClient.cancelQueries({ queryKey: queryKeys.aiDailyInsight });
      const previousLogs = queryClient.getQueryData(queryKeys.habitLogs);
      const previousHeatmap = queryClient.getQueryData(queryKeys.heatmap);
      const todayStr = new Date().toLocaleDateString("en-CA");

      queryClient.setQueryData(queryKeys.habitLogs, (old: any) => {
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
        queryClient.setQueryData(queryKeys.habitLogs, context.previousLogs);
      }
      if (context?.previousHeatmap) {
        queryClient.setQueryData(queryKeys.heatmap, context.previousHeatmap);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.habits });
      queryClient.invalidateQueries({ queryKey: queryKeys.habitLogs });
      queryClient.invalidateQueries({ queryKey: queryKeys.heatmap });
      queryClient.invalidateQueries({ queryKey: queryKeys.aiDailyInsight });
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
