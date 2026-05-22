import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

const Legal = () => {
  return (
    <Layout>
      <section className="container pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl font-semibold tracking-tight">Legal & Compliance</h1>

          <div className="mt-12 prose prose-stone max-w-4xl font-light leading-relaxed text-muted-foreground bg-white/50 p-8 md:p-12 rounded-[2.5rem] border border-border/40 shadow-sm">

            <p className="mb-8 text-sm text-zinc-500">Last Updated: May 22, 2026</p>

            <div className="space-y-10">
              <section>
                <h2 className="text-foreground font-semibold text-2xl mb-4 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-mono">01</span>
                  Research Use Only (RUO)
                </h2>
                <div className="pl-11 border-l-2 border-primary/10 ml-4">
                  <p className="text-[17px] leading-relaxed">
                    All products sold by <span className="font-medium text-foreground">Peptideology</span> are intended <strong>strictly and solely for in-vitro laboratory research, scientific experimentation, and analytical purposes</strong>.
                  </p>
                  <p className="text-[17px] leading-relaxed mt-4">
                    They are <span className="text-destructive font-semibold underline underline-offset-4 decoration-current">NOT</span> for human consumption, animal use, veterinary applications, food, dietary supplements, cosmetics, or any therapeutic purpose.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-2xl mb-4 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-mono">02</span>
                  Health Canada Regulatory Notice
                </h2>
                <div className="pl-11 border-l-2 border-primary/10 ml-4">
                  <p className="text-[17px] leading-relaxed">
                    Most synthetic peptides are regulated as drugs under the <em>Food and Drugs Act</em> (Canada). Peptideology does not hold any licence as a pharmacy, drug establishment, or natural health product site holder.
                  </p>
                  <p className="text-[17px] leading-relaxed mt-4">
                    No products on this website have been evaluated or approved by Health Canada for safety, efficacy, or quality. Unauthorized injectable peptides pose serious health risks including contamination, infection, hormonal imbalance, and organ damage.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-2xl mb-4 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-mono">03</span>
                  Purchasing Requirements & Buyer Representation
                </h2>
                <div className="pl-11 border-l-2 border-primary/10 ml-4">
                  <p className="text-[17px] leading-relaxed">
                    By purchasing from Peptideology, you represent and warrant that:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2 text-[17px]">
                    <li>You are at least <strong>21 years of age</strong></li>
                    <li>You are a qualified researcher, laboratory, or institutional buyer</li>
                    <li>You will use the products exclusively for legitimate scientific research in full compliance with all applicable Canadian federal, provincial, and local laws</li>
                    <li>You will not administer, ingest, inject, or use the products on humans or animals</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-2xl mb-4 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-mono">04</span>
                  Limitation of Liability
                </h2>
                <div className="pl-11 border-l-2 border-primary/10 ml-4">
                  <p className="text-[17px] leading-relaxed">
                    Peptideology, its owners, officers, employees, and affiliates shall not be held liable for any damages, injuries, losses, or regulatory actions resulting from the misuse, mishandling, or any non-research use of our products.
                  </p>
                  <p className="text-[17px] leading-relaxed mt-4">
                    The buyer assumes full responsibility for compliance with all regulations and for the safe handling, storage, and use of research chemicals.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-2xl mb-4 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-mono">05</span>
                  No Therapeutic Claims
                </h2>
                <div className="pl-11 border-l-2 border-primary/10 ml-4">
                  <p className="text-[17px] leading-relaxed">
                    Peptideology makes no claims regarding the safety, efficacy, or suitability of our products for any purpose other than laboratory research. We do not provide dosing, administration, or reconstitution guidance for human or animal use.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-2xl mb-4 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-mono">06</span>
                  Contact & Questions
                </h2>
                <div className="pl-11 border-l-2 border-primary/10 ml-4">
                  <p className="text-[17px] leading-relaxed">
                    For any questions regarding our compliance policies, please contact us at <strong>support@peptideology.ca</strong>.
                  </p>
                </div>
              </section>
            </div>

            <p className="italic mt-12 text-sm text-zinc-400 border-t border-border/40 pt-8">
              By accessing this website or making a purchase, you acknowledge that you have read, understood, and agree to this Legal & Compliance statement in its entirety.
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Legal;