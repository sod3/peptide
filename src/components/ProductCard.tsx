import { Link } from "react-router-dom";
import { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { ShieldCheck, Plus } from "lucide-react";
import defaultVial from "@/assets/peptide-vial.png";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export const ProductCard = ({ p }: { p: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(p);
    toast.success(`${p.name} added to cart`, {
      description: "Item is now ready in your research order.",
      icon: <Plus className="h-4 w-4" />,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group h-full"
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-card/60 border border-border shadow-sm transition-all duration-500 hover:shadow-elegant hover:bg-card"
      >
        <Link
          to={`/product/${p.slug}`}
          className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-surface to-background flex flex-col items-center justify-center p-6"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          {p.badge && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary font-medium">
              {p.badge}
            </span>
          )}
          {p.stock === 0 && (
            <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-rose-500 text-white px-4 py-1.5 rounded-full font-bold text-sm tracking-wider uppercase shadow-xl border border-white/20">
                Sold Out
              </span>
            </div>
          )}
          <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-white/50 px-2.5 py-1 font-mono text-[10px] text-foreground/70 backdrop-blur-md">
            <ShieldCheck className="h-3 w-3 text-primary" />
            {p.purity}% HPLC
          </span>
          <img
            src={p.thumbnail || defaultVial}
            alt={p.name}
            className="relative z-0 h-[90%] w-auto object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-md"
          />
        </Link>
        <div className="flex flex-1 flex-col p-6 pt-5">
          <Link to={`/product/${p.slug}`}>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.category} · {p.mg}mg</div>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">{p.name}</h3>
            <p className="mt-1 flex-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{p.tagline}</p>
          </Link>
          <div className="mt-5 flex items-end justify-between border-t border-border/50 pt-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">USD</div>
              <div className="font-display text-2xl font-semibold tracking-tight">${p.price}</div>
            </div>
            <Button 
              size="sm" 
              disabled={p.stock === 0}
              onClick={handleAddToCart}
              className={cn(
                "rounded-full transition-all duration-300 group-hover:shadow-glow group-hover:scale-105",
                p.stock === 0 ? "bg-zinc-200 text-zinc-500 cursor-not-allowed" : "bg-primary text-primary-foreground"
              )}
            >
              {p.stock === 0 ? 'Out of Stock' : <><Plus className="h-4 w-4 mr-1" /> Add</>}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
