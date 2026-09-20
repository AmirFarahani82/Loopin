"use client";
import Link from "next/link";
import { navLinks } from "./constants";
import { IoIosClose } from "react-icons/io";
import { Dispatch, SetStateAction, useState } from "react";

export default function Nav({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <nav
      className={`absolute top-0 left-0 flex h-dvh w-1/2 justify-between border-r border-r-slate-700 bg-slate-900 p-4 transition-transform duration-200 sm:w-2/5 md:pointer-events-auto md:visible md:static md:h-max md:w-max md:translate-x-0 md:border-r-0 md:bg-inherit md:p-0 md:transition-none ${isOpen ? "translate-x-0" : "pointer-events-none -translate-x-full"}`}
    >
      <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 lg:gap-6">
        {navLinks.map((link) => (
          <li
            key={link.href}
            className="hover:text-secondary-hover transition duration-150"
          >
            <Link href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setIsOpen(false)} className="size-8 md:hidden">
        <IoIosClose className="size-full" />
      </button>
    </nav>
  );
}
