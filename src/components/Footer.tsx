import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Footer = () => (
  <footer className="mt-24 border-t border-border/40 bg-surface p-6 md:p-12">
    <div className="mx-auto max-w-7xl rounded-[3rem] bg-background/5 p-8 md:p-16 backdrop-blur-sm">
      <div className="grid gap-16 lg:grid-cols-12 text-foreground">
        <div className="lg:col-span-4 space-y-8">
          <Logo />
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground/80">
            Aevum Bio supplies third-party tested research peptides to licensed laboratories and qualified researchers across the United States.
          </p>
          <div className="flex flex-wrap gap-2">
            {["cGMP-Aligned", "ISO 9001", "USA Shipped", "HPLC ≥99%"].map((b) => (
              <span key={b} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">Catalog</h4>
          <ul className="space-y-4 text-[14px]">
            <li><Link to="/shop" className="text-muted-foreground transition-colors hover:text-primary">All Peptides</Link></li>
            <li><Link to="/shop" className="text-muted-foreground transition-colors hover:text-primary">Bestsellers</Link></li>
            <li><Link to="/shop" className="text-muted-foreground transition-colors hover:text-primary">New Arrivals</Link></li>
            <li><Link to="/shop" className="text-muted-foreground transition-colors hover:text-primary">Research Grade</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">Company</h4>
          <ul className="space-y-4 text-[14px]">
            <li><Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">About Aevum</Link></li>
            <li><Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">Lab Standards</Link></li>
            <li><Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">Contact</Link></li>
            <li><a href="#" className="text-muted-foreground transition-colors hover:text-primary">Press Kit</a></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">Stay Updated</h4>
          <p className="mb-6 text-[13px] text-muted-foreground/80">Join our newsletter for the latest research breakthroughs.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="researcher@lab.org" 
              className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 px-6 text-sm outline-none transition-all focus:border-primary/50 focus:bg-white/[0.08]"
            />
            <button className="absolute right-2 top-2 h-10 rounded-xl bg-primary px-4 text-[12px] font-medium text-primary-foreground transition-transform active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 text-[13px] leading-relaxed text-muted-foreground/60">
        <strong className="text-foreground/80">Research Laboratory Disclaimer:</strong> Products sold by Aevum Bio are intended exclusively for in-vitro laboratory research and are not for human or veterinary use. They are not to be used as food, cosmetics, or medicines. Any reliance on the information provided on this website is at your own risk.
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-12 text-[11px] text-muted-foreground/40 md:flex-row">
        <div>© {new Date().getFullYear()} Aevum Bio Laboratories, Inc. Wilmington, DE.</div>
        <div className="flex gap-8 font-mono uppercase tracking-[0.2em]">
          <span>SSL Secured</span>
          <span>Stripe verified</span>
          <span>cGMP Facility</span>
        </div>
      </div>
    </div>
  </footer>
);
