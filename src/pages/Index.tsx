import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import heroImg from "@/assets/hero-vial.jpg";
import {
  ShieldCheck, Microscope, FlaskConical, Truck, Award, Star,
  ArrowRight, FileCheck2, Beaker, PackageCheck, Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const trustLogos = ["ISO 9001", "cGMP", "USP <797>", "HPLC ≥99%", "ISO 17025 Lab", "Stripe Secure"];

const benefits = [
  { icon: Sparkles, title: "Tissue signaling", desc: "BPC-157, TB-500 - extensively researched pathways for angiogenesis." },
  { icon: FlaskConical, title: "Secretagogue Models", desc: "CJC-1295, Ipamorelin, Tesamorelin - GH axis research standards." },
  { icon: Beaker, title: "Cellular Senescence", desc: "GHK-Cu, Epitalon - dermal and genomic stability models." },
  { icon: Microscope, title: "Metabolic Pathways", desc: "Semaglutide, Tirzepatide - GLP-1 / GIP receptor study compounds." },
];

const steps = [
  { n: "01", t: "Synthesize", d: "Manufactured in an ISO 9001, cGMP-aligned US partner facility." },
  { n: "02", t: "Verify", d: "Every batch independently tested by an ISO 17025 lab - HPLC + MS." },
  { n: "03", t: "Ship", d: "Cold-chain dispatch from Delaware. Same-day cutoff at 3pm ET." },
];

const reviews = [
  { name: "Dr. H. Steinberg", role: "Metabolic Research Institute", text: "Consistency is paramount for our longitudinal studies. Peptide's HPLC data is verified by our internal MS-retests every time.", stars: 5 },
  { name: "S. K. Ramesh", role: "Biotech Logistics Director", text: "Truly cold-chain logistics. The lyophilized integrity was maintained in transit, which is rare in this space.", stars: 5 },
  { name: "Analytical Team", role: "Contract Research Org.", text: "Batch-to-batch coefficient of variation is extremely low. This is the quality standard we require for GLP-compliant pilot work.", stars: 5 },
];

const faqs = [
  { q: "Are Peptide Bio peptides third-party lab tested?", a: "Yes. Every batch is tested by an independent ISO 17025-accredited laboratory using HPLC and mass spectrometry. The Certificate of Analysis is downloadable on each product page and lot-traceable." },
  { q: "Where do you ship from and how fast?", a: "All orders ship from our climate-controlled US repository via express carriers. Orders before 3pm ET ship the same business day. Free shipping on US orders over $200." },
  { q: "What purity standard do you guarantee?", a: "We guarantee a minimum of 99.0% HPLC purity on every research peptide we ship. Most batches measure between 99.2% and 99.6%." },
  { q: "Are these products legal?", a: "Our peptides are sold strictly for in-vitro laboratory research. They are not for human or animal consumption. Customers are responsible for compliance with all federal, state, and local laws." },
  { q: "Do you offer bulk pricing?", a: "Yes - institutional and bulk pricing is available for verified labs. Contact our research team via the Contact page." },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Index = () => (
  <Layout>
    {/* HERO */}
    <section className="relative overflow-hidden bg-hero pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 grid-bg opacity-[0.3] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-6"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/40 px-3 py-1.5 backdrop-blur-md shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#9E5421]">
              Verification Complete
            </span>
          </motion.div>
          <motion.h1 variants={fadeIn} className="mt-8 font-display text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Precision synthesis,<br />
            <span className="text-gradient">verified for research.</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground font-light">
            Peptide Bio supplies strictly curated, ≥99% pure peptides to qualified researchers-backed by independent certificates of analysis with every vial.
          </motion.p>
          <motion.div variants={fadeIn} className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="group rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95 px-8 h-14 text-base transition-transform hover:scale-105">
              <Link to="/shop">Explore Catalog <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-white/50 backdrop-blur-sm h-14 px-8 text-base transition-transform hover:scale-105 hover:bg-white/80">
              <a href="#about"><FileCheck2 className="h-5 w-5 mr-2" /> View Validation</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative lg:col-span-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-[2.5rem] border-[8px] border-white/50 bg-white shadow-elegant">
            <img src={heroImg} alt="Research peptide vial" className="h-full w-full object-cover transition-transform duration-[10s] hover:scale-110" />
            <div className="absolute inset-x-4 bottom-4 glass rounded-2xl p-4 transition-all hover:bg-white/90">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-[15px] font-semibold text-foreground">Batch A-2026-0421 · BPC-157</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-0.5 tracking-wider">HPLC: 99.42% · MS CONFIRMED</div>
                </div>
                <Button size="sm" variant="outline" className="rounded-full shrink-0 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10">COA</Button>
              </div>
            </div>
          </div>
          <div className="absolute -left-8 top-20 hidden glass animate-float rounded-2xl p-3.5 lg:block shadow-sm">
            <div className="flex items-center gap-2.5"><Award className="h-4 w-4 text-primary" /><span className="text-xs font-medium tracking-wide">ISO 17025 Verified</span></div>
          </div>
          <div className="absolute -right-8 bottom-40 hidden glass animate-float rounded-2xl p-3.5 lg:block shadow-sm" style={{ animationDelay: "1.2s" }}>
            <div className="flex items-center gap-2.5"><Truck className="h-4 w-4 text-primary" /><span className="text-xs font-medium tracking-wide">Express US Distribution</span></div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* TRUST BAR */}
    <section className="border-y border-border/40 bg-surface/50 py-8">
      <div className="container flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-muted-foreground">
        {trustLogos.map((l) => (
          <span key={l} className="font-display text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-primary">{l}</span>
        ))}
      </div>
    </section>

    {/* PRODUCT HIGHLIGHTS */}
    <section className="container py-24 md:py-32">
      <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Curated Selection</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">Bestselling research peptides</h2>
          <p className="mt-4 max-w-xl text-muted-foreground text-lg font-light">Hand-picked compounds that ship same-day with complete chain-of-custody documentation.</p>
        </motion.div>
        <Button asChild variant="outline" className="rounded-full h-12 px-6 group transition-all hover:border-primary hover:text-primary">
          <Link to="/shop">View Complete Catalog <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" /></Link>
        </Button>
      </div>
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
      >
        {products.slice(0, 4).map((p) => (
          <motion.div key={p.id} variants={fadeIn} className="h-full">
            <ProductCard p={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>

    {/* HOW IT WORKS */}
    <section className="bg-surface py-24 md:py-32" id="about">
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Process</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">From synthesis to your bench in 3 steps.</h2>
        </motion.div>
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {steps.map((s, i) => (
            <motion.div key={s.n} variants={fadeIn} className="relative rounded-[2rem] border border-border/60 bg-white p-10 shadow-sm transition-all hover:shadow-elegant">
              <div className="font-mono text-[11px] uppercase tracking-widest text-primary/70">STEP {s.n}</div>
              <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/20">
                {(() => {
                  const Icon = [FlaskConical, Microscope, PackageCheck][i];
                  return <Icon className="h-6 w-6 stroke-[1.5]" />;
                })()}
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">{s.t}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground font-light">{s.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* BENEFITS */}
    <section className="container py-24 md:py-32">
      <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
        <motion.div
          className="lg:col-span-5"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Research Categories</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl leading-tight">Categories trusted by labs nationwide.</h2>
          <p className="mt-5 text-lg text-muted-foreground font-light leading-relaxed">Each Peptide Bio peptide is selected for its scientific relevance and shipped with full chain-of-custody documentation.</p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-primary text-primary-foreground h-14 px-8 text-base shadow-glow transition-transform hover:scale-105">
            <Link to="/shop">Browse Catalog <ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
        </motion.div>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:col-span-7"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {benefits.map((b) => (
            <motion.div key={b.title} variants={fadeIn} className="group rounded-[2rem] border border-border/60 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <b.icon className="h-6 w-6 stroke-[1.5]" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground font-light leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    {/* <section className="bg-surface py-24 md:py-32">
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Researchers Say</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">Rated 4.9 by 1,820 verified labs.</h2>
        </motion.div>
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {reviews.map((r) => (
            <motion.figure key={r.name} variants={fadeIn} className="flex flex-col rounded-[2rem] border border-border/60 bg-white p-10 shadow-sm transition-all hover:shadow-elegant">
              <div className="mb-6 flex gap-1 text-primary">
                {Array.from({ length: r.stars }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/80 italic">"{r.text}"</blockquote>
              <figcaption className="mt-8 border-t border-border/40 pt-6">
                <div className="font-display text-lg font-semibold">{r.name}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{r.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section> */}

    {/* FAQ */}
    <section className="container py-24 md:py-32">
      <div className="grid gap-16 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-4"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">FAQ</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">Questions, answered with science.</h2>
          <p className="mt-5 text-lg text-muted-foreground font-light">Don't see what you need? Our research team replies within one business day.</p>
        </motion.div>
        <motion.div
          className="lg:col-span-8"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-border/60 mb-2 bg-white rounded-2xl px-6 data-[state=open]:shadow-sm">
                <AccordionTrigger className="text-left font-display text-xl hover:no-underline py-6 data-[state=open]:text-primary">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 font-light">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="container pb-32">
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-primary p-12 text-primary-foreground shadow-glow md:p-20 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative flex-1">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">The standard your research deserves.</h2>
          <p className="mt-5 max-w-lg text-lg opacity-90 font-light leading-relaxed">Verified purity, transparent documentation, and same-day US shipping. Elevate your lab protocols today.</p>
        </div>
        <div className="relative flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 h-14 px-8 text-base shadow-sm hover:scale-105 transition-transform w-full sm:w-auto">
            <Link to="/shop">Shop Catalog</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 h-14 px-8 text-base w-full sm:w-auto transition-colors">
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  </Layout>
);

export default Index;
