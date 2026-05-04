import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories = ["All", "Healing", "Recovery", "Growth", "Longevity", "Performance"] as const;
const sorts = ["Featured", "Price: Low to High", "Price: High to Low", "Purity"] as const;

const Shop = () => {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);

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
      <section className="bg-hero border-b border-border/60">
        <div className="container py-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Catalog</div>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-6xl">Research peptides</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Every product is independently HPLC-verified and ships with a Certificate of Analysis.</p>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Filters */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28 space-y-8 rounded-2xl border border-border bg-card p-6">
              <div>
                <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">Search</label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="BPC-157…" className="pl-9" />
                </div>
              </div>
              <div>
                <div className="mb-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Category</div>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button key={c} onClick={() => setCat(c)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                      {c}
                      <span className="font-mono text-[10px] opacity-70">
                        {c === "All" ? products.length : products.filter((p) => p.category === c).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  <span>Max price</span><span>${maxPrice}</span>
                </div>
                <input type="range" min={40} max={200} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary" />
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-9">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">{list.length} products</div>
              <select value={sort} onChange={(e) => setSort(e.target.value as any)}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm outline-none">
                {sorts.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
