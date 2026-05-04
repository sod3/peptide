import { Layout } from "@/components/Layout";
import molecule from "@/assets/molecule.jpg";
import { Award, FlaskConical, ShieldCheck, Microscope } from "lucide-react";

const About = () => (
  <Layout>
    <section className="bg-hero border-b border-border/60">
      <div className="container grid gap-10 py-20 md:grid-cols-2 md:py-28">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">About Aevum Bio</div>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-6xl">
            Built by scientists, <span className="text-gradient">trusted by labs.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Aevum Bio was founded in 2021 by a team of biochemists frustrated by the inconsistency of the research-peptide market. Our mission is simple: ship pharmaceutical-grade material with documentation a regulator could read.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border shadow-elegant">
          <img src={molecule} alt="Molecular helix" width={1280} height={832} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { n: "10,400+", l: "Researchers served" },
          { n: "1,820", l: "Verified 5★ reviews" },
          { n: "99.3%", l: "Average HPLC purity" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-8">
            <div className="font-display text-5xl font-semibold tracking-tight text-gradient">{s.n}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-surface py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Our standards</div>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">Four pillars. Zero compromise.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { i: FlaskConical, t: "cGMP-Aligned Synthesis", d: "Manufactured in ISO 9001 facilities using current Good Manufacturing Practice protocols." },
            { i: Microscope, t: "Independent Verification", d: "Every batch is tested by an external ISO 17025 lab - never by us." },
            { i: ShieldCheck, t: "Lot-Traceable", d: "Each vial carries a unique lot number with a downloadable, lot-specific COA." },
            { i: Award, t: "Researcher-First Service", d: "Bulk pricing, institutional invoicing, and a 24-hour response guarantee." },
          ].map(({ i: Ic, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Ic className="h-5 w-5" /></div>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);
export default About;
