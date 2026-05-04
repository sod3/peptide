import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { themes, useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 rounded-full border-border/70">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Palette</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-2">
        <div className="px-2 py-2">
          <div className="font-display text-sm font-semibold">Brand Palette</div>
          <p className="text-xs text-muted-foreground">5 researched biotech themes - switch live.</p>
        </div>
        <div className="space-y-1">
          {themes.map((t) => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className="flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-muted"
            >
              <div className="flex h-6 w-12 overflow-hidden rounded-md ring-1 ring-border">
                {t.swatches.map((c) => (
                  <span key={c} className="flex-1" style={{ background: c }} />
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{t.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{t.tagline}</div>
              </div>
              {theme === t.key && <Check className="h-4 w-4 text-accent" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
