import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <Layout>
      <section className="container pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl font-semibold tracking-tight">Privacy Policy</h1>

          <div className="mt-12 prose prose-stone max-w-4xl font-light leading-relaxed text-muted-foreground bg-white/50 p-8 rounded-[2rem] border border-border/40 shadow-sm">

            <p className="mb-8 text-sm text-zinc-500">Last Updated: May 22, 2026</p>

            <p className="mb-8">
              At <strong>Peptideology</strong> (“Peptideology”, “we”, “us”, or “our”), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information in accordance with the <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and other applicable Canadian privacy laws.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">1. Accountability</h2>
            <p className="mb-6">
              We have designated a Privacy Officer responsible for ensuring compliance with PIPEDA and this Privacy Policy. For any questions or concerns, contact us at <strong>support@peptideology.ca</strong>.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">2. Identifying Purposes</h2>
            <p className="mb-6">
              We collect personal information only for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Processing and fulfilling research chemical orders</li>
              <li>Communicating with you about your orders and inquiries</li>
              <li>Improving our website and services</li>
              <li>Complying with legal and regulatory obligations</li>
            </ul>

            <h2 className="text-foreground font-semibold text-2xl mb-4">3. Consent</h2>
            <p className="mb-6">
              By using our website and making a purchase, you consent to the collection, use, and disclosure of your personal information as described in this policy. You may withdraw your consent at any time by contacting us, subject to legal and contractual restrictions.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">4. Limiting Collection</h2>
            <p className="mb-6">
              We collect only the personal information necessary to provide our research products and services. This may include:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Name, billing and shipping address, email, and phone number</li>
              <li>Payment information (processed securely by third-party providers)</li>
              <li>Order history and communication records</li>
            </ul>

            <h2 className="text-foreground font-semibold text-2xl mb-4">5. Limiting Use, Disclosure & Retention</h2>
            <p className="mb-6">
              We do not sell, rent, or trade your personal information. We may share it only with trusted third-party service providers (such as payment processors, shipping carriers, and hosting services) who are bound by confidentiality obligations.
            </p>
            <p className="mb-6">
              Personal information is retained only as long as necessary to fulfill the purposes for which it was collected or as required by law.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">6. Accuracy & Safeguards</h2>
            <p className="mb-6">
              We take reasonable steps to ensure your personal information is accurate and protected against loss, theft, unauthorized access, disclosure, copying, use, or modification. This includes administrative, technical, and physical safeguards.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">7. Openness</h2>
            <p className="mb-6">
              This Privacy Policy is available on our website. We will make readily available specific information about our policies and practices relating to the management of personal information.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">8. Individual Access</h2>
            <p className="mb-6">
              You have the right to access your personal information and request corrections if it is inaccurate. To make a request, please contact us at <strong>support@peptideology.ca</strong>. We will respond within 30 days.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">9. Challenging Compliance</h2>
            <p className="mb-6">
              If you have any concerns about our compliance with this Privacy Policy or PIPEDA, please contact our Privacy Officer at <strong>support@peptideology.ca</strong>. You also have the right to complain to the Office of the Privacy Commissioner of Canada.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">10. Cookies and Tracking Technologies</h2>
            <p className="mb-6">
              Our website may use cookies and similar technologies to enhance user experience, analyze traffic, and improve functionality. You can manage your cookie preferences through your browser settings.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">11. International Transfers</h2>
            <p className="mb-6">
              Some of our service providers may be located outside of Canada. When we transfer personal information outside Canada, we take appropriate measures to ensure it remains protected.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">12. Changes to This Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website.
            </p>

            <p className="italic mt-12 text-sm text-zinc-400 border-t border-border/40 pt-8">
              By using our website, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Privacy;