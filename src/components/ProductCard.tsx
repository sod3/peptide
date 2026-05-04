import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Button } from "./ui/button";
import { ShieldCheck, Plus } from "lucide-react";
import vial from "@/assets/peptide-vial.png";

export const ProductCard = ({ p }: { p: Product }) => (
  <Link
    to={`/product/${p.slug}`}
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-elegant"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface to-surface-2">
      <div className="absolute inset-0 grid-bg opacity-50" />
      {p.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
          {p.badge}
        </span>
      )}
      <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur">
        <ShieldCheck className="h-3 w-3 text-accent" />
        {p.purity}% HPLC
      </span>
      <img
        src={vial}
        alt={p.name}
        loading="lazy"
        width={400}
        height={300}
        className="absolute inset-0 m-auto h-[88%] w-auto object-contain transition-transform duration-700 ease-out-expo group-hover:scale-105 group-hover:-rotate-3"
      />
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{p.category} · {p.mg}mg</div>
      <h3 className="mt-1 font-display text-xl font-semibold">{p.name}</h3>
      <p className="text-sm text-muted-foreground">{p.tagline}</p>
      <div className="mt-4 flex items-end justify-between pt-2">
        <div>
          <div className="font-mono text-[10px] uppercase text-muted-foreground">USD</div>
          <div className="font-display text-2xl font-semibold tracking-tight">${p.price}</div>
        </div>
        <Button size="sm" className="rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  </Link>
);
