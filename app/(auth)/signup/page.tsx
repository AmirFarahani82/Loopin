"use client";
import Input from "@/app/components/Input";
import { SignupForm } from "@/app/types";
import { signUp, type AuthState } from "@/libs/actions/auth";
import Link from "next/link";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
const initialState: AuthState = { error: null };

export default function Signup() {
  const [state, formAction, pending] = useActionState(signUp, initialState);
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<SignupForm>();
  return (
    <div className="bg-cart-bg shadow-main border-br flex w-100 flex-col items-center justify-center gap-5 rounded-xl border px-4 py-15 **:text-slate-200">
      <h2>Signup</h2>
      <p>Signup to continue to the app</p>
      <form
        action={formAction}
        onSubmit={async (e) => {
          const valid = await trigger();
          if (!valid) e.preventDefault();
        }}
        className="space-y-6"
      >
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          register={register}
          error={errors.name}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
        />
        <input
          type="hidden"
          name="timezone"
          value={Intl.DateTimeFormat().resolvedOptions().timeZone}
        />
        {state.error && (
          <p className="text-center text-sm text-red-400!">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="hover:bg-secondary bg-primary flex w-full items-center justify-center gap-2 rounded-xl p-2.5 font-medium text-[#0f172a]! shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-103 hover:shadow-[0_0_15px_rgb(109,73,253)] active:translate-y-0.5 active:scale-100"
        >
          {pending ? "Signing up..." : "Signup"}
        </button>
      </form>
      <Link href="/signin" className="underline underline-offset-2">
        Already have an acount? Sign in
      </Link>
    </div>
  );
}
