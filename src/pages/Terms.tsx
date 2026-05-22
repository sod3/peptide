import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <Layout>
      <section className="container pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl font-semibold tracking-tight">Terms & Conditions</h1>

          <div className="mt-12 prose prose-stone max-w-4xl font-light leading-relaxed text-muted-foreground bg-white/50 p-8 rounded-[2rem] border border-border/40 shadow-sm">

            <p className="mb-8 text-sm text-zinc-500">Last Updated: May 22, 2026</p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              Welcome to <strong>Peptideology</strong> (“Peptideology”, “we”, “us”, or “our”), operated with support email <strong>support@peptideology.ca</strong>.
            </p>
            <p className="mb-6">
              By accessing or using our website(https://peptideology.ca) and purchasing any products, you agree to be bound by these Terms & Conditions (“Terms”), our Privacy Policy, Shipping & Returns Policy, and all other referenced policies. If you do not agree, please do not use our website or purchase products.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">2. Age Verification & Eligibility</h2>
            <p className="mb-6">
              You must be at least <strong>21 years of age</strong> to access this website and make purchases. By entering the site or placing an order, you confirm that you are 21+ and have the legal capacity to enter into this agreement.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">3. Research Use Only – Not for Human Consumption</h2>
            <p className="mb-6">
              All products sold by Peptideology are <strong>strictly and solely intended for laboratory research, in-vitro studies, and scientific experimentation</strong> by qualified professionals.
            </p>
            <p className="mb-6">
              <strong>Critical Warnings:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Our products are <strong>not for human consumption</strong>, not for animal use, and are not intended to diagnose, treat, cure, mitigate, or prevent any disease or medical condition.</li>
              <li>These products have <strong>not been evaluated or approved</strong> by Health Canada.</li>
              <li>They are not drugs, food, dietary supplements, cosmetics, or therapeutic products.</li>
              <li>Health Canada regulates most synthetic peptides as prescription drugs. Unauthorized products are illegal for human use in Canada. Labeling as “For Research Use Only” does <strong>not</strong> make them legal or safe for human consumption.</li>
            </ul>

            <h2 className="text-foreground font-semibold text-2xl mb-4">4. No Medical or Therapeutic Claims</h2>
            <p className="mb-6">
              Peptideology makes <strong>no representations or warranties</strong> regarding the safety, efficacy, or suitability of our products for any purpose other than laboratory research. We do not provide dosing, administration, or reconstitution instructions for non-research use. Any information on our site is for educational/research purposes only and is not medical advice.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">5. Regulatory Compliance</h2>
            <p className="mb-6">
              Peptideology operates solely as a supplier of research chemicals. We do not hold any licence as a pharmacy, drug establishment, or natural health product site holder under the <em>Food and Drugs Act</em> (Canada) and its regulations.
            </p>
            <p className="mb-6">
              You are solely responsible for ensuring that your purchase, importation, possession, handling, storage, and use of our products comply with all applicable laws in your jurisdiction. We reserve the right to refuse service or cancel orders if we suspect non-research intent.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">6. Limitation of Liability</h2>
            <p className="mb-6">
              To the fullest extent permitted by law, Peptideology, its owners, officers, employees, and affiliates shall <strong>not be liable</strong> for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use or misuse of our products or any violation of these Terms.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">7. Indemnification</h2>
            <p className="mb-6">
              You agree to indemnify, defend, and hold harmless Peptideology and its affiliates from any claims, liabilities, damages, losses, and expenses (including legal fees) arising from your misuse of products, violation of these Terms, any non-research use, or breach of applicable laws.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">8. No Warranty</h2>
            <p className="mb-6">
              All products are provided <strong>“AS IS”</strong> with no warranties, express or implied, including merchantability or fitness for a particular purpose.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">9. Contact Us</h2>
            <p className="mb-6">
              For questions about these Terms, contact us at <strong>support@peptideology.ca</strong>.
            </p>

            <p className="italic mt-12 text-sm text-zinc-400 border-t border-border/40 pt-8">
              By placing an order or accessing this site, you acknowledge that you have read, understood, and agree to these Terms in their entirety.
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Terms;