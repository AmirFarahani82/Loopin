import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/libs/context/ModalContext";
import { addHabit, editHabit } from "@/libs/actions/habits";
import { HabitFormValues } from "./types";
import { formDefaults } from "./constants";
import { queryKeys } from "@/libs/query/keys";

export function useHabitFormModal() {
  const { modal, closeModal } = useModal();
  const methods = useForm<HabitFormValues>({ defaultValues: formDefaults });
  const { watch, reset } = methods;
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: HabitFormValues) => {
      if (modal.type === "edit") return editHabit({ id: modal.id, data });

      return addHabit(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.habits });
      queryClient.invalidateQueries({ queryKey: queryKeys.allHabits });
      reset();
      closeModal();
    },
  });
  const onSubmit = (data: HabitFormValues) => {
    mutate(data);
  };

  const type = watch("type");

  useEffect(() => {
    if (modal.type === "add") reset(formDefaults);
    if (modal.type === "edit") reset(modal.data);
  }, [modal.type]);

  return {
    methods,
    onSubmit,
    type,
    isPending,
    error,
  };
}
