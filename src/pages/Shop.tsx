import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const categories = ["All", "Tissue Repair", "Athletic Research", "Secretagogue Research", "Cellular Senescence", "Metabolic Research"] as const;
const sorts = ["Featured", "Price: Low to High", "Price: High to Low", "Purity"] as const;

const Shop = () => {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', cat, sort, q, maxPrice],
    queryFn: async () => {
      const response = await api.get('/shop', {
        params: { category: cat, sort, q, maxPrice }
      });
      return response.data.data;
    }
  });

  const list = productsData || [];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-surface to-background border-b border-border/40 pb-12 pt-32">
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Catalog</div>
            <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight md:text-6xl text-foreground">Research peptides</h1>
            <p className="mt-4 max-w-xl text-lg font-light text-muted-foreground leading-relaxed">Every compound is independently HPLC-verified and ships with a certificate of analysis.</p>
          </motion.div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Filters */}
          <aside className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="sticky top-28 space-y-10 rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm"
            >
              <div>
                <label className="mb-3 block text-[11px] font-mono uppercase tracking-widest text-primary/80 font-semibold">Search</label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="BPC-157…" className="pl-11 rounded-xl bg-surface/50 border-transparent focus-visible:ring-primary/20 h-11" />
                </div>
              </div>
              <div>
                <div className="mb-4 text-[11px] font-mono uppercase tracking-widest text-primary/80 font-semibold">Category</div>
                <div className="space-y-1.5">
                  {categories.map((c) => (
                    <button key={c} onClick={() => setCat(c)}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition-all ${cat === c ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:bg-primary/5 hover:text-primary"}`}>
                      {c}
                      <span className="font-mono text-[10px] opacity-70">
                        {c === "All" ? list.length : list.filter((p: any) => p.category === c).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-primary/80 font-semibold">
                  <span>Max price</span><span className="text-foreground">${maxPrice}</span>
                </div>
                <input type="range" min={40} max={200} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary cursor-pointer" />
              </div>
            </motion.div>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-9">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/40 pb-6"
            >
              <div className="text-[15px] text-muted-foreground font-light">{list.length} products found</div>
              <select value={sort} onChange={(e) => setSort(e.target.value as any)}
                className="rounded-full border border-border/60 bg-white px-5 py-2.5 text-sm outline-none text-foreground cursor-pointer shadow-sm focus:ring-2 focus:ring-primary/20 transition-shadow">
                {sorts.map((s) => <option key={s}>{s}</option>)}
              </select>
            </motion.div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground font-light">Loading premium peptides...</p>
              </div>
            ) : list.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <p className="text-lg">No products found matching your criteria.</p>
                <button onClick={() => { setQ(""); setCat("All"); setMaxPrice(200); }} className="mt-4 text-primary hover:underline">Clear filters</button>
              </div>
            ) : (
              <motion.div 
                className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
                initial="hidden" animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
              >
                {list.map((p: any) => (
                  <motion.div key={p._id || p.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <ProductCard p={p} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
