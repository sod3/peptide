import { Logo } from "./Logo";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-surface mt-24">
    <div className="container py-16">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Aevum Bio supplies third-party tested research peptides to licensed laboratories and qualified researchers across the United States.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["cGMP-Aligned", "ISO 9001 Facility", "USA Shipped", "HPLC ≥99%"].map((b) => (
              <span key={b} className="font-mono text-[10px] uppercase tracking-wider rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">{b}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Catalog</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All Peptides</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Bestsellers</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">New Arrivals</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Bulk Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/about" className="hover:text-foreground">Lab Standards</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><a href="#" className="hover:text-foreground">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-foreground">Research Disclaimer</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border/60 bg-card/60 p-5 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">For research use only.</strong> Products sold by Aevum Bio are intended exclusively for in-vitro laboratory research and are not for human or veterinary use, food, or cosmetic applications. Customers must be qualified, licensed researchers and assume full responsibility for compliance with all applicable laws.
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} Aevum Bio Laboratories, Inc. — Wilmington, DE, USA.</div>
        <div className="font-mono uppercase tracking-wider">SSL Secured · Stripe Verified · HIPAA-Aware Infrastructure</div>
      </div>
    </div>
  </footer>
);
