import { Layout } from "@/components/Layout";
import molecule from "@/assets/molecule.jpg";
import { Award, FlaskConical, ShieldCheck, Microscope } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <Layout>
      <section className="bg-gradient-to-b from-surface to-background border-b border-border/40 pb-16 pt-32">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="pr-8">
            <motion.div variants={fadeIn} className="font-mono text-[11px] uppercase tracking-widest text-primary/80 font-semibold">About Peptide Bio</motion.div>
            <motion.h1 variants={fadeIn} className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-6xl text-foreground">
              Built by scientists,<br />
              <span className="text-primary-glow font-light italic">trusted by labs.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="mt-8 text-xl text-muted-foreground font-light leading-relaxed">
              Peptide Bio was founded in 2021 by a team of biochemists frustrated by the inconsistency of the research-peptide market. Our mission is simple: supply high-purity laboratory reagents with documentation a regulator could read.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overflow-hidden rounded-[3rem] border border-border/40 shadow-sm"
          >
            <img src={molecule} alt="Molecular helix" width={1280} height={832} className="h-full w-full object-cover transition-transform duration-[10s] hover:scale-110" loading="lazy" />
          </motion.div>
        </div>
      </section>

      <section className="bg-surface/50 py-24 md:py-32">
        <div className="container">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-primary/80 font-semibold">Our Standards</div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl text-foreground">Four pillars. Zero compromise.</h2>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { i: FlaskConical, t: "cGMP-Aligned Synthesis", d: "Manufactured in ISO 9001 facilities using current Good Manufacturing Practice protocols." },
              { i: Microscope, t: "Independent Verification", d: "Every batch is tested by an external ISO 17025 lab - never by us." },
              { i: ShieldCheck, t: "Lot-Traceable", d: "Each vial carries a unique lot number with a downloadable, lot-specific COA." },
              { i: Award, t: "Researcher-First Support", d: "Bulk pricing, institutional invoicing, and a guaranteed 24-hour response time." },
            ].map(({ i: Ic, t, d }) => (
              <motion.div key={t} variants={fadeIn} className="rounded-[2rem] border border-border/60 bg-white p-8 transition-all hover:shadow-elegant">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary border border-primary/10">
                  <Ic className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-foreground tracking-tight">{t}</h3>
                <p className="mt-3 text-[15px] text-muted-foreground font-light leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
