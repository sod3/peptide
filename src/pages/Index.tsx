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

const trustLogos = ["ISO 9001", "cGMP", "USP <797>", "HPLC ≥99%", "ISO 17025 Lab", "Stripe Secure"];

const benefits = [
  { icon: Sparkles,    title: "Recovery & Repair",  desc: "BPC-157, TB-500 — researched for tissue and joint repair pathways." },
  { icon: FlaskConical,title: "Growth & Performance", desc: "CJC-1295, Ipamorelin, Tesamorelin — pulsatile GH research." },
  { icon: Beaker,      title: "Longevity & Skin",   desc: "GHK-Cu, Epitalon — dermal and senescence research models." },
  { icon: Microscope,  title: "Metabolic Research", desc: "Semaglutide, Tirzepatide — GLP-1 / GIP receptor pathways." },
];

const steps = [
  { n: "01", t: "Synthesize", d: "Manufactured in an ISO 9001, cGMP-aligned US partner facility." },
  { n: "02", t: "Verify",     d: "Every batch independently tested by an ISO 17025 lab — HPLC + MS." },
  { n: "03", t: "Ship",       d: "Cold-chain dispatch from Delaware. Same-day cutoff at 3pm ET." },
];

const reviews = [
  { name: "Dr. M. Hollings",   role: "Independent Research Lab, MA", text: "COA matched our internal HPLC re-test within 0.3%. The most consistent supplier we've used in three years.", stars: 5 },
  { name: "L. Chen, PharmD",   role: "Compounding Consultant, CA",   text: "Packaging is genuinely cold-chain — not theatre. Documentation is the cleanest in the space.", stars: 5 },
  { name: "R. Alvarez",        role: "Sports Science Researcher, FL",text: "Reordered four times. Purity, labeling, and lot traceability are all on point.", stars: 5 },
];

const faqs = [
  { q: "Are Aevum Bio peptides third-party lab tested?", a: "Yes. Every batch is tested by an independent ISO 17025-accredited laboratory using HPLC and mass spectrometry. The Certificate of Analysis is downloadable on each product page and lot-traceable." },
  { q: "Where do you ship from and how fast?",            a: "All orders ship from our Wilmington, Delaware facility via USPS Priority. Orders before 3pm ET ship the same business day. Free shipping on US orders over $200." },
  { q: "What purity standard do you guarantee?",          a: "We guarantee a minimum of 99.0% HPLC purity on every research peptide we ship. Most batches measure between 99.2% and 99.6%." },
  { q: "Are these products legal?",                       a: "Our peptides are sold strictly for in-vitro laboratory research. They are not for human or animal consumption. Customers are responsible for compliance with all federal, state, and local laws." },
  { q: "Do you offer bulk pricing?",                      a: "Yes — institutional and bulk pricing is available for verified labs. Contact our research team via the Contact page." },
];

const Index = () => (
  <Layout>
    {/* HERO */}
    <section className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-bg opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Third-Party HPLC Verified · Lot #A-{new Date().getFullYear()}-0421
            </span>
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Research-grade peptides,<br />
            <span className="text-gradient">verified to the molecule.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Aevum Bio supplies US-shipped, ≥99% pure peptides to qualified researchers — backed by an independent Certificate of Analysis on every single batch.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
              <Link to="/shop">Explore Catalog <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="#trust"><FileCheck2 className="h-4 w-4" /> View Sample COA</a>
            </Button>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { k: "10,400+", v: "Researchers" },
              { k: "99.3%",   v: "Avg purity" },
              { k: "4.9 / 5", v: "1,820 reviews" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl font-semibold tracking-tight">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-[2rem] border border-border shadow-elegant">
            <img src={heroImg} alt="Research peptide vial with molecular helix" width={1536} height={1280} className="h-full w-full object-cover" />
            <div className="absolute inset-x-4 bottom-4 glass rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground"><ShieldCheck className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm font-semibold">Batch A-2026-0421 · BPC-157</div>
                  <div className="font-mono text-[11px] text-muted-foreground">HPLC: 99.42% · MS confirmed · Endotoxin &lt;0.05 EU/mg</div>
                </div>
                <Button size="sm" variant="outline" className="rounded-full">COA</Button>
              </div>
            </div>
          </div>
          <div className="absolute -left-6 top-10 hidden glass animate-float rounded-2xl p-3 lg:block">
            <div className="flex items-center gap-2"><Award className="h-4 w-4 text-accent" /><span className="text-xs font-medium">ISO 17025 Verified</span></div>
          </div>
          <div className="absolute -right-6 bottom-32 hidden glass animate-float rounded-2xl p-3 lg:block" style={{ animationDelay: ".8s" }}>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /><span className="text-xs font-medium">Ships from Delaware</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* TRUST BAR */}
    <section id="trust" className="border-y border-border/60 bg-card/40">
      <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-muted-foreground">
        {trustLogos.map((l) => (
          <span key={l} className="font-mono text-[11px] uppercase tracking-[0.2em]">{l}</span>
        ))}
      </div>
    </section>

    {/* PRODUCT HIGHLIGHTS */}
    <section className="container py-20 md:py-28">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Featured Catalog</div>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">Bestselling research peptides</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Hand-picked compounds that ship same-day with full documentation.</p>
        </div>
        <Button asChild variant="outline" className="rounded-full"><Link to="/shop">View All <ArrowRight className="h-4 w-4" /></Link></Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="bg-surface py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">How it works</div>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">From synthesis to your bench in 3 steps.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="font-mono text-xs text-muted-foreground">STEP {s.n}</div>
              <div className="mt-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                {[FlaskConical, Microscope, PackageCheck][i]({ className: "h-5 w-5" } as any)}
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* BENEFITS */}
    <section className="container py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Research Categories</div>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">Categories trusted by labs across the United States.</h2>
          <p className="mt-4 text-muted-foreground">Each Aevum Bio peptide is selected for its scientific relevance and shipped with full chain-of-custody documentation.</p>
          <Button asChild size="lg" className="mt-6 rounded-full bg-gradient-primary text-primary-foreground"><Link to="/shop">Browse Catalog <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {benefits.map((b) => (
            <div key={b.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="bg-surface py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Researchers say</div>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">Rated 4.9 / 5 by 1,820 verified labs.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card">
              <div className="mb-3 flex gap-0.5 text-accent">
                {Array.from({ length: r.stars }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground">"{r.text}"</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="container py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">FAQ</div>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">Questions, answered with science.</h2>
          <p className="mt-4 text-muted-foreground">Don't see what you need? Our research team replies within one business day.</p>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="container pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-primary-foreground shadow-elegant md:p-16">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">The standard your research deserves.</h2>
            <p className="mt-4 max-w-md opacity-85">Verified purity, transparent documentation, and same-day US shipping. Place your first order today.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/shop">Shop Catalog <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">Talk to a Researcher</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
