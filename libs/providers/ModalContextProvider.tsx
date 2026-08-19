"use client";
import { useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { HabitFormValues } from "@/app/components/habit-form/types";
export type ModalType =
  | { type: "add" }
  | { type: "edit"; id: string; data: HabitFormValues }
  | { type: null };

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modal, setModal] = useState<ModalType>({ type: null });
  function openModal(type: ModalType) {
    setModal(type);
  }
  function closeModal() {
    setModal({ type: null });
  }
  return (
    <ModalContext value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext>
  );
}
