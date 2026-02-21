import type { Metadata } from "next";
import { prospects, defaultProspect } from "@/config/prospects";
import type { ProspectConfig } from "@/config/types";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TeamSection from "@/components/TeamSection";
import ProcessSection from "@/components/ProcessSection";
import StatsSection from "@/components/StatsSection";
import DiscoveryIntro from "@/components/DiscoveryIntro";
import DiscoverySnapshot from "@/components/DiscoverySnapshot";
import ProcessMapper from "@/components/ProcessMapper";
import Closing from "@/components/Closing";

interface PageProps {
  searchParams: Promise<{ slug?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const slug = params.slug || "demo";
  const prospect = prospects[slug] || defaultProspect;

  return {
    title:
      prospect.companyName !== "Your Company"
        ? `EVIOS \u00D7 ${prospect.companyName}`
        : "EVIOS | Custom Process Optimization",
    description: `Personalized overview for ${prospect.companyName} by EVIOS.`,
  };
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const slug = params.slug || "demo";
  const prospect: ProspectConfig = prospects[slug] || defaultProspect;

  return (
    <ThemeProvider theme={prospect.theme}>
      <main className="min-h-screen bg-bg">
        <Navbar companyName={prospect.companyName} />

        {/* ─── PRESENTATION ─── */}
        <Hero
          companyName={prospect.companyName}
          contactFirstName={prospect.contactFirstName}
          contactLastName={prospect.contactLastName}
          contactTitle={prospect.contactTitle}
          logoUrl={prospect.logoUrl}
          watermarkUrl={prospect.theme?.watermarkUrl}
        />
        <div className="accent-line" />
        <TeamSection />
        <ProcessSection />
        <StatsSection prospect={prospect} />

        {/* ─── TRANSITION ─── */}
        <DiscoveryIntro
          companyName={prospect.companyName}
          contactFirstName={prospect.contactFirstName}
          callNotes={prospect.callNotes}
          easterEgg={prospect.theme?.easterEggIntro}
        />

        {/* ─── WORKSHOP ─── */}
        <DiscoverySnapshot slug={slug} />
        <ProcessMapper slug={slug} />

        {/* ─── CLOSE ─── */}
        <div className="accent-line" />
        <Closing
          contactFirstName={prospect.contactFirstName}
          slug={slug}
          easterEgg={prospect.theme?.easterEggClosing}
        />
      </main>
    </ThemeProvider>
  );
}
