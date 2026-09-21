"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Container from "./Container";
import Nav from "./Nav";
import { usePathname } from "next/navigation";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center border-b border-b-slate-700 bg-slate-900/75 font-semibold text-slate-200 backdrop-blur-md md:h-18">
      <div
        className={`${isOpen ? "block" : "hidden"} absolute inset-0 h-screen w-screen bg-slate-900/30 backdrop-blur-xs md:hidden`}
        onClick={() => setIsOpen(false)}
      />
      <Container className="flex items-center justify-between">
        <div className="flex items-center-safe gap-2">
          <button className="size-5 md:hidden" onClick={() => setIsOpen(true)}>
            <GiHamburgerMenu />
          </button>
          <Image
            src="/images/logo.webp"
            alt="Loopin logo"
            width={314}
            height={187}
            className="h-auto w-9 sm:w-20"
          />
          <Link href="/" className="text-section-title">
            Loopin
          </Link>
        </div>
        <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex gap-3">
          <Link
            href="/signin"
            className="rounded-full bg-slate-800 px-2 py-1 lg:px-4 lg:py-2"
          >
            Signin
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-slate-200 px-2 py-1 text-slate-900 lg:px-4 lg:py-2"
          >
            Signup
          </Link>
        </div>
      </Container>
    </header>
  );
}
