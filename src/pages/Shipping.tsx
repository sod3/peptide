import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

const Shipping = () => {
  return (
    <Layout>
      <section className="container pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl font-semibold tracking-tight">Shipping & Returns Policy</h1>

          <div className="mt-12 prose prose-stone max-w-4xl font-light leading-relaxed text-muted-foreground bg-white/50 p-8 rounded-[2rem] border border-border/40 shadow-sm">

            <p className="mb-8 text-sm text-zinc-500">Last Updated: May 22, 2026</p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">1. Shipping Policy</h2>
            <p className="mb-6">
              Peptideology ships **domestically within Canada** only. All orders are fulfilled from our climate-controlled facility in Canada.
            </p>
            <p className="mb-6">
              We use reliable express carriers (such as Canada Post Xpresspost or Purolator) with discreet packaging. Temperature-sensitive research materials are shipped with appropriate cold-chain or insulated packaging where necessary.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">2. Processing & Shipping Times</h2>
            <p className="mb-6">
              Orders placed before <strong>3:00 PM ET</strong> on business days (Monday–Friday) are typically processed and shipped the same day. Orders placed after this cutoff or on weekends/holidays will ship the next business day.
            </p>
            <p className="mb-6">
              Standard delivery times within Canada are <strong>1–3 business days</strong>, depending on your location. Remote areas may take longer.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">3. Shipping Costs</h2>
            <p className="mb-6">
              Shipping fees are calculated at checkout based on weight, destination, and shipping method selected. We do not offer free shipping.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">4. Tracking & Delivery</h2>
            <p className="mb-6">
              A tracking number will be provided via email once your order ships. You are responsible for ensuring someone is available to receive the package or that it can be safely left at the delivery address.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">5. International Shipping</h2>
            <p className="mb-6">
              We currently do <strong>not ship internationally</strong>. Customers outside Canada are responsible for any import regulations, duties, and taxes in their jurisdiction.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">6. Returns & Refunds Policy</h2>
            <p className="mb-6">
              Due to the nature of research chemicals, <strong>all sales are final</strong>. We do not accept returns or offer refunds for change of mind, accidental orders, or customer error.
            </p>
            <p className="mb-6">
              <strong>Exceptions</strong> may be considered <strong>only</strong> in the following cases:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Product arrives damaged or defective (must be reported within <strong>48 hours</strong> of delivery with clear photographic evidence)</li>
              <li>Incorrect product was shipped (wrong item or quantity)</li>
            </ul>
            <p className="mb-6">
              In such cases, please contact us immediately at <strong>support@peptideology.ca</strong>. We reserve the right to require return of the product (where legally and safely possible) before issuing a replacement or refund.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">7. Quality Guarantee</h2>
            <p className="mb-6">
              We stand behind the purity and quality of our research compounds as stated on the accompanying Certificate of Analysis (COA). Claims regarding purity must be supported by independent third-party testing at the customer’s expense.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">8. Regulatory Compliance & Health Canada Notice</h2>
            <p className="mb-6">
              All products are sold strictly for <strong>laboratory research use only</strong>. Customers are solely responsible for ensuring compliance with all federal, provincial, and local laws regarding the purchase, importation, possession, and use of research chemicals.
            </p>
            <p className="mb-6">
              Health Canada regulates many synthetic peptides as unauthorized drugs when intended for human use. “For Research Use Only” labeling does not exempt products from regulatory requirements if misused.
            </p>

            <h2 className="text-foreground font-semibold text-2xl mb-4">9. Lost or Delayed Shipments</h2>
            <p className="mb-6">
              If a package is marked as delivered but not received, you must contact the carrier first. For issues with shipping, contact us at <strong>support@peptideology.ca</strong>.
            </p>

            <p className="italic mt-12 text-sm text-zinc-400 border-t border-border/40 pt-8">
              By placing an order with Peptideology, you acknowledge that you have read, understood, and agree to this Shipping & Returns Policy in its entirety.
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Shipping;