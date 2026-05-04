export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Healing" | "Recovery" | "Growth" | "Longevity" | "Performance";
  purpose: string[];
  mg: number;
  purity: number; // %
  price: number;
  tagline: string;
  description: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "bpc-157",
    name: "BPC-157",
    category: "Healing",
    purpose: ["Recovery", "Joint", "Gut"],
    mg: 5,
    purity: 99.2,
    price: 64,
    tagline: "Body Protection Compound",
    description:
      "A 15-amino-acid synthetic peptide derived from a protective protein found in gastric juice. Widely studied for tissue repair pathways.",
    badge: "Bestseller",
  },
  {
    id: "p2",
    slug: "tb-500",
    name: "TB-500",
    category: "Recovery",
    purpose: ["Recovery", "Inflammation"],
    mg: 5,
    purity: 99.0,
    price: 78,
    tagline: "Thymosin Beta-4 Fragment",
    description:
      "Studied for its role in cellular migration, actin regulation, and systemic recovery research models.",
  },
  {
    id: "p3",
    slug: "cjc-1295",
    name: "CJC-1295 (No DAC)",
    category: "Growth",
    purpose: ["GH", "Performance"],
    mg: 2,
    purity: 99.4,
    price: 52,
    tagline: "GHRH Analog",
    description:
      "A growth hormone-releasing hormone analog studied in pulsatile GH research protocols.",
  },
  {
    id: "p4",
    slug: "ipamorelin",
    name: "Ipamorelin",
    category: "Growth",
    purpose: ["GH", "Sleep"],
    mg: 5,
    purity: 99.3,
    price: 49,
    tagline: "Selective GH Secretagogue",
    description:
      "A pentapeptide ghrelin mimetic studied for its selective GH-releasing profile in research models.",
    badge: "New",
  },
  {
    id: "p5",
    slug: "ghk-cu",
    name: "GHK-Cu",
    category: "Longevity",
    purpose: ["Skin", "Anti-aging"],
    mg: 50,
    purity: 99.1,
    price: 89,
    tagline: "Copper Tripeptide-1",
    description:
      "A naturally occurring copper-binding tripeptide investigated in regenerative and dermal research.",
  },
  {
    id: "p6",
    slug: "semaglutide",
    name: "Semaglutide",
    category: "Performance",
    purpose: ["Metabolic"],
    mg: 5,
    purity: 99.5,
    price: 189,
    tagline: "GLP-1 Receptor Agonist",
    description:
      "A long-acting GLP-1 receptor agonist studied across metabolic and appetite-regulation research models.",
    badge: "Lab Verified",
  },
  {
    id: "p7",
    slug: "tesamorelin",
    name: "Tesamorelin",
    category: "Growth",
    purpose: ["GH", "Metabolic"],
    mg: 5,
    purity: 99.2,
    price: 145,
    tagline: "GHRH Analog",
    description:
      "A stabilized GHRH analog studied in visceral adiposity and lipid research contexts.",
  },
  {
    id: "p8",
    slug: "melanotan-ii",
    name: "Melanotan II",
    category: "Longevity",
    purpose: ["Skin"],
    mg: 10,
    purity: 99.0,
    price: 42,
    tagline: "α-MSH Analog",
    description:
      "A synthetic analog of α-melanocyte-stimulating hormone studied in pigmentation research.",
  },
];
