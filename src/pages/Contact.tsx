import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="bg-hero border-b border-border/60">
        <div className="container py-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Get in touch</div>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-6xl">Talk to a researcher.</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Reply within one business day from our Delaware research office.</p>
        </div>
      </section>

      <section className="container grid gap-10 py-16 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {[
            { i: Mail,  t: "Email",   v: "research@aevum.bio" },
            { i: Phone, t: "Phone",   v: "+1 (302) 555-0188" },
            { i: MapPin,t: "Office",  v: "1209 Orange St, Wilmington, DE 19801" },
          ].map(({ i: Ic, t, v }) => (
            <div key={t} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent"><Ic className="h-5 w-5" /></div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{t}</div>
                <div className="text-base font-medium">{v}</div>
              </div>
            </div>
          ))}
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="grid-bg h-full w-full bg-gradient-to-br from-surface to-surface-2 relative">
              <div className="absolute inset-0 grid place-items-center">
                <div className="glass rounded-2xl px-5 py-3 text-center">
                  <MapPin className="mx-auto h-5 w-5 text-accent" />
                  <div className="mt-1 text-sm font-medium">Wilmington, DE</div>
                  <div className="font-mono text-[11px] text-muted-foreground">39.7459° N, 75.5466° W</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); toast({ title: "Message sent", description: "We'll respond within one business day." }); }}
          className="rounded-3xl border border-border bg-card p-8 shadow-card lg:col-span-3"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight">Send a message</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">First name</label>
              <Input required placeholder="Jane" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">Last name</label>
              <Input required placeholder="Doe, PhD" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</label>
              <Input required type="email" placeholder="jane@lab.edu" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">Institution</label>
              <Input placeholder="University / Lab name" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">How can we help?</label>
              <Textarea required rows={5} placeholder="Tell us about your research…" />
            </div>
          </div>
          <Button type="submit" size="lg" disabled={sent} className="mt-6 rounded-full bg-gradient-primary text-primary-foreground">
            {sent ? "Sent ✓" : (<><Send className="h-4 w-4" /> Send message</>)}
          </Button>
        </form>
      </section>
    </Layout>
  );
};
export default Contact;
