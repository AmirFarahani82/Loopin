import { Habit, HabitAnalysis, HabitLog } from "@/app/types";

export function createAnalysisData(
  habits: Habit[],
  habitLogs: HabitLog[],
  analysisStats: HabitAnalysis[],
) {
  const statsMap = new Map(analysisStats.map((s) => [s.habitId, s]));
  const logsMap: Map<string, HabitLog[]> = new Map();
  habitLogs.forEach((log) => {
    const existingLogs = logsMap.get(log.habit_id) || [];
    existingLogs.push(log);
    logsMap.set(log.habit_id, existingLogs);
  });
  const habitStatus = habits.map((habit) => {
    const stats = statsMap.get(habit.id);
    const logs = logsMap.get(habit.id) || [];
    return { stats, logs, habit };
  });

  return habitStatus;
}
