"use client";

import {
  ThemeProvider as NextThemesProvider,
  useTheme,
} from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="cal-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

export { useTheme };
