export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Tissue Repair" | "Athletic Research" | "Secretagogue Research" | "Cellular Senescence" | "Metabolic Research";
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
    category: "Tissue Repair",
    purpose: ["Systemic Research", "Joint Logic", "Gastrointestinal Model"],
    mg: 5,
    purity: 99.2,
    price: 64,
    tagline: "Synthetic Pentadecapeptide",
    description:
      "A 15-amino-acid synthetic peptide derived from a protective protein found in gastric juice. Investigated for its role in angiogenesis and tissue-specific signaling pathways.",
    badge: "Bestseller",
  },
  {
    id: "p2",
    slug: "tb-500",
    name: "TB-500",
    category: "Tissue Repair",
    purpose: ["Recovery Research", "Actin Regulation"],
    mg: 5,
    purity: 99.0,
    price: 78,
    tagline: "Thymosin Beta-4 Fragment",
    description:
      "A synthetic fragment of the naturally occurring Thymosin Beta-4. Studied for its role in cellular migration and actin-binding research models.",
  },
  {
    id: "p3",
    slug: "cjc-1295",
    name: "CJC-1295 (No DAC)",
    category: "Secretagogue Research",
    purpose: ["GH Secretagogue", "Pulsatile Research"],
    mg: 2,
    purity: 99.4,
    price: 52,
    tagline: "GHRH Analog",
    description:
      "A growth hormone-releasing hormone (GHRH) analog studied in pulsatile growth hormone research protocols.",
  },
  {
    id: "p4",
    slug: "ipamorelin",
    name: "Ipamorelin",
    category: "Secretagogue Research",
    purpose: ["GH Axis", "Receptor Affinity"],
    mg: 5,
    purity: 99.3,
    price: 49,
    tagline: "Selective Ghrelin Mimetic",
    description:
      "A pentapeptide ghrelin mimetic studied for its highly selective GH-releasing profile in laboratory research models.",
    badge: "New",
  },
  {
    id: "p5",
    slug: "ghk-cu",
    name: "GHK-Cu",
    category: "Cellular Senescence",
    purpose: ["Dermal Science", "Collagen Pathway"],
    mg: 50,
    purity: 99.1,
    price: 89,
    tagline: "Copper Tripeptide-1",
    description:
      "A naturally occurring copper-binding tripeptide investigated in regenerative science and dermal research models.",
  },
  {
    id: "p6",
    slug: "semaglutide",
    name: "Semaglutide",
    category: "Metabolic Research",
    purpose: ["GLP-1 Pathway", "Insulinotropism"],
    mg: 5,
    purity: 99.5,
    price: 189,
    tagline: "GLP-1 Receptor Agonist",
    description:
      "A long-acting GLP-1 receptor agonist studied across metabolic, glycemic control, and appetite-regulation research models.",
    badge: "Lab Verified",
  },
  {
    id: "p7",
    slug: "tesamorelin",
    name: "Tesamorelin",
    category: "Metabolic Research",
    purpose: ["Lipid Metabolism", "Adiposity Research"],
    mg: 5,
    purity: 99.2,
    price: 145,
    tagline: "Stabilized GHRH Analog",
    description:
      "A stabilized GHRH analog studied in visceral adiposity, lipid profiles, and metabolic research contexts.",
  },
  {
    id: "p8",
    slug: "melanotan-ii",
    name: "Melanotan II",
    category: "Cellular Senescence",
    purpose: ["Photobiology Research"],
    mg: 10,
    purity: 99.0,
    price: 42,
    tagline: "α-MSH Analog",
    description:
      "A synthetic analog of α-melanocyte-stimulating hormone investigated in photobiology and pigmentation research.",
  },
];
