"use client";
import HabitCard from "@/app/components/HabitCard";
import CardSkeleton from "./CardSkeleton";
import { useTodayHabits } from "@/libs/hooks/useTodayHabits";
import { useModal } from "@/libs/context/ModalContext";

export default function HabitsPanel({ today }: { today: string }) {
  const {
    habits,
    habitsError,
    isPending,
    todayActiveHabits,
    todayDoneHabits,
    todayFrozenHabits,
    frozenHabitlog,
  } = useTodayHabits(today);
  const { openModal } = useModal();

  if (isPending) {
    return (
      <aside className="border-br h-screen space-y-4 border-l p-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </aside>
    );
  } else if (habitsError) {
    return (
      <aside className="border-br flex h-screen items-center justify-center border-l">
        <p className="text-center text-lg text-red-400">
          {habitsError.message}
        </p>
      </aside>
    );
  } else if (!habits.length) {
    return (
      <aside className="border-br flex h-screen flex-col items-center justify-center gap-4 border-l">
        <p className="text-center text-lg text-slate-200">
          You have no habit yet.
        </p>
        <button
          onClick={() => openModal()}
          className="text-secondary hover:text-secondary-hover w-fit transform self-center text-lg duration-200 hover:cursor-pointer"
        >
          + Add habit
        </button>
      </aside>
    );
  }
  return (
    <aside className="border-br h-screen space-y-6 overflow-y-scroll border-l p-4">
      {/*ACTIVE habits*/}
      <div className="flex max-h-2/3 flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-slate-200">Active Habits</h2>
            <span className="text-slate-200">
              {todayDoneHabits?.length} / {habits?.length}
            </span>
          </div>
          <button
            onClick={openModal}
            className="text-secondary hover:text-secondary-hover w-fit transform self-center text-lg duration-200 hover:cursor-pointer"
          >
            + Add habit
          </button>
        </div>
        <div className="flex w-full flex-col gap-4 overflow-y-auto">
          {habits.length > 0 &&
            !todayActiveHabits?.length &&
            !todayFrozenHabits?.length && (
              <p className="py-8 text-center text-lg text-slate-200">
                You have done all your habits
              </p>
            )}
          {todayActiveHabits?.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}

          {todayFrozenHabits?.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isFrozen={true}
              frozenHabitlog={frozenHabitlog}
            />
          ))}
        </div>
      </div>

      {/*// DONE habits*/}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl text-slate-200">Completed Habits</h2>
        {!todayDoneHabits?.length && (
          <p className="py-8 text-center text-lg text-slate-200">
            You have not done any habit yet
          </p>
        )}
        {todayDoneHabits &&
          todayDoneHabits.length > 0 &&
          todayDoneHabits?.map((habit) => (
            <HabitCard key={habit.id} habit={habit} isDone={true} />
          ))}
      </div>
    </aside>
  );
}
