import { prospects, defaultProspect } from "@/config/prospects";
import type { ProspectConfig } from "@/config/types";
import type { Metadata } from "next";
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

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "EVIOS | Custom Process Optimization",
  description: "Personalized overview by EVIOS.",
};

export default function Home() {
  const customer = "demo";
  const prospect: ProspectConfig = prospects[customer] || defaultProspect;

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
          heroTagline={prospect.heroTagline}
          logoUrl={prospect.logoUrl}
          watermarkUrl={prospect.theme?.watermarkUrl}
        />
        <div className="accent-line" />
        <TeamSection />
        <ProcessSection />

        {/* ─── TRANSITION ─── */}
        <DiscoveryIntro
          companyName={prospect.companyName}
          contactFirstName={prospect.contactFirstName}
          callNotes={prospect.callNotes}
          easterEgg={prospect.theme?.easterEggIntro}
        />

        {/* ─── WORKSHOP ─── */}
        <DiscoverySnapshot customer={customer} />
        <ProcessMapper customer={customer} />

        {/* ─── CLOSE ─── */}
        <div className="accent-line" />
        <Closing
          contactFirstName={prospect.contactFirstName}
          customer={customer}
          closingMessage={prospect.closingMessage}
          easterEgg={prospect.theme?.easterEggClosing}
        />
        <Appendix prospect={prospect} />
      </main>
    </ThemeProvider>
  );
}
