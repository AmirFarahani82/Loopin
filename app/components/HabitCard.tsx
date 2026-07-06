import { FaCheckCircle } from "react-icons/fa";

export default function HabitCard() {
  return (
    <div className="bg-cart-bg shadow-cart w-[90%] space-y-4 self-center rounded-xl border border-slate-700 p-4">
      <h3 className="text-primary text-lg font-semibold">[HABIT TITLE]</h3>

      <input
        type="number"
        placeholder="type value here"
        className="placeholder-secondary/50 border-br bg-tertiary focus:border-primary w-full [appearance:textfield] rounded-xl border p-2.5 text-white transition-colors outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button className="hover:bg-secondary bg-primary flex w-full items-center justify-center gap-2 rounded-xl p-2.5 font-medium text-[#0f172a] shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-103 hover:shadow-[0_0_15px_rgb(109,73,253)] active:translate-y-0.5 active:scale-100">
        {" "}
        <span>
          <FaCheckCircle />
        </span>{" "}
        <span>complete</span>
      </button>
    </div>
  );
}
