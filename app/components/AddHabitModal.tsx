"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/libs/context/ModalContext";
import { addHabit } from "@/libs/actions/habits";
import Input from "./Input";
import { Addhabit } from "../types";

type HabitTypeOption = {
  type: "boolean" | "count";
  label: string;
  description: string;
};
// prettier-ignore
const categories = ["health","fitness","mind","work","education","finance","social","creative","routine",
];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const habitTypes: HabitTypeOption[] = [
  {
    type: "boolean",
    label: "Check off",
    description: "Just mark it down each day",
  },
  {
    type: "count",
    label: "Track a number",
    description: "Log a count against a target, glasses of water or pages read",
  },
];
export default function AddHabitModal() {
  const { isOpen, closeModal } = useModal();
  const {
    register,
    watch,
    setValue,
    unregister,
    clearErrors,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Addhabit>({
    defaultValues: {
      name: "",
      category: "health",
      frequency: "daily",
      selectedDays: [],
      type: "boolean",
      unit: "",
      target_value: undefined,
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: addHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      reset();
      closeModal();
    },
  });
  const onSubmit = (data: Addhabit) => {
    mutate(data);
  };
  const frequency = watch("frequency");
  const selectedDays = watch("selectedDays");
  const type = watch("type");
  useEffect(() => {
    register("selectedDays", {
      validate: (days, formvalues) =>
        formvalues.frequency !== "custom" ||
        days?.length > 0 ||
        "Select at least one day",
    });
  }, [register, frequency]);
  const toggleDay = (day: string) => {
    const currentDays = selectedDays || [];
    const updateDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];

    setValue("selectedDays", updateDays, { shouldValidate: true });
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 h-full w-full bg-black/50 backdrop-blur-md"
        onClick={closeModal}
      >
        <div
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="bg-cart-bg border-br shadow-main fixed top-1/2 left-1/2 flex max-h-[600px] w-[700px] -translate-1/2 flex-col items-center overflow-y-scroll rounded-xl border p-4 *:text-slate-200"
        >
          <h2 className="mb-15 text-2xl font-bold">Add new habit</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-4/5 flex-col gap-4"
          >
            <label htmlFor="name">
              Habit name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Enter habit name"
              register={register}
              rules={{ required: "Habit name is required" }}
              error={errors.name}
            />
            <label htmlFor="category">
              Habit category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              className="border-br bg-tertiary rounded-xl border p-2.5"
              {...register("category")}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div className="space-y-4">
              <label htmlFor="frequency" className="block">
                Habit frequency <span className="text-red-500">*</span>
              </label>
              <select
                id="frequency"
                className="border-br bg-tertiary w-full rounded-xl border p-2.5"
                {...register("frequency", {
                  onChange: (e) => {
                    if (e.target.value === "daily") {
                      setValue("selectedDays", []);
                      clearErrors("selectedDays");
                    }
                  },
                })}
              >
                <option value="daily">Daily</option>
                <option value="custom">Custom</option>
              </select>
              <div className="flex gap-4">
                {frequency === "custom" &&
                  weekDays.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => toggleDay(day)}
                        disabled={isPending}
                        className={`hover:shadow-main transform cursor-pointer rounded-xl px-4 py-2 duration-200 ${isSelected ? "bg-emerald-600 hover:bg-red-400/50" : "bg-slate-800 hover:bg-emerald-400/50"} disabled:cursor-not-allowed`}
                      >
                        {day}
                      </button>
                    );
                  })}
              </div>
              {errors.selectedDays && (
                <p className="text-sm text-red-400">
                  {errors.selectedDays.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block">
                Habit type <span className="text-red-500">*</span>
              </label>
              {habitTypes.map((habit) => {
                const isSelected = habit.type === type;
                return (
                  <button
                    type="button"
                    key={habit.type}
                    onClick={() => {
                      setValue("type", habit.type);
                      if (habit.type === "boolean") {
                        unregister("unit");
                        unregister("target_value");
                      }
                    }}
                    disabled={isPending}
                    className={`${isSelected ? "bg-emerald-600" : "bg-slate-800 hover:bg-emerald-400/50"} hover:shadow-main w-full transform cursor-pointer rounded-xl p-4 text-start duration-200 disabled:cursor-not-allowed`}
                  >
                    <p>
                      <span className="font-semibold">{habit.label}</span> -{" "}
                      <span className="italic">{habit.description}</span>
                    </p>
                  </button>
                );
              })}
              {type === "count" && (
                <>
                  <label htmlFor="unit" className="block">
                    Habit unit <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="unit"
                    placeholder="Enter habit unit(km, min, hour, etc.)"
                    register={register}
                    rules={{ required: "Unit is required" }}
                    error={errors.unit}
                  />
                  <label htmlFor="targetValue" className="block">
                    Target value <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"

                    name="targetValue"
                    placeholder="Enter habit target value"
                    register={register}
                    rules={{
                      required: "Target value is required",
                      min: {
                        value: 1,
                        message: "Target value must be at least 1",
                      },
                      valueAsNumber: true,
                    }}
                    error={errors.target_value}
                  />
                </>
              )}
            </div>
            {error && (
              <p className="text-center text-red-400!">{error.message}</p>
            )}
            <div className="mt-5 flex justify-center gap-6">
              <button
                onClick={() => {
                  closeModal();
                  reset();
                }}
                disabled={isPending}
                className="cursor-pointer rounded-md bg-red-500 p-2 disabled:cursor-not-allowed disabled:bg-red-500/30 disabled:text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="cursor-pointer rounded-md bg-emerald-500 px-4 py-2 disabled:cursor-not-allowed disabled:bg-emerald-500/30 disabled:text-slate-500"
              >
                {isPending ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
