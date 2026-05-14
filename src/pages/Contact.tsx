import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <Layout>
      <section className="bg-gradient-to-b from-surface to-background border-b border-border/40 pb-16 pt-32">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="container">
          <motion.div variants={fadeIn} className="font-mono text-[11px] uppercase tracking-widest text-primary/80 font-semibold">Get in touch</motion.div>
          <motion.h1 variants={fadeIn} className="mt-3 font-display text-5xl font-semibold tracking-tight md:text-6xl text-foreground">Talk to a researcher.</motion.h1>
          <motion.p variants={fadeIn} className="mt-4 max-w-xl text-lg text-muted-foreground font-light leading-relaxed">We reply within one business day from our Delaware research office.</motion.p>
        </motion.div>
      </section>

      <section className="container grid gap-12 py-20 lg:grid-cols-5 md:py-28">
        <motion.div
          className="space-y-6 lg:col-span-2"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          {[
            { i: ShieldCheck, t: "Security", v: "Encrypted Data" },
            { i: Phone, t: "Voice Enquiries", v: "+1 (302) 203-0104" },
            { i: Mail, t: "Official Liaison", v: "Use Form Below" },
          ].map(({ i: Ic, t, v }) => (
            <motion.div key={t} variants={fadeIn} className="flex items-start gap-5 rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm transition-all hover:shadow-elegant">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary border border-primary/10">
                <Ic className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{t}</div>
                <div className="text-[15px] font-medium text-foreground">{v}</div>
              </div>
            </motion.div>
          ))}

          <motion.div variants={fadeIn} className="aspect-[4/3] overflow-hidden rounded-[2rem] border border-border/60 bg-surface shadow-sm relative">
            <div className="grid-bg h-full w-full bg-gradient-to-br from-surface to-background/50 absolute inset-0 mix-blend-multiply opacity-50" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 text-center border border-white shadow-sm transition-transform hover:scale-105">
                <ShieldCheck className="mx-auto h-6 w-6 text-primary mb-2" />
                <div className="text-[15px] font-medium text-foreground">Secure Research Office</div>
                <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Wilmington, DE</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); toast({ title: "Message sent", description: "We'll respond within one business day." }); }}
          className="rounded-[2.5rem] border border-border/60 bg-white p-8 md:p-12 shadow-sm lg:col-span-3 transition-all hover:shadow-elegant"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Send an inquiry</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[11px] font-mono uppercase tracking-widest text-muted-foreground">First name</label>
              <Input required placeholder="Jane" className="h-12 rounded-xl bg-surface/50 border-border/60 focus-visible:ring-primary/20" />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Last name</label>
              <Input required placeholder="Doe, PhD" className="h-12 rounded-xl bg-surface/50 border-border/60 focus-visible:ring-primary/20" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Email</label>
              <Input required type="email" placeholder="jane@lab.edu" className="h-12 rounded-xl bg-surface/50 border-border/60 focus-visible:ring-primary/20" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Institution / Organization</label>
              <Input placeholder="University or Lab Name" className="h-12 rounded-xl bg-surface/50 border-border/60 focus-visible:ring-primary/20" />
            </div>
            <div className="sm:col-span-2 mt-2">
              <label className="mb-2 block text-[11px] font-mono uppercase tracking-widest text-muted-foreground">How can we assist?</label>
              <Textarea required rows={6} placeholder="Tell us about your research needs…" className="rounded-xl bg-surface/50 border-border/60 focus-visible:ring-primary/20 resize-none p-4" />
            </div>
          </div>
          <Button type="submit" size="lg" disabled={sent} className="mt-8 h-14 w-full sm:w-auto px-10 rounded-full bg-gradient-primary text-primary-foreground shadow-glow text-base transition-transform hover:scale-105">
            {sent ? "Message Sent ✓" : (<><Send className="h-4 w-4 mr-2" /> Send Inquiry</>)}
          </Button>
        </motion.form>
      </section>
    </Layout>
  );
};

export default Contact;
