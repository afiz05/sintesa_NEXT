import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { fontSans, fontMono } from "@/config/fonts";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { ThemeScript } from "./theme-script";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={clsx(
          "font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
