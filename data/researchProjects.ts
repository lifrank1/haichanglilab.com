export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  keyFindings?: string[];
  status: 'active' | 'completed' | 'upcoming';
  collaborators?: string[];
  funding?: string;
}

export const researchProjects: ResearchProject[] = [
  {
    id: "mg53-membrane-repair",
    title: "MG53 Protein in Cell Membrane Repair",
    description: "Investigating the role of MG53 protein in cell membrane repair mechanisms and its therapeutic potential for treating various diseases including diabetes, cardiovascular disease, and acute lung injury.",
    keyFindings: [
      "MG53 protects against acute kidney injury",
      "Promotes wound healing and tissue regeneration",
      "Enhances cell survival under stress conditions"
    ],
    status: "active",
    collaborators: ["Dr. Jane Smith", "Dr. John Doe"],
    funding: "NIH R01 Grant"
  },
  {
    id: "cancer-biology-tumor-suppressors",
    title: "Cancer Biology & Tumor Suppressors",
    description: "Research on tumor suppressors in lung cancer and other solid tumors, with focus on drug resistance mechanisms and MG53's role in suppressing tumor progression.",
    keyFindings: [
      "MG53 suppresses tumor progression in non-small cell lung cancer",
      "Reduces stress granule formation in cancer cells",
      "Opens new therapeutic avenues for cancer treatment"
    ],
    status: "active",
    collaborators: ["Dr. Sarah Johnson"],
    funding: "American Cancer Society"
  },
  {
    id: "regenerative-medicine-hydrogels",
    title: "Regenerative Medicine & Bioinspired Hydrogels",
    description: "Development of innovative approaches to tissue repair and regeneration, including bioinspired hydrogels for controlled drug release and sustained delivery systems for therapeutic proteins.",
    keyFindings: [
      "Bioinspired hydrogels for controlled drug release",
      "Sustained delivery systems for therapeutic proteins",
      "Promising results for chronic wound treatment in diabetic patients"
    ],
    status: "active",
    collaborators: ["Dr. Michael Chen", "Dr. Lisa Wang"],
    funding: "NSF Grant"
  },
  {
    id: "translational-protein-therapy",
    title: "Translational Medicine & Protein Therapy",
    description: "Bridging basic science and clinical applications, with several therapeutic proteins and delivery systems moving toward clinical translation.",
    keyFindings: [
      "Recombinant human MG53 protein shows protective effects",
      "Protection against influenza virus infection",
      "Demonstrates translational potential for tissue injury treatment"
    ],
    status: "active",
    collaborators: ["Dr. Robert Kim", "Dr. Maria Garcia"],
    funding: "Industry Partnership"
  }
];
