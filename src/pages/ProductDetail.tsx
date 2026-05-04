import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";
import vial from "@/assets/peptide-vial.png";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileCheck2, Truck, Microscope, ArrowLeft, Plus, Minus } from "lucide-react";
import { useState } from "react";

const ProductDetail = () => {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  const [qty, setQty] = useState(1);
  if (!p) return <Navigate to="/shop" replace />;

  return (
    <Layout>
      <div className="container pt-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to catalog
        </Link>
      </div>

      <section className="container grid gap-12 py-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-2">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <img src={vial} alt={p.name} width={800} height={800} loading="eager" className="absolute inset-0 m-auto h-[80%] w-auto object-contain animate-float" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3 text-accent" /> {p.purity}% HPLC
          </div>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{p.category} · {p.mg}mg / vial</div>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight">{p.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{p.tagline}</p>

          <div className="mt-6 flex items-end gap-4">
            <div className="font-display text-5xl font-semibold tracking-tight">${p.price}</div>
            <div className="pb-2 font-mono text-xs text-muted-foreground">USD · Free US shipping over $200</div>
          </div>

          <p className="mt-6 leading-relaxed text-foreground/90">{p.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-11 w-11 place-items-center rounded-full hover:bg-muted"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-mono">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-muted"><Plus className="h-4 w-4" /></button>
            </div>
            <Button size="lg" className="rounded-full bg-gradient-primary text-primary-foreground shadow-glow">Add to Cart - ${p.price * qty}</Button>
            <Button size="lg" variant="outline" className="rounded-full">Buy Now</Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { i: ShieldCheck, t: "≥99% Purity" },
              { i: Truck, t: "Same-day ship" },
              { i: FileCheck2, t: "COA included" },
            ].map(({ i: Ic, t }) => (
              <div key={t} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <Ic className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-5 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Research disclaimer.</strong> {p.name} is sold for in-vitro laboratory research only. Not for human or veterinary use. Aevum Bio does not provide medical, dosage, or treatment guidance.
          </div>
        </div>
      </section>

      {/* Lab report */}
      <section className="container pb-20">
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-3 md:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              <Microscope className="h-3 w-3" /> Lab Report
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold">Certificate of Analysis</h2>
            <p className="mt-2 text-sm text-muted-foreground">Independent ISO 17025 verification - lot-traceable.</p>
            <Button className="mt-5 rounded-full"><FileCheck2 className="h-4 w-4" /> Download COA (PDF)</Button>
          </div>
          <dl className="md:col-span-2 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {[
              ["Lot Number", `A-${new Date().getFullYear()}-${(p.id.charCodeAt(1) * 37) % 9000 + 1000}`],
              ["Test Method", "RP-HPLC + ESI-MS"],
              ["HPLC Purity", `${p.purity}%`],
              ["Mass Confirmed", "Yes (within ±0.1 Da)"],
              ["Endotoxin", "< 0.05 EU / mg"],
              ["Appearance", "White lyophilized powder"],
              ["Storage", "≤ -20°C, desiccated"],
              ["Tested By", "Eurofins-Independent (US)"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border/60 pb-2">
                <dt className="text-muted-foreground">{k}</dt><dd className="font-mono text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
