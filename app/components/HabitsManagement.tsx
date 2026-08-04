"use client";

import { useAllHabits } from "@/libs/hooks/useAllHabits";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import CardSkeleton from "./CardSkeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHabit } from "@/libs/actions/habits";
import { useState } from "react";
import { useModal } from "@/libs/context/ModalContext";

export function HabitsManagement() {
  const [deletingId, setDeletingId] = useState("");
  const queryClient = useQueryClient();
  const { habits, isPending } = useAllHabits();
  const { openModal } = useModal();
  const {
    mutate,
    isPending: deleteIsPending,
    isError,
    error,
  } = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["allHabits"] });
    },
  });
  if (isPending) {
    return (
      <div className="mx-auto mt-4 space-y-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }
  return (
    <ul className="mx-auto mt-4 w-4/5 space-y-4">
      {habits.map((habit) => (
        <li
          key={habit.id}
          className="bg-cart-bg border-br flex items-center justify-between rounded-md border p-4 shadow-[0_6px_12px_-4px_rgb(0_0_0/0.25),0_2px_4px_-2px_rgb(15_23_42/0.18),inset_0_1px_0_rgb(255_255_255/0.04)]"
        >
          <div className="space-y-2 capitalize">
            <p className="text-secondary">{habit.name}</p>
            <p className="inline rounded-md bg-slate-700 px-1 py-0.5 text-slate-400">
              {habit.category}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {deletingId === habit.id ? (
              <>
                <button
                  className="cursor-pointer rounded-md bg-slate-700 px-2 py-1 text-slate-200 disabled:cursor-not-allowed"
                  onClick={() => setDeletingId("")}
                  disabled={deleteIsPending}
                >
                  Cancel
                </button>
                <button
                  className="cursor-pointer rounded-md bg-red-500 px-2 py-1 text-slate-200 disabled:cursor-not-allowed"
                  onClick={() => mutate(habit.id)}
                  disabled={deleteIsPending}
                >
                  {deleteIsPending ? "Deleting..." : "Confirm"}
                </button>
              </>
            ) : (
              <>
                <FiEdit2
                  onClick={openModal}
                  className="text-secondary hover:text-secondary-hover size-5 transform cursor-pointer duration-200"
                />
                <RiDeleteBin6Line
                  onClick={() => setDeletingId(habit.id)}
                  className="size-5 transform cursor-pointer text-red-400 duration-200 hover:text-red-500"
                />
              </>
            )}
          </div>
          {isError && deletingId === habit.id && (
            <p className="text-center text-red-400">{error.message}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
