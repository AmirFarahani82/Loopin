"use client";
import { useState } from "react";
import { ModalContext } from "../context/ModalContext";

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <ModalContext value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext>
  );
}
