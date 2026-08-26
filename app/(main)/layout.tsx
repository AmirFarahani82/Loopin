import React from "react";
import NavPanel from "@/app/components/ui/NavPanel";
import Providers from "./providers";
import HabitFormModal from "../components/habit-form/HabitFormModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="relative h-screen md:static md:grid md:grid-cols-[180px_minmax(0,2fr)]">
        <NavPanel />
        <div className="relative min-w-0 overflow-y-auto">
          {children}
          <HabitFormModal />
        </div>
      </main>
    </Providers>
  );
}
