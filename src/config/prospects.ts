import { ProspectConfig } from "./types";

export const prospects: Record<string, ProspectConfig> = {
  "acme-plumbing": {
    slug: "acme-plumbing",
    companyName: "Acme Plumbing Co.",
    contactFirstName: "John",
    contactLastName: "Smith",
    contactTitle: "Owner & General Manager",
    logoUrl: "/prospects/acme-plumbing/logo.png",
    industry: "Plumbing",
    linkedin: {
      profileUrl: "https://linkedin.com/in/johnsmith",
      university: "University of Texas at Austin",
      degree: "Business Administration",
      previousCompanies: ["Roto-Rooter", "ServiceMaster"],
      yearsInBusiness: 12,
      interests: ["Golf", "BBQ Competitions", "Youth Soccer Coach"],
      funFact:
        "Started his first plumbing business at age 23 right out of college",
    },
    callNotes:
      "Struggling with lead response time. Currently pen-and-paper dispatch. Losing jobs to faster competitors.",
    painPoints: [
      "Slow lead response — 30+ minute average",
      "Manual dispatch with pen and paper",
      "No systematic follow-up process",
      "Only 3.2 stars on Google (47 reviews)",
    ],
    suggestedSolutions: [
      "AI Voice Agent for instant lead response",
      "Automated dispatch & routing system",
      "Follow-up automation sequences",
      "Review generation & sentiment routing",
    ],
    theme: {
      accent: "#BF5700",
      accentLight: "#E87511",
      accentDark: "#994600",
      themeLabel: "ut-austin",
      easterEggIntro: "Hook 'em, John. 🤘",
      easterEggClosing: "Let's get this Longhorn operation running.",
    },
  },
};

export const defaultProspect: ProspectConfig = {
  slug: "demo",
  companyName: "Your Company",
  contactFirstName: "Valued",
  contactLastName: "Partner",
  contactTitle: "",
  logoUrl: "",
  industry: "Home Services",
  linkedin: {},
  painPoints: [],
  suggestedSolutions: [],
};
