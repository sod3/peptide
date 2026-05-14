import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeKey = "clinical" | "midnight" | "sage" | "arctic" | "obsidian";

export const themes: { key: ThemeKey; name: string; tagline: string; swatches: string[] }[] = [
  { key: "clinical", name: "Clinical", tagline: "Recommended · highest US trust", swatches: ["#0e2a4d", "#1f8bf0", "#1fb5a8", "#f4f7fb"] },
  { key: "midnight", name: "Midnight", tagline: "Premium dark biotech", swatches: ["#0a1020", "#3ce0c8", "#33c4ff", "#0e1730"] },
  { key: "sage", name: "Sage", tagline: "Wellness × science", swatches: ["#27433a", "#7aae8c", "#caa14a", "#f6f6ee"] },
  { key: "arctic", name: "Arctic", tagline: "Crisp ultra-clinical", swatches: ["#1156e6", "#33b6ff", "#7e57e0", "#ffffff"] },
  { key: "obsidian", name: "Obsidian", tagline: "Luxury × champagne", swatches: ["#15110d", "#d9b773", "#e3925a", "#1f1a14"] },
];

type Ctx = { theme: ThemeKey; setTheme: (t: ThemeKey) => void };
const ThemeCtx = createContext<Ctx>({ theme: "clinical", setTheme: () => { } });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeKey>(() => (localStorage.getItem("Peptide-theme") as ThemeKey) || "clinical");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("Peptide-theme", theme);
  }, [theme]);
  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);
