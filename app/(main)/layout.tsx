import React from "react";
import NavPanel from "@/app/components/NavPanel";
import Providers from "./providers";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="grid h-screen grid-cols-[15%_minmax(0,2fr)]">
        <NavPanel />
        <div className="min-w-0 overflow-y-auto">{children}</div>
      </main>
    </Providers>
  );
}
