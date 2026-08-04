"use client";
import { createContext, useContext, useState } from "react";
import { ModalType } from "../providers/ModalContextProvider";
type ModalContextType = {
  modal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};
export const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal must be used inside ModalContextProvider");

  return context;
}
