import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";
import vial from "@/assets/peptide-vial.png";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileCheck2, Truck, Microscope, ArrowLeft, Plus, Minus, Info } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail = () => {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  const [qty, setQty] = useState(1);
  if (!p) return <Navigate to="/shop" replace />;

  return (
    <Layout>
      <div className="bg-background pt-32 pb-20">
        <div className="container max-w-7xl">
          <Link to="/shop" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
            Back to Library
          </Link>

          <div className="mt-12 grid gap-16 lg:grid-cols-12">
            {/* PRODUCT IMAGE SECTION */}
            <div className="lg:col-span-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="sticky top-32 aspect-square overflow-hidden rounded-[3rem] border border-border/40 bg-[#F3EFE9]/50 shadow-2xl"
              >
                <div className="absolute inset-x-6 top-6 z-10 flex justify-between items-start">
                   <div className="rounded-full bg-primary/10 px-4 py-2 border border-primary/5 backdrop-blur-md">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                        Verified 99%+
                      </span>
                   </div>
                </div>

                <motion.img 
                  src={vial} 
                  alt={p.name} 
                  className="absolute inset-0 m-auto h-[75%] w-auto object-contain drop-shadow-2xl" 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/40 to-transparent" />
              </motion.div>
            </div>

            {/* PRODUCT INFO SECTION */}
            <div className="lg:col-span-6 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary font-bold">
                  {p.category} · {p.mg}mg / Vial
                </div>
                <h1 className="mt-4 font-display text-5xl font-semibold tracking-tighter md:text-7xl">
                  {p.name}
                </h1>
                <p className="mt-6 text-xl leading-relaxed text-muted-foreground/80">
                  {p.tagline}
                </p>

                <div className="mt-10 flex items-center gap-6">
                  <div className="font-display text-5xl font-semibold tracking-tight text-foreground">
                    ${p.price}
                  </div>
                  <div className="h-10 w-px bg-border/40" />
                  <div className="text-[13px] leading-tight text-muted-foreground/60 uppercase tracking-widest font-mono">
                    USD · Free Cold-Chain <br/> Shipping
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <p className="text-lg leading-relaxed text-foreground/80">
                  {p.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 py-4">
                   <div className="inline-flex h-14 items-center rounded-2xl border border-border/40 bg-card p-1">
                      <button 
                        onClick={() => setQty(Math.max(1, qty - 1))} 
                        className="grid h-12 w-12 place-items-center rounded-xl transition-colors hover:bg-muted"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-mono text-sm font-bold">{qty}</span>
                      <button 
                        onClick={() => setQty(qty + 1)} 
                        className="grid h-12 w-12 place-items-center rounded-xl transition-colors hover:bg-muted"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                   </div>
                   
                   <Button size="lg" variant="premium" className="flex-1 h-14 text-base shadow-2xl">
                     Purchase for Research · ${(p.price * qty).toFixed(2)}
                   </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { i: ShieldCheck, t: "99.8% Lot Purity" },
                    { i: Truck, t: "Temperature Controlled" },
                    { i: FileCheck2, t: "Digital Lab COA" },
                    { i: Microscope, t: "Full MS & NMR Data" },
                  ].map(({ i: Ic, t }) => (
                    <div key={t} className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Ic className="h-5 w-5" />
                      </div>
                      <span className="text-[13px] font-bold uppercase tracking-widest text-foreground/80">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 flex gap-4">
                  <Info className="h-5 w-5 text-primary shrink-0" />
                  <p className="text-sm leading-relaxed text-primary/80">
                    <strong className="text-primary uppercase tracking-widest text-[11px] block mb-1">Strict Research Disclosure:</strong>
                    This compound is synthesized for in-vitro laboratory research and development use only. It is not intended for human consumption or veterinary administration.
                  </p>
                </div>
              </motion.div>

              {/* TECHNICAL SPECS (COA) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[3rem] border border-border/40 bg-surface p-8 md:p-12 text-white"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                       <Microscope className="h-3 w-3" /> Technical Analysis
                    </div>
                    <h2 className="mt-4 font-display text-3xl font-semibold">Certificate of Analysis</h2>
                    <p className="mt-2 text-muted-foreground/60 text-[15px]">Digital HPLC verification for Lot #A-2026-XQ41</p>
                  </div>
                  <Button variant="outline" className="h-12 border-white/20 bg-white/5 text-white hover:bg-primary hover:border-primary">
                    <FileCheck2 className="mr-2 h-4 w-4" /> Download Full COA
                  </Button>
                </div>

                <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
                   {[
                    ["Lot Number", `A-${new Date().getFullYear()}-41829`],
                    ["Analysis Method", "RP-HPLC + ESI-MS"],
                    ["Verified Purity", `${p.purity}%`],
                    ["Mass Trace", "Confirmed (±0.1 Da)"],
                    ["Endotoxin Level", "< 0.05 EU/mg"],
                    ["Structure Verification", "NMR Spectrometry"],
                    ["Appearance", "White Lyophilizate"],
                    ["Lab Accreditation", "ISO 17025 Certified"],
                   ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-white/10 pb-4">
                      <span className="text-[12px] uppercase tracking-widest text-muted-foreground/40 font-bold">{k}</span>
                      <span className="font-mono text-sm text-primary font-bold">{v}</span>
                    </div>
                   ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
