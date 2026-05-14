import { Logo } from "./Logo";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="dark-card mt-24">
    <div className="container py-20 pb-12">
      <div className="grid gap-12 md:grid-cols-5 md:gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Inject a white fill for logo since footer is dark if Logo component accepts it, or just use className to invert. The logo is SVG typically. */}
          <div className="text-white brightness-200 contrast-100">
            <Logo />
          </div>
          <p className="max-w-sm text-sm text-white/70 leading-relaxed font-light">
            Aevum Bio supplies third-party tested research peptides to licensed laboratories and qualified researchers across the United States.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["cGMP-Aligned", "ISO 9001 Facility", "USA Shipped", "HPLC ≥99%"].map((b) => (
              <span key={b} className="font-mono text-[10px] uppercase tracking-widest rounded-sm border border-white/20 bg-white/5 px-3 py-1.5 text-white/80">{b}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">Catalog</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link to="/shop" className="transition-colors hover:text-white">All Peptides</Link></li>
            <li><Link to="/shop" className="transition-colors hover:text-white">Bestsellers</Link></li>
            <li><Link to="/shop" className="transition-colors hover:text-white">New Arrivals</Link></li>
            <li><Link to="/shop" className="transition-colors hover:text-white">Bulk Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">Company</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link to="/about" className="transition-colors hover:text-white">About</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-white">Lab Standards</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-white">Contact</Link></li>
            <li><a href="#" className="transition-colors hover:text-white">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-display text-lg font-semibold tracking-wide text-white">Legal</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><a href="#" className="transition-colors hover:text-white">Terms</a></li>
            <li><a href="#" className="transition-colors hover:text-white">Privacy</a></li>
            <li><a href="#" className="transition-colors hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="transition-colors hover:text-white">Research Disclaimer</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 rounded-xl border border-white/10 bg-white/5 p-6 text-xs leading-relaxed text-white/60 font-light">
        <strong className="text-white font-medium">For research use only.</strong> Products sold by Aevum Bio are intended exclusively for in-vitro laboratory research and are not for human or veterinary use, food, or cosmetic applications. Customers must be qualified, licensed researchers and assume full responsibility for compliance with all applicable laws.
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} Aevum Bio Laboratories, Inc. - Wilmington, DE, USA.</div>
        <div className="font-mono uppercase tracking-widest text-[10px]">SSL Secured · Stripe Verified · HIPAA-Aware Infrastructure</div>
      </div>
    </div>
  </footer>
);
