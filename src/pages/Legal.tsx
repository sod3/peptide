import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

const Legal = () => {
  return (
    <Layout>
      <section className="container pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl font-semibold tracking-tight">Legal & Compliance</h1>
          <div className="mt-12 prose prose-stone max-w-4xl font-light leading-relaxed text-muted-foreground">
            <h2 className="text-foreground font-semibold">1. Research Use Only (RUO)</h2>
            <p>
              All products sold by Peptide Bio are intended strictly for in-vitro laboratory research and development use only. They are NOT for human or animal consumption, veterinary use, food, or cosmetic applications.
            </p>

            <h2 className="text-foreground font-semibold mt-8">2. Purchasing Requirements</h2>
            <p>
              By purchasing from Peptide Bio, you represent that you are a qualified researcher, laboratory professional, or institutional buyer who understands the risks associated with handling research chemicals.
            </p>

            <h2 className="text-foreground font-semibold mt-8">3. Limitation of Liability</h2>
            <p>
              Peptide Bio shall not be held liable for any damages resulting from the misuse or mishandling of our products. Users assume all responsibility for compliance with local, state, and federal regulations regarding the possession and use of research peptides.
            </p>

            <h2 className="text-foreground font-semibold mt-8">4. Privacy Policy</h2>
            <p>
              We prioritize laboratory privacy. Customer data is stored on SOC2-compliant infrastructure and is never sold to third parties. We utilize SSL encryption for all transactions.
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Legal;
