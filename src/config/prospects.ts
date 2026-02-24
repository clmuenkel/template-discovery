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
  "brooks-plumbing": {
    slug: "brooks-plumbing",
    companyName: "Brooks Plumbing",
    contactFirstName: "Jaclyn",
    contactLastName: "Basilone",
    contactTitle: "Chief Operating Officer",
    logoUrl: "/prospects/brooks-plumbing/logo.png",
    industry: "Plumbing",
    linkedin: {
      university: "University of Dallas",
    },
    heroTagline: "Scaling excellence across Dallas.",
    callNotes:
      "Brooks Plumbing is running a strong operation. Our focus today: how an auto-quoting tool can help your field techs quote faster and more consistently — freeing them up to do what they do best.",
    insights: [
      {
        icon: "sparkles",
        title: "Brooks Is Thriving",
        description:
          "Your team is winning jobs and growing. This isn't about fixing what's broken.",
      },
      {
        icon: "clock",
        title: "Quoting Is the Bottleneck",
        description:
          "Field techs are spending time building quotes instead of completing jobs. That's the gap.",
      },
      {
        icon: "growth",
        title: "Ready to Scale",
        description:
          "With the right tools, your team can quote faster, close more, and grow without adding overhead.",
      },
    ],
    painPoints: [
      "Field techs quoting manually — inconsistent pricing across the team",
      "Time spent building quotes instead of completing jobs",
      "Scaling the quoting process as the team and job volume grow",
    ],
    suggestedSolutions: [
      "AI-powered auto-quote tool for field technicians",
      "Real-time mobile pricing and job scoping on-site",
      "Streamlined field-to-office quoting workflow",
    ],
    closingMessage: "Let's get your field techs quoting in minutes, not hours.",
    theme: {
      accent: "#1A4B8C",
      accentLight: "#2B6BC0",
      accentDark: "#133969",
      themeLabel: "ud-crusaders",
      watermarkUrl: "/prospects/brooks-plumbing/watermark.png",
      easterEggIntro: "Go Crusaders, Jaclyn. Let's build something great.",
      easterEggClosing:
        "From Dallas with purpose — let's take Brooks Plumbing to the next level.",
    },
  },
  "andress-plumbing": {
    slug: "andress-plumbing",
    companyName: "Andress Plumbing",
    contactFirstName: "John",
    contactLastName: "Andress",
    contactTitle: "Owner",
    logoUrl: "/prospects/andress-plumbing/logo.png",
    industry: "Plumbing",
    linkedin: {
      yearsInBusiness: 25,
    },
    heroTagline: "Four generations. Zero shortcuts.",
    callNotes:
      "John knows exactly what he needs: a custom-built platform that works the way Housecall Pro does — but built around Andress Plumbing, not the other way around. Plus a website that matches 25 years of reputation. No middlemen. No guesswork.",
    insights: [
      {
        icon: "sparkles",
        title: "You Know What You Need",
        description:
          "A custom platform modeled after Housecall Pro, built specifically for how Andress Plumbing operates. No compromises.",
      },
      {
        icon: "clock",
        title: "Skip the Freelancers",
        description:
          "Your business has lasted four generations. Your dev team should last longer than one gig.",
      },
      {
        icon: "growth",
        title: "Website That Matches the Reputation",
        description:
          "25 years of trust deserves more than a template. We build it right — and we stick around to support it.",
      },
    ],
    painPoints: [
      "Housecall Pro doesn't fully match how the team actually works day-to-day",
      "Custom development options are either expensive agencies or unreliable freelancers",
      "Current website doesn't reflect 25+ years of reputation",
    ],
    suggestedSolutions: [
      "Custom platform modeled after Housecall Pro — built around your workflow",
      "Dedicated dev team with long-term support, not one-off gig workers",
      "Professional website that matches the Andress Plumbing brand",
    ],
    closingMessage:
      "Same workflow you trust, custom-built. No freelancers, no surprises.",
    theme: {
      accent: "#B8860B",
      accentLight: "#D4A017",
      accentDark: "#8B6914",
      themeLabel: "fort-worth-legacy",
      easterEggIntro:
        "Your business survived four generations, John. It deserves better than a Fiverr gig.",
      easterEggClosing:
        "No revisions. No ghosting. Just results. Welcome to EVIOS.",
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
