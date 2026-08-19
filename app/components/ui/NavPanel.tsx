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
    <aside className="border-br flex flex-col gap-4 border-r px-3 py-4">
      <h1 className="text-primary text-3xl font-bold">Loopin</h1>
      <nav>
        <ul>
          {navList.map((nav) => (
            <li key={nav.name}>
              <Link
                href={nav.href}
                className={`hover:text-secondary-hover flex items-center gap-2 ${pathname === nav.href ? "text-secondary-active" : "text-secondary"} `}
              >
                <span>{nav.icon}</span>
                <span
                  className={`transform duration-250 ${pathname === nav.href ? "translate-x-1.5" : ""}`}
                >
                  {nav.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
