import { Layout } from "@/components/Layout";
import molecule from "@/assets/molecule.jpg";
import { Award, FlaskConical, ShieldCheck, Microscope, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const About = () => (
  <Layout>
    <section className="relative overflow-hidden bg-hero pt-32 pb-24">
      <div className="container relative z-10 grid gap-16 lg:grid-cols-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-12 text-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Foundation & Purpose</div>
          <h1 className="mt-8 font-display text-6xl font-semibold leading-[0.95] tracking-tighter md:text-8xl lg:text-[100px]">
            Synthesized for <br/><span className="text-primary italic">Absolute Truth.</span>
          </h1>
          <p className="mt-10 mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground/80 md:text-2xl">
            Aevum Bio was founded by biochemists frustrated by the lack of transparency in research supply chains. We don't just sell compounds; we deliver verified scientific data.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="lg:col-span-12 relative aspect-[21/9] overflow-hidden rounded-[4rem] border border-border/40 shadow-2xl"
        >
          <img src={molecule} alt="Molecular helix" className="h-full w-full object-cover grayscale-[0.2] transition-transform hover:scale-105 duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>
      </div>
    </section>

    <section className="container py-32">
      <div className="grid gap-8 md:grid-cols-3">
        {[
          { n: "15,200+", l: "Institutions & Researchers" },
          { n: "1,800+", l: "Validated Lab Protocols" },
          { n: "99.8%", l: "Average Lot Conformity" },
        ].map((s, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={s.l} 
            className="rounded-[2.5rem] border border-border/40 bg-card p-12 text-center hover:bg-muted transition-colors"
          >
            <div className="font-display text-6xl font-semibold tracking-tighter text-foreground mb-4">{s.n}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="bg-surface py-32">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
             <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">The Standard</div>
             <h2 className="mt-6 font-display text-4xl font-semibold tracking-tighter md:text-6xl text-background">
                Four Pillars of <br/>Scientific Integrity.
             </h2>
             <p className="mt-8 text-lg text-muted-foreground/60 leading-relaxed">
                Our operations bridge the gap between pharmaceutical manufacturing standards and the needs of private research laboratories.
             </p>
          </div>
          <div className="lg:col-span-7 grid gap-6 md:grid-cols-2">
            {[
              { i: FlaskConical, t: "cGMP-Aligned", d: "Synthesized in high-containment ISO 9001 labs following rigorous manufacturing protocols." },
              { i: Microscope, t: "Lot-Traceable", d: "Every single vial corresponds to a specific HPLC/MS report, never 'sample' batches." },
              { i: ShieldCheck, t: "External HPLC", d: "Third-party testing performed by accredited US-based laboratories for objective purity." },
              { i: Award, t: "Bulk Invoicing", d: "Customized institutional accounts for universities and large-scale research projects." },
            ].map(({ i: Ic, t, d }, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={t} 
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 group hover:bg-white/10 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-6">
                   <Ic className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-3">{t}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground/60">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
