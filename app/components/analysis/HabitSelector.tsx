"use client";
type Props = {
  habit: string;
  habitId: string;
  isSelected: boolean;
  onSelect: (habitId: string) => void;
};
export function HabitSelector({ habit, habitId, isSelected, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(habitId)}
      className={`hover:shadow-main mr-1 transform cursor-pointer rounded-md px-2 py-2 text-slate-200 duration-200 ${isSelected ? "bg-emerald-600 hover:bg-red-400/50" : "bg-slate-800 hover:bg-emerald-400/50"} disabled:cursor-not-allowed`}
    >
      {habit}
    </button>
  );
}
