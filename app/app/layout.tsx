import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Header } from "@/components/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "cBay — Treasures of the Deep",
  description: "A small, deterministic marketplace of questionable nautical goods.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
