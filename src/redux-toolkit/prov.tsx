"use client";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }: any) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
