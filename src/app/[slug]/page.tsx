import type { Metadata } from "next";
import { prospects, defaultProspect } from "@/config/prospects";
import type { ProspectConfig } from "@/config/types";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TeamSection from "@/components/TeamSection";
import ProcessSection from "@/components/ProcessSection";
import DiscoveryIntro from "@/components/DiscoveryIntro";
import DiscoverySnapshot from "@/components/DiscoverySnapshot";
import ProcessMapper from "@/components/ProcessMapper";
import Closing from "@/components/Closing";
import Appendix from "@/components/Appendix";
import AggieEasterEgg from "@/components/AggieEasterEgg";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(prospects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const prospect = prospects[slug] || defaultProspect;

  return {
    title:
      prospect.companyName !== "Your Company"
        ? `EVIOS × ${prospect.companyName}`
        : "EVIOS | Custom Process Optimization",
    description: `Personalized overview for ${prospect.companyName} by EVIOS.`,
  };
}

export default async function ProspectPage({ params }: PageProps) {
  const { slug } = await params;
  const customer = slug;
  const prospect: ProspectConfig = prospects[customer] || defaultProspect;

  return (
    <ThemeProvider theme={prospect.theme}>
      <main className="min-h-screen bg-bg">
        <Navbar companyName={prospect.companyName} />

        <Hero
          companyName={prospect.companyName}
          contactFirstName={prospect.contactFirstName}
          contactLastName={prospect.contactLastName}
          contactTitle={prospect.contactTitle}
          heroTagline={prospect.heroTagline}
          logoUrl={prospect.logoUrl}
          watermarkUrl={prospect.theme?.watermarkUrl}
        />
        <div className="accent-line" />
        <TeamSection />
        <ProcessSection />

        <DiscoveryIntro
          companyName={prospect.companyName}
          contactFirstName={prospect.contactFirstName}
          callNotes={prospect.callNotes}
          easterEgg={prospect.theme?.easterEggIntro}
          universityLogoUrl={prospect.linkedin.universityLogoUrl}
        />

        <DiscoverySnapshot customer={customer} />
        <ProcessMapper customer={customer} />

        <div className="accent-line" />
        <Closing
          contactFirstName={prospect.contactFirstName}
          customer={customer}
          closingMessage={prospect.closingMessage}
          easterEgg={prospect.theme?.easterEggClosing}
          universityLogoUrl={prospect.linkedin.universityLogoUrl}
        />
        <Appendix prospect={prospect} />
        <AggieEasterEgg
          keyword={prospect.theme?.easterEggKeyword}
          logoUrl={prospect.linkedin.universityLogoUrl}
        />
      </main>
    </ThemeProvider>
  );
}
