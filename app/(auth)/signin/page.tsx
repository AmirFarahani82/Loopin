"use client";
import Input from "@/app/components/ui/Input";
import { SigninForm } from "@/app/types";
import { signIn, signUp, type AuthState } from "@/libs/actions/auth";
import Link from "next/link";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
const initialState: AuthState = { error: null };

export default function Signin() {
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<SigninForm>();
  return (
    <div className="bg-cart-bg shadow-main border-br flex w-100 flex-col items-center justify-center gap-5 rounded-xl border px-4 py-15 **:text-slate-200">
      <h2>Signin</h2>
      <p>Welcome back, Sign in to your acount</p>
      <form
        action={formAction}
        onSubmit={async (e) => {
          const valid = await trigger();
          if (!valid) e.preventDefault();
        }}
        className="space-y-6"
      >
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          register={register}
          rules={{ required: "Email is required" }}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          register={register}
          rules={{ required: "Password is required" }}
          error={errors.password}
        />

        {state.error && (
          <p className="text-center text-sm text-red-400!">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="hover:bg-secondary bg-primary disabled:bg-primary/50 flex w-full items-center justify-center gap-2 rounded-xl p-2.5 font-medium text-[#0f172a]! shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-103 hover:shadow-[0_0_15px_rgb(109,73,253)] active:translate-y-0.5 active:scale-100 disabled:cursor-not-allowed"
        >
          {pending ? "Signing in..." : "Signin"}
        </button>
      </form>
      <Link href="/signup" className="underline underline-offset-2">
        Don't have an acount? Sign up
      </Link>
    </div>
  );
}
