import HabitCard from "@/app/components/HabitCard";

export default function HabitsPanel() {
  return (
    <aside className="border-br border-l p-4">
      {/*ACTIVE habits*/}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-slate-200">Active Habits</h2>
          <span className="text-slate-200">[X / Y]</span>
        </div>
        <HabitCard />
      </div>

      {/*// DONE habits*/}
      <div></div>
    </aside>
  );
}
