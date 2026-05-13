import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Button } from "./ui/button";
import { ShieldCheck, Plus } from "lucide-react";
import { motion } from "framer-motion";
import vial from "@/assets/peptide-vial.png";

export const ProductCard = ({ p }: { p: Product }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <Link
      to={`/product/${p.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-card p-3 transition-all duration-700 ease-premium hover:shadow-elegant"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#F3EFE9]/50 transition-colors duration-700 group-hover:bg-[#EBE5DE]">
        <div className="absolute inset-x-4 top-4 z-10 flex justify-between items-start">
          {p.badge ? (
            <span className="rounded-full bg-accent/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-accent-foreground backdrop-blur-md">
              {p.badge}
            </span>
          ) : <div />}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/20 bg-background/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground backdrop-blur-md">
            <ShieldCheck className="h-3 w-3 text-primary" />
            {p.purity}% Purity
          </span>
        </div>
        
        <motion.img
          src={vial}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 m-auto h-[75%] w-auto object-contain transition-transform duration-1000 ease-premium group-hover:scale-110 group-hover:-rotate-3"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
          <Button className="w-full h-12 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" /> Quick Add
          </Button>
        </div>
      </div>

      <div className="flex flex-col px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {p.category} · {p.mg}mg
          </div>
        </div>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
          {p.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-[13px] leading-relaxed text-muted-foreground/80">
          {p.tagline}
        </p>
        
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-xl font-semibold text-foreground">${p.price}</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">USD</span>
        </div>
      </div>
    </Link>
  </motion.div>
);
