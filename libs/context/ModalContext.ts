"use client";
import { createContext, useContext, useState } from "react";
type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};
export const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal must be used inside ModalContextProvider");

  return context;
}
