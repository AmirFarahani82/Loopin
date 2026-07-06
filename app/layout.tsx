import type { Metadata } from "next";
import "./globals.css";
import NavPanel from "./components/NavPanel";

export const metadata: Metadata = {
  title: "Loopin",
  description: "Track Your Habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <main className="grid h-screen grid-cols-[15%_minmax(0,2fr)]">
          <NavPanel />
          <div className="min-w-0 overflow-y-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
