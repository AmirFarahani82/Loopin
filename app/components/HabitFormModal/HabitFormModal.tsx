"use client";

import { FormProvider } from "react-hook-form";
import { useModal } from "@/libs/context/ModalContext";
import Input from "../Input";
import { categories, habitTypes } from "./constants";
import { FrequencySelector } from "./FrequencySelector";
import { useHabitFormModal } from "./useHabitFormModal";

export default function HabitFormModal() {
  const { modal, closeModal } = useModal();
  const { methods, onSubmit, type, isPending, error } = useHabitFormModal();

  if (modal.type === null) return null;

  const btnLabel = {
    add: isPending ? "Adding" : "Add",
    edit: isPending ? "Editing" : "Edit",
  };

  return (
    <div
      className="fixed inset-0 h-full w-full bg-black/50 backdrop-blur-md"
      onClick={closeModal}
    >
      <div
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="bg-cart-bg border-br shadow-main fixed top-1/2 left-1/2 flex max-h-[600px] w-[700px] -translate-1/2 flex-col items-center overflow-y-scroll rounded-xl border p-4 *:text-slate-200"
      >
        <h2 className="mb-15 text-2xl font-bold">
          {modal.type === "add" ? "Add new habit" : "Edit habit"}
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex w-4/5 flex-col gap-4"
          >
            <label htmlFor="name">
              Habit name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Enter habit name"
              register={methods.register}
              rules={{ required: "Habit name is required" }}
              error={methods.formState.errors.name}
            />
            <label htmlFor="category">
              Habit category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              className="border-br bg-tertiary rounded-xl border p-2.5"
              {...methods.register("category")}
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
              <FrequencySelector isPending={isPending} />
              {methods.formState.errors.selectedDays && (
                <p className="text-sm text-red-400">
                  {methods.formState.errors.selectedDays.message}
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
                      methods.setValue("type", habit.type);
                      if (habit.type === "boolean") {
                        methods.unregister("unit");
                        methods.unregister("target_value");
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
                    register={methods.register}
                    rules={{ required: "Unit is required" }}
                    error={methods.formState.errors.unit}
                  />
                  <label htmlFor="target_value" className="block">
                    Target value <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"

                    name="target_value"
                    placeholder="Enter habit target value"
                    register={methods.register}
                    rules={{
                      required: "Target value is required",
                      min: {
                        value: 1,
                        message: "Target value must be at least 1",
                      },
                      valueAsNumber: true,
                    }}
                    error={methods.formState.errors.target_value}
                  />
                </>
              )}
            </div>
            {error && (
              <p className="text-center text-red-400!">{error.message}</p>
            )}
            <div className="mt-5 flex justify-center gap-6">
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  methods.reset();
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
                {btnLabel[modal.type]}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
