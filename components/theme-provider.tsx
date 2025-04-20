"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // To avoid hydration mismatch, only render children when mounted
  return (
    <NextThemesProvider {...props}>
      {mounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }}>{children}</div>
      )}
    </NextThemesProvider>
  );
}
