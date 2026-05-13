import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Healing", "Recovery", "Growth", "Longevity", "Performance"] as const;
const sorts = ["Featured", "Price: Low to High", "Price: High to Low", "Purity"] as const;

const Shop = () => {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState(250);

  const list = useMemo(() => {
    let l = products.filter((p) =>
      (cat === "All" || p.category === cat) &&
      p.price <= maxPrice &&
      (q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.tagline.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "Price: Low to High") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "Purity") l = [...l].sort((a, b) => b.purity - a.purity);
    return l;
  }, [cat, sort, q, maxPrice]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-hero pt-32 pb-20 border-b border-border/20">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Scientific Repository</div>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tighter md:text-7xl lg:text-8xl">
              Research <span className="italic text-primary">Catalog.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/80 leading-relaxed">
              Browse our selection of clinical-grade peptides, each synthesized in cGMP laboratories and verified via HPLC/MS for absolute research integrity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* SIDEBAR FILTERS */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-12">
              <div>
                <h3 className="mb-6 font-display text-xl font-semibold tracking-tight">Search</h3>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input 
                    value={q} 
                    onChange={(e) => setQ(e.target.value)} 
                    placeholder="Search compounds..." 
                    className="h-14 rounded-2xl border-border/40 bg-background/50 pl-11 focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-6 font-display text-xl font-semibold tracking-tight">Classification</h3>
                <div className="flex flex-col gap-1">
                  {categories.map((c) => (
                    <button 
                      key={c} 
                      onClick={() => setCat(c)}
                      className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                        cat === c 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span className="font-medium">{c}</span>
                      <span className={`font-mono text-[10px] transition-opacity ${cat === c ? "opacity-100" : "opacity-40"}`}>
                        {c === "All" ? products.length : products.filter((p) => p.category === c).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold tracking-tight">Threshold</h3>
                  <span className="font-mono text-xs font-bold text-primary">${maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min={40} 
                  max={250} 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(+e.target.value)} 
                  className="w-full appearance-none bg-border/40 h-1.5 rounded-full accent-primary cursor-pointer"
                />
                <div className="mt-4 flex justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  <span>$40</span>
                  <span>$250</span>
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <main className="lg:col-span-9">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[13px] font-medium text-muted-foreground/60">
                Displaying <span className="text-foreground font-bold">{list.length}</span> validated research compounds
              </div>
              
              <div className="relative inline-block w-full sm:w-64">
                <select 
                  value={sort} 
                  onChange={(e) => setSort(e.target.value as any)}
                  className="w-full appearance-none h-12 rounded-xl border border-border/40 bg-background/50 px-6 pr-10 text-[13px] font-medium outline-none focus:bg-white transition-all cursor-pointer"
                >
                  {sorts.map((s) => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <motion.div 
              layout
              className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {list.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </AnimatePresence>
            </motion.div>

            {list.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <Search className="mb-6 h-12 w-12 text-muted-foreground/20" />
                <h3 className="font-display text-2xl font-semibold">No results found</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => { setQ(""); setCat("All"); setMaxPrice(250); }}
                  className="mt-8 font-mono text-xs uppercase tracking-widest text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
