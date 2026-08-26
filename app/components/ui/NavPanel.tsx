"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";

const navList = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    name: "Analysis",
    href: "/analysis",
    icon: <IoAnalyticsSharp />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <IoMdSettings />,
  },
];

export default function NavPanel() {
  const pathname = usePathname();

  return (
    <aside className="md:border-br bg-cart-bg fixed bottom-4 left-1/2 z-10 flex w-[300px] -translate-x-1/2 flex-col gap-4 rounded-full border border-slate-800 px-3 py-4 md:static md:left-0 md:w-auto md:translate-x-0 md:rounded-none md:border-0 md:border-r md:bg-inherit">
      <h1 className="text-primary text-heading hidden font-bold md:block">
        Loopin
      </h1>
      <nav className="w-full">
        <ul className="flex w-full items-center justify-evenly md:block">
          {navList.map((nav) => (
            <li key={nav.name} className="flex-1 md:flex-none">
              <Link
                href={nav.href}
                className={`hover:text-secondary-hover relative flex items-center justify-center gap-2 text-sm md:justify-start md:text-base ${pathname === nav.href ? "text-secondary-active" : "text-secondary"} `}
              >
                <span className="hidden md:block">{nav.icon}</span>
                <span
                  className={`transform duration-250 ${pathname === nav.href ? "md:translate-x-1.5" : ""}`}
                >
                  {nav.name}
                  {pathname === nav.href && (
                    <span
                      aria-hidden="true"
                      className="bg-primary absolute -bottom-1 left-1/2 h-[2px] w-[30px] -translate-x-1/2 rounded-full shadow-[0_2px_8px_#c7b1ff,0_-2px_8px_#c7b1ff] md:hidden"
                    />
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
