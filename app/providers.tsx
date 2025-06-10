"use client";
import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { NotificationProvider } from "@/components/context/NotificationContext";
import { ToastProvider } from "@/components/context/ToastContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        {...themeProps}
      >
        <NotificationProvider>
          <ToastProvider>{children}</ToastProvider>
        </NotificationProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
