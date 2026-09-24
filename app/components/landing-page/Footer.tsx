import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "./constants";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-t-slate-800 bg-slate-950/80 pt-20 pb-10 md:mt-30">
      <Container className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <div className="flex gap-3 pb-4">
              <Image
                src="/images/logo.webp"
                alt="Loopin logo"
                width={314}
                height={187}
                className="h-auto w-10 sm:w-12"
              />
              <p className="text-xl font-semibold text-slate-200">Loopin</p>
            </div>
            <p className="max-w-[400px] text-slate-400">
              Built for sustainable habit tracking with heatmaps, streak
              protection, and gentle AI coaching.
            </p>
          </div>
          <div className="space-y-2 *:text-slate-200 md:place-self-center">
            <p className="text-lg font-semibold">Navigation</p>
            <nav>
              <ul className="*:hover:text-secondary-hover space-y-1 text-slate-400 *:transition *:duration-150">
                <li>
                  <Link href="/">Overview</Link>
                </li>
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <hr className="h-0.5 border-0 bg-slate-700" />
        <div className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:justify-between sm:text-base">
          <p>© {new Date().getFullYear()} Loopin. All rights reserved.</p>
          <Link
            target="_blank"
            href="https://github.com/AmirFarahani82/Loopin"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-all duration-200 hover:text-slate-200"
          >
            <span>
              <FaGithub />
            </span>
            <span>Project's GitHub repository</span>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
