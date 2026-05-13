import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import heroImg from "@/assets/hero-vial.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck, Microscope, FlaskConical, Truck, Award, Star,
  ArrowRight, FileCheck2, Beaker, PackageCheck, Sparkles,
} from "lucide-react";

const trustLogos = ["ISO 17025 Verified", "cGMP Aligned", "USP <797> Compliance", "HPLC Verified", "Stripe Secure"];

const benefits = [
  { icon: Sparkles, title: "Tissue Repair Protocols", desc: "Foundational research into BPC-157 and TB-500 regenerative pathways." },
  { icon: FlaskConical, title: "Metabolic Research", desc: "Advanced GLP-1 and GIP receptor agonists for clinical modeling." },
  { icon: Beaker, title: "Longevity Science", desc: "Senolytic compounds and dermal repair research candidates." },
  { icon: Microscope, title: "Purity Guarantee", desc: "Every batch verified to ≥99% purity by independent US labs." },
];

const steps = [
  { n: "01", t: "Sourcing", d: "Raw API sourced from certified global partners with strict purity requirements." },
  { n: "02", t: "Verification", d: "Internal and third-party HPLC/MS analysis for every single production lot." },
  { n: "03", t: "Delivery", d: "Temperature-controlled dispatch from our Delaware facility within 24 hours." },
];

const Index = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-hero opacity-30" />

        <div className="container relative grid items-center gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-primary/5 px-4 py-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                ISO 17025 Third-Party Verified · Lot A-2026
              </span>
            </motion.div>

            <h1 className="mt-8 font-display text-6xl font-semibold leading-[0.95] tracking-tighter md:text-8xl lg:text-[100px]">
              Science without<br />
              <span className="text-primary italic">compromise.</span>
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground/80 md:text-xl">
              Aevum Bio supplies the scientific community with ultra-pure research peptides, backed by transparent, lot-traceable HPLC data from independent US laboratories.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" variant="premium">
                <Link to="/shop">Explore Catalog <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border/40 bg-white/50 backdrop-blur-sm">
                <a href="#trust">View Standards</a>
              </Button>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4rem] border border-border/40 shadow-2xl">
              <motion.img
                style={{ y: y1 }}
                src={heroImg}
                alt="Research vial"
                className="h-[120%] w-full scale-110 object-cover grayscale-[0.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

              <div className="absolute inset-x-6 bottom-6 flex flex-col gap-3 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-semibold text-white">Batch #A-2026-0421</div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-white/60">HPLC: 99.82% · MS: Confirmed</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-20 hidden h-24 w-24 rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-md lg:flex items-center justify-center"
            >
              <FlaskConical className="h-8 w-8 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section id="trust" className="border-y border-border/20 bg-white py-8">
        <div className="container flex flex-wrap justify-center gap-x-16 gap-y-6 opacity-30 grayscale transition-opacity hover:opacity-100">
          {trustLogos.map((l) => (
            <span key={l} className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">{l}</span>
          ))}
        </div>
      </section>

      {/* CATEGORIES / PRODUCTS */}
      <section className="container py-32">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold"
            >
              Scientific Catalog
            </motion.div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tighter md:text-6xl text-foreground">
              Elite compounds for<br />dedicated researchers.
            </h2>
          </div>
          <Button asChild variant="outline" className="h-14 px-8 rounded-full border-border/60">
            <Link to="/shop">View Full Catalog <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* FEATURES / BENEFITS */}
      <section className="bg-surface py-32">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl font-semibold tracking-tighter md:text-6xl text-background">
                Engineered for<br />precision.
              </h2>
              <p className="mt-8 text-lg text-muted-foreground/60 leading-relaxed">
                Our facilities comply with strict cGMP alignment and ISO 9001 standards to ensure that every molecule meets your research requirements.
              </p>
              <div className="mt-12 grid gap-6">
                {benefits.map((b, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={b.title}
                    className="flex gap-6 group"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">{b.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground/60">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6 pt-12">
                  <div className="aspect-[4/5] rounded-[3rem] border border-white/10 bg-white/5 p-8 flex flex-col justify-end">
                    <Award className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-display text-2xl font-semibold text-white">Certified Quality</h3>
                    <p className="text-sm text-muted-foreground mt-2">ISO 9001:2015 synthesis facilities.</p>
                  </div>
                  <div className="aspect-square rounded-[3rem] border border-white/10 bg-white/5 p-8 flex flex-col justify-end">
                    <Truck className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-display text-2xl font-semibold text-white">Cold-Chain</h3>
                    <p className="text-sm text-muted-foreground mt-2">Wilmington, DE logistics hub.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="aspect-square rounded-[3rem] border border-white/10 bg-white/5 p-8 flex flex-col justify-end">
                    <Microscope className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-display text-2xl font-semibold text-white">Full MS/NMR</h3>
                    <p className="text-sm text-muted-foreground mt-2">Beyond just simple HPLC verification.</p>
                  </div>
                  <div className="aspect-[4/5] rounded-[3rem] border border-white/10 bg-white/5 p-8 flex flex-col justify-end">
                    <Star className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-display text-2xl font-semibold text-white">Trusted Source</h3>
                    <p className="text-sm text-muted-foreground mt-2">Over 1,800 validated lab reviews.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">The Standard</div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tighter md:text-6xl">Consistency at every step.</h2>
        </div>
        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              key={s.n}
              className="relative p-8 rounded-[2.5rem] border border-border/40 bg-background/50 hover:bg-card transition-all duration-500"
            >
              <div className="font-mono text-xs text-primary font-bold mb-8">PHASE {s.n}</div>
              <h3 className="font-display text-3xl font-semibold mb-4">{s.t}</h3>
              <p className="text-muted-foreground/80 leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[4rem] bg-surface-2 p-12 text-center md:p-24"
        >
          <div className="absolute inset-0 bg-hero opacity-10" />
          <h2 className="relative font-display text-4xl font-semibold tracking-tighter md:text-7xl text-white">
            Ready to advance<br />your research?
          </h2>
          <p className="relative mt-8 mx-auto max-w-lg text-lg text-white/60">
            Join thousands of qualified researchers who trust Aevum Bio for consistent, high-purity peptides.
          </p>
          <div className="relative mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="premium">
              <Link to="/shop">Shop the Catalog</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30">
              <Link to="/contact">Contact Technical Support</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Index;
