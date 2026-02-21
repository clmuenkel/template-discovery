"use client";

import { useEffect } from "react";
import type { ThemeConfig } from "@/config/types";
import { DEFAULT_THEME, hexToRgb } from "@/config/types";

interface Props {
  theme?: Partial<ThemeConfig>;
  children: React.ReactNode;
}

export default function ThemeProvider({ theme, children }: Props) {
  const resolved: ThemeConfig = { ...DEFAULT_THEME, ...theme };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-evios", resolved.accent);
    root.style.setProperty("--color-evios-light", resolved.accentLight);
    root.style.setProperty("--color-evios-dark", resolved.accentDark);
    root.style.setProperty("--color-evios-rgb", hexToRgb(resolved.accent));
    root.style.setProperty(
      "--color-evios-light-rgb",
      hexToRgb(resolved.accentLight)
    );

    return () => {
      root.style.removeProperty("--color-evios");
      root.style.removeProperty("--color-evios-light");
      root.style.removeProperty("--color-evios-dark");
      root.style.removeProperty("--color-evios-rgb");
      root.style.removeProperty("--color-evios-light-rgb");
    };
  }, [resolved.accent, resolved.accentLight, resolved.accentDark]);

  return <>{children}</>;
}
