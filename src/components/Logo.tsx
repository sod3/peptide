export const Logo = ({ className = "" }: { className?: string }) => (
  <a href="/" className={`flex items-center gap-2 ${className}`} aria-label="Peptideology">
    <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary shadow-glow">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M4 18c4-12 12-12 16 0" />
        <circle cx="8" cy="14" r="1.2" fill="currentColor" />
        <circle cx="16" cy="14" r="1.2" fill="currentColor" />
        <circle cx="12" cy="9" r="1.2" fill="currentColor" />
      </svg>
    </span>
    <div className="leading-none">
      <div className="font-display text-lg font-semibold tracking-tight uppercase">Peptideology</div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Research Peptides</div>
    </div>
  </a>
);
