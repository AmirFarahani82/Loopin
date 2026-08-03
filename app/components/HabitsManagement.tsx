"use client";

import { useAllHabits } from "@/libs/hooks/useAllHabits";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export function HabitsManagement() {
  const { habits } = useAllHabits();
  return (
    <ul className="mx-auto w-4/5 space-y-4">
      {habits.map((habit) => (
        <li
          key={habit.id}
          className="bg-cart-bg border-br mt-4 flex items-center justify-between rounded-md border p-4 shadow-[0_6px_12px_-4px_rgb(0_0_0/0.25),0_2px_4px_-2px_rgb(15_23_42/0.18),inset_0_1px_0_rgb(255_255_255/0.04)]"
        >
          <div className="space-y-2 capitalize">
            <p className="text-secondary">{habit.name}</p>
            <p className="inline rounded-md bg-slate-700 px-1 py-0.5 text-slate-400">
              {habit.category}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiEdit2 className="text-secondary hover:text-secondary-hover size-5 transform cursor-pointer duration-200" />
            <RiDeleteBin6Line className="size-5 transform cursor-pointer text-red-400 duration-200 hover:text-red-500" />
          </div>
        </li>
      ))}
    </ul>
  );
}
