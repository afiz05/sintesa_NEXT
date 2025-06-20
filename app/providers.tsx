"use client";
import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { NotificationProvider } from "@/components/context/NotificationContext";
import { ToastProvider } from "@/components/context/ToastContext";
import { MyContextProvider } from "@/utils/Contex";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <MyContextProvider>
      <HeroUIProvider>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          enableSystem={true}
          enableColorScheme={true}
          storageKey="sintesa-theme"
          {...themeProps}
        >
          <NotificationProvider>
            <ToastProvider>{children}</ToastProvider>
          </NotificationProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </MyContextProvider>
  );
}
