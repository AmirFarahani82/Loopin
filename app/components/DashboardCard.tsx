export default function DashboardCard() {
  return (
    <div className="*:shadow-cart grid grid-cols-3 gap-x-4 *:h-[100px] *:rounded-lg *:bg-[#141c2d] **:text-slate-200">
      <div className="flex flex-col items-center justify-center">
        <span>Curent streak</span>
        <span>[15]</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span>Today completion rate</span>
        <span>[85%]</span>
        <div className="h-2.5 w-4/5 rounded-2xl bg-slate-800">
          <div className="bg-primary h-full w-[85%] rounded-2xl"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span>How is your mood today?</span>
        <span>😢 ☹️ 😕 😐 🙂 😀</span>
      </div>
    </div>
  );
}
