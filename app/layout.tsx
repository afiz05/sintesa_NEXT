import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { fontSans, fontMono } from "@/config/fonts";
import { ToastContainer } from "@/components/ui/ToastContainer";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "sintesaNEXT | PDPSIPA",
  description:
    "Sistem Informasi Terpadu Pelaksanaan Anggaran - Next Generation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
