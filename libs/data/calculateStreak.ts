import { Habit, HabitLog, StreakResult } from "@/app/types";

function isScheduledDay(habit: Habit, dateStr: string): boolean {
  if (habit.frequency.type === "daily") return true;

  const d = new Date(dateStr + "T12:00:00Z");
  const dayIndex = d.getUTCDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

  return habit.frequency.days.includes(dayNames[dayIndex]);
}
function getDateBefore(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().split("T")[0];
}

export function calculateStreak(
  habit: Habit,
  logs: HabitLog[] = [],
  today: string,
): StreakResult {
  const logsByDate = new Map<string, HabitLog>();
  for (const log of logs) {
    const existing = logsByDate.get(log.date);
    if (!existing || new Date(log.logged_at) > new Date(existing.logged_at)) {
      logsByDate.set(log.date, log);
    }
  }

  if (logsByDate.size === 0) {
    return {
      habitId: habit.id,
      current_streak: 0,
      totalValue: 0,
      last_completed_date: null,
      is_active: false,
      freeze_days_used: 0,
      last_log_date: null,
      missed_days: [],
    };
  }

  const habitCreated = habit.created_at.split("T")[0];
  let streak = 0;
  let totalValue = 0;
  let freezeDays = 0;
  let consecutiveFrozen = 0;
  const MAX_CONSECUTIVE_FROZEN = 3;
  let lastCompletedDate: string | null = null;
  let lastActiveDate: string | null = null;
  const missedDays: string[] = [];

  let currentDate = today;
  let isStreakBroken = false;

  while (currentDate >= habitCreated) {
    const log = logsByDate.get(currentDate);
    const scheduled = isScheduledDay(habit, currentDate);

    if (!scheduled) {
      currentDate = getDateBefore(currentDate, 1);
      continue;
    }

    if (log) {
      const isCompleted =
        habit.type === "boolean"
          ? log.status === "completed"
          : (log.value ?? 0) >= (habit.target_value ?? 1);

      if (isCompleted) {
        streak++;
        consecutiveFrozen = 0;
        freezeDays = 0;
        if (!lastCompletedDate) lastCompletedDate = currentDate;
        if (!lastActiveDate) lastActiveDate = currentDate;
        if (habit.type === "count") totalValue += log.value ?? 0;
      } else if (habit.type === "count" && log.status === "frozen") {
        if (consecutiveFrozen + 1 > MAX_CONSECUTIVE_FROZEN) {
          isStreakBroken = true;
          missedDays.push(currentDate);
          break;
        }
        consecutiveFrozen++;
        freezeDays++;
        if (!lastActiveDate) lastActiveDate = currentDate;
      } else {
        if (currentDate !== today) {
          isStreakBroken = true;
          missedDays.push(currentDate);
          break;
        }
      }
    } else {
      if (currentDate === today) {
        currentDate = getDateBefore(currentDate, 1);
        continue;
      } else {
        isStreakBroken = true;
        missedDays.push(currentDate);
        break;
      }
    }

    currentDate = getDateBefore(currentDate, 1);
  }

  let lastScheduledDate = getDateBefore(today, 1);
  while (!isScheduledDay(habit, lastScheduledDate)) {
    lastScheduledDate = getDateBefore(lastScheduledDate, 1);
  }

  const isActive =
    streak > 0 &&
    (lastActiveDate === today || lastActiveDate === lastScheduledDate);

  return {
    habitId: habit.id,
    current_streak: streak,
    totalValue,
    last_completed_date: lastCompletedDate,
    is_active: isActive,
    freeze_days_used: freezeDays,
    last_log_date: Array.from(logsByDate.keys()).sort().reverse()[0] || null,
    missed_days: missedDays,
  };
}
