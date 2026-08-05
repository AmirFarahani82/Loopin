import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { weekDays } from "./constants";
import { HabitFormValues } from "./types";

export function FrequencySelector({ isPending }: { isPending: boolean }) {
  const { register, watch, setValue, clearErrors } =
    useFormContext<HabitFormValues>();
  const frequency = watch("frequency");
  const selectedDays = watch("selectedDays");
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
    <>
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
    </>
  );
}
