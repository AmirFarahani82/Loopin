import { Frequency, HabitAnalysisData } from "@/app/types";
function isScheduledDay(frequency: Frequency, dateStr: string): boolean {
  if (frequency.type === "daily") return true;

  const d = new Date(dateStr + "T12:00:00Z");
  const dayIndex = d.getUTCDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

  return frequency.days.includes(dayNames[dayIndex]);
}
function getDateBefore(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().split("T")[0];
}
export function createDailyAiPayload(
  analysisData: HabitAnalysisData[],
  today: string,
) {
  const payload = analysisData.map(({ habit, stats, logs }) => {
    const todayLog = logs.find((log) => log.date === today);
    const isScheduled = isScheduledDay(habit.frequency, today);
    let statusToday = "pending";
    if (todayLog) {
      statusToday = todayLog.status;
    } else if (!isScheduled) {
      statusToday = "not_scheduled";
    }

    return {
      habit: habit.name,
      status: statusToday,
      streak: stats?.current_streak || 0,
      successRate: `${stats?.completion_rate}%` || "0%",
    };
  });
  return payload;
}

export function createWeeklyAiPayload(
  analysisData: HabitAnalysisData[],
  today: string,
) {
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    getDateBefore(today, i),
  );

  const payload = analysisData.map(({ habit, stats, logs }) => {
    let weeklyScheduled = 0;
    let weeklyCompleted = 0;

    last7Days.forEach((date) => {
      const isScheduled = isScheduledDay(habit.frequency, date);
      const dayLog = logs.find((log) => log.date === date);
      if (isScheduled) {
        weeklyScheduled++;
        if (dayLog?.status === "completed") weeklyCompleted++;
      }
    });

    return {
      habit: habit.name,
      weeklyPerformance: `${weeklyCompleted}/${weeklyScheduled}`,
      streak: stats?.current_streak || 0,
      overallSuccessRate: stats?.completion_rate
        ? `${stats.completion_rate}%`
        : "0%",
    };
  });

  return payload.filter((p) => p.weeklyPerformance !== "0/0");
}
