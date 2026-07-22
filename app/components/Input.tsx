"use client";
import { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";

type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: FieldError;
};

export default function Input({
  type,
  name,
  placeholder,
  register,
  rules,
  error,
}: InputProps) {
  return (
    <>
      <input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        className="placeholder-secondary/50 border-br bg-tertiary focus:border-primary w-full [appearance:textfield] rounded-xl border p-2.5 text-white transition-colors outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      {error && (
        <p className="text-center text-sm text-red-400!">{error.message}</p>
      )}
    </>
  );
}
