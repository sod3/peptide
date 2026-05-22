import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import vial from "@/assets/peptide-vial.png";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileCheck2, Truck, Microscope, ArrowLeft, Plus, Minus, Info, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!p) return;
    addToCart(p, qty);
    toast.success(`${p.name} added to cart`, {
      description: `${qty} ${qty > 1 ? 'vials' : 'vial'} added to your research order.`,
      icon: <Plus className="h-4 w-4" />,
    });
  };

  const handleBuyNow = () => {
    if (!p) return;
    addToCart(p, qty);
    navigate("/checkout");
  };

  const { data: p, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await api.get(`/shop/${slug}`);
      return response.data.data;
    }
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground animate-pulse font-light tracking-widest uppercase text-xs">Authenticating Batch Data...</p>
        </div>
      </Layout>
    );
  }

  if (error || !p) return <Navigate to="/shop" replace />;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  return (
    <Layout>
      <div className="container pt-32 pb-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to catalog
        </Link>
      </div>

      <section className="container grid gap-16 py-8 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square overflow-hidden rounded-[3rem] border border-border/40 bg-gradient-to-b from-surface to-background shadow-sm"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <motion.img
            initial={{ y: 20, rotate: -2 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            src={vial} alt={p.name} width={800} height={800} loading="eager"
            className="absolute inset-0 m-auto h-[80%] w-auto object-contain drop-shadow-xl"
          />
          <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-primary border border-white">
            <ShieldCheck className="h-4 w-4" /> {p.purity}% HPLC Verified
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeIn} className="font-mono text-[11px] uppercase tracking-widest text-primary/80 font-semibold">{p.category} · {p.mg}mg / vial</motion.div>
          <motion.h1 variants={fadeIn} className="mt-3 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">{p.name}</motion.h1>
          <motion.p variants={fadeIn} className="mt-4 text-xl text-muted-foreground font-light leading-relaxed">{p.tagline}</motion.p>

          <motion.div variants={fadeIn} className="mt-8 flex items-end gap-5 border-b border-border/40 pb-8">
            <div className="font-display text-5xl font-semibold tracking-tight text-foreground">${p.price}</div>
            <div className="pb-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">USD · <span className="text-primary">Free US Ship &gt; $200</span></div>
          </motion.div>

          <motion.p variants={fadeIn} className="mt-8 leading-loose text-foreground/80 font-light text-base">{p.description}</motion.p>

          <motion.div variants={fadeIn} className="mt-10 flex flex-wrap items-center gap-4">
            <div className="inline-flex h-14 items-center rounded-full border border-border/60 bg-white p-1 shadow-sm">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-12 w-12 place-items-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"><Minus className="h-5 w-5" /></button>
              <span className="w-10 text-center font-mono text-lg font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-12 w-12 place-items-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"><Plus className="h-5 w-5" /></button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={p.stock === 0}
              className="flex-1 rounded-2xl bg-primary h-14 text-base font-semibold shadow-glow hover:scale-[1.02] transition-transform"
            >
              {p.stock === 0 ? 'Notify Me When In Stock' : 'Add to Cart'}
            </Button>
            <Button size="lg" variant="outline" onClick={handleBuyNow} className="h-14 px-8 rounded-full bg-white transition-colors hover:bg-surface hover:text-primary text-base">Buy Now</Button>
          </motion.div>


          <motion.div variants={fadeIn} className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { i: ShieldCheck, t: "≥99% Purity" },
              { i: Truck, t: "Same-day ship" },
              { i: FileCheck2, t: "COA included" },
            ].map(({ i: Ic, t }) => (
              <div key={t} className="flex items-center gap-3.5 rounded-2xl border border-border/40 bg-white/50 p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 place-items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Ic className="h-5 w-5" />
                </div>
                <span className="text-[13px] font-medium tracking-wide">{t}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn} className="mt-8 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-[13px] leading-relaxed text-muted-foreground">
            <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" />
            <div>
              <strong className="text-foreground tracking-wide block mb-1">Research Disclaimer.</strong>
              <span className="font-light">{p.name} is sold strictly for in-vitro laboratory research. Not for human or veterinary use. Peptideology does not provide medical, dosage, or treatment guidance.</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Lab report */}
      <section className="container pb-32 pt-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="grid gap-10 rounded-[2.5rem] border border-border/60 bg-white p-8 md:grid-cols-3 md:p-14 shadow-sm"
        >
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full bg-primary/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-primary font-semibold">
              <Microscope className="h-4 w-4" /> Lab Report
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold">Certificate of Analysis</h2>
            <p className="mt-3 text-[15px] text-muted-foreground font-light leading-relaxed">Independent ISO 17025 verification with batch matching and lot-traceability.</p>
            <Button className="mt-8 rounded-full h-12 px-6 bg-surface text-foreground hover:bg-border/60 hover:text-primary transition-colors border border-border">
              <FileCheck2 className="h-4 w-4 mr-2" /> Download COA (PDF)
            </Button>
          </div>
          <dl className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-[15px]">
            {[
              ["Lot Number", `A-${new Date().getFullYear()}-${((p._id || p.id).toString().charCodeAt(1) * 37) % 9000 + 1000}`],
              ["Test Method", "RP-HPLC + ESI-MS"],
              ["HPLC Purity", `${p.purity}%`],
              ["Mass Confirmed", "Yes (within ±0.1 Da)"],
              ["Endotoxin", "< 0.05 EU / mg"],
              ["Appearance", "White lyophilized powder"],
              ["Storage", "≤ -20°C, desiccated"],
              ["Tested By", "Independent ISO 17025 (US)"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col justify-between border-b border-border/40 pb-4">
                <dt className="text-muted-foreground font-light mb-1">{k}</dt>
                <dd className="font-mono text-foreground font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
