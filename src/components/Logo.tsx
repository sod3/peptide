export const Logo = ({ className = "" }: { className?: string }) => (
  <a href="/" className={`group flex items-center gap-3 ${className}`} aria-label="Aevum Bio">
    <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-surface transition-transform group-hover:scale-110 duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c0-4.5 3.5-8 8-8s8 3.5 8 8" />
          <path d="M12 4.5v4" />
          <circle cx="12" cy="12.5" r="1.5" fill="currentColor" />
        </svg>
      </span>
    </div>
    <div className="flex flex-col">
      <span className="font-display text-xl font-bold tracking-tighter text-foreground leading-none">
        AEVUM<span className="text-primary italic">BIO</span>
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/60 font-bold leading-none mt-1">
        LABORATORIES
      </span>
    </div>
  </a>
);
