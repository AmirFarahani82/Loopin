import { AccountSection } from "@/app/components/AccountSection";
import { HabitsManagement } from "@/app/components/HabitsManagement";
import { requireSession } from "@/libs/data/habits";

export default async function SettingsPage() {
  const session = await requireSession();
  return (
    <div className="p-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-200 capitalize">
          Settings
        </h2>
        <h3 className="text-lg text-slate-400">
          Configure your habit engineering environment and account.
        </h3>
      </div>
      <div className="*:bg-tertiary mt-10 grid grid-cols-[1fr_300px] items-start gap-15 *:rounded-xl *:border *:border-slate-700 *:p-4">
        <div>
          <h3 className="text-secondary-active text-2xl font-semibold">
            Habit Management
          </h3>
          <HabitsManagement />
        </div>
        <div className="">
          <h3 className="text-secondary-active text-2xl font-semibold">
            Account Section
          </h3>
          <AccountSection session={session} />
        </div>
      </div>
    </div>
  );
}
