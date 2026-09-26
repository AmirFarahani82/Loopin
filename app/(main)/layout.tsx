import React from "react";
import NavPanel from "@/app/components/ui/NavPanel";
import Providers from "./providers";
import HabitFormModal from "../components/habit-form/HabitFormModal";
import NextTopLoader from "nextjs-toploader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <NextTopLoader
        color="#8b5cf6"
        height={3}
        showSpinner={false}
        initialPosition={0.05}
        crawlSpeed={150}
      />
      <main className="relative h-screen md:static md:grid md:grid-cols-[180px_minmax(0,2fr)]">
        <NavPanel />
        <div className="relative min-w-0 overflow-y-auto pb-16">
          {children}
          <HabitFormModal />
        </div>
      </main>
    </Providers>
  );
}
