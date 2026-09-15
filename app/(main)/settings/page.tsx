import { AccountSection } from "@/app/components/settings/AccountSection";
import { HabitsManagement } from "@/app/components/settings/HabitsManagement";
import { requireSession } from "@/libs/data/habits";

export default async function SettingsPage() {
  const session = await requireSession();
  return (
    <div className="p-4 sm:p-8">
      <div>
        <h2 className="text-heading font-bold text-slate-200 capitalize">
          Settings
        </h2>
        <h3 className="text-subtitle text-slate-400">
          Configure your habit engineering environment and account.
        </h3>
      </div>
      <div className="*:bg-tertiary mt-10 flex flex-col-reverse lg:grid lg:grid-cols-[1fr_300px] gap-4 lg:gap-15 *:rounded-xl *:border *:border-slate-700 *:p-4 lg:items-start">
        <div>
          <h3 className="text-secondary-active text-section-title font-semibold">
            Habit Management
          </h3>
          <HabitsManagement />
        </div>
        <div className="">
          <h3 className="text-secondary-active text-section-title font-semibold">
            Account Section
          </h3>
          <AccountSection session={session} />
        </div>
      </div>
    </div>
  );
}
