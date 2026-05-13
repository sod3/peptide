import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="relative overflow-hidden bg-hero pt-32 pb-24 border-b border-border/20">
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Inquiries & Support</div>
            <h1 className="mt-8 font-display text-6xl font-semibold leading-[0.95] tracking-tighter md:text-8xl">
              Talk to a <span className="text-primary italic">Researcher.</span>
            </h1>
            <p className="mt-10 mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground/80 md:text-2xl">
              From institutional ordering to technical COA questions, our Delaware-based team is ready to support your laboratory's needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container py-24">
        <div className="grid gap-16 lg:grid-cols-12 divide-x divide-border/20">
          {/* CONTACT INFO */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight mb-8">Technical Desk</h3>
              <div className="space-y-4">
                {[
                  { i: Mail,  t: "Direct Email",   v: "research@aevum.bio", c: "Reply within 2 hours" },
                  { i: Phone, t: "Official Line",   v: "+1 (302) 555-0188", c: "Mon-Fri, 9am - 5pm ET" },
                  { i: MapPin,t: "Wilmington HQ",  v: "1209 Orange St, DE 19801", c: "Distribution Center" },
                ].map(({ i: Ic, t, v, c }) => (
                  <div key={t} className="group rounded-[2rem] border border-border/40 bg-card p-6 hover:bg-muted transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <Ic className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{t}</div>
                        <div className="text-base font-bold text-foreground">{v}</div>
                        <div className="text-[11px] text-primary/60 font-medium">{c}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-square overflow-hidden rounded-[3rem] border border-border bg-surface relative group">
              <div className="absolute inset-0 bg-[#1A1A1A] transition-colors group-hover:bg-[#111]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/5 border border-white/10 mb-6">
                       <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-white font-display text-2xl font-semibold">Silicon Coast</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Delaware, United States</div>
                 </div>
              </div>
            </div>
          </div>

          {/* MESSAGE FORM */}
          <div className="lg:col-span-8 lg:pl-16">
            <h3 className="font-display text-3xl font-semibold tracking-tight mb-10 flex items-center gap-4">
              <MessageSquare className="h-8 w-8 text-primary" />
              Secure Message Gateway
            </h3>
            
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); toast({ title: "Signal Received", description: "A researcher will respond to your inquiry shortly." }); }}
              className="grid gap-8"
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Investigator First Name</label>
                  <Input required placeholder="Jane" className="h-14 rounded-2xl border-border/40 bg-background/50 focus:bg-white transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Investigator Last Name</label>
                  <Input required placeholder="Doe, PhD" className="h-14 rounded-2xl border-border/40 bg-background/50 focus:bg-white transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5" />
                </div>
                <div className="sm:col-span-2 space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Institutional Email</label>
                  <Input required type="email" placeholder="j.doe@mit.edu" className="h-14 rounded-2xl border-border/40 bg-background/50 focus:bg-white transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5" />
                </div>
                <div className="sm:col-span-2 space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Lab / Institution Name</label>
                  <Input placeholder="Center for Biological Excellence" className="h-14 rounded-2xl border-border/40 bg-background/50 focus:bg-white transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5" />
                </div>
                <div className="sm:col-span-2 space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Research Inquiry Details</label>
                  <Textarea required className="rounded-[2rem] border-border/40 bg-background/50 focus:bg-white transition-all p-6 shadow-sm focus:shadow-xl focus:shadow-primary/5" rows={6} placeholder="Please detail your request or technical question regarding our synthesis protocols..." />
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" size="lg" disabled={sent} variant="premium" className="w-full sm:w-auto px-12 h-16 text-base">
                  {sent ? "Message Transmitted ✓" : (<><Send className="mr-2 h-5 w-5" /> Dispatch Inquiry</>)}
                </Button>
                <p className="mt-4 text-[11px] text-muted-foreground/60 font-medium">
                  By submitting this form, you acknowledge that all communications are handled with strict privacy protocols.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
