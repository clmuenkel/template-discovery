"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import basePath from "@/lib/basePath";

interface HeroProps {
  companyName: string;
  contactFirstName: string;
  contactLastName: string;
  contactTitle: string;
  heroTagline?: string;
  logoUrl?: string;
  watermarkUrl?: string;
}

export default function Hero({
  companyName,
  contactFirstName,
  contactLastName,
  contactTitle,
  heroTagline,
  logoUrl,
  watermarkUrl,
}: HeroProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2100),
      setTimeout(() => setPhase(5), 2800),
      setTimeout(() => setPhase(6), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isPersonalized = contactFirstName !== "Valued";
  const hasLogo = logoUrl && logoUrl.length > 0;
  const isAndress = companyName === "Andress Plumbing";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 48%, rgba(var(--color-evios-rgb),0.06) 0%, transparent 100%)",
        }}
      />

      {watermarkUrl && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <Image
            src={watermarkUrl}
            alt=""
            width={600}
            height={600}
            className="w-[500px] h-auto opacity-[0.03] select-none"
            style={{ filter: "grayscale(1) opacity(0.6)" }}
            aria-hidden
          />
        </div>
      )}

      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-0">
        {/* Phase 1: EVIOS Logo */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "none" : "scale(0.9)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Image
            src={`${basePath}/evios-logo-clean.png`}
            alt="EVIOS"
            width={260}
            height={72}
            className="h-14 sm:h-16 w-auto mx-auto"
            priority
          />
        </div>

        {/* Phase 2: "Prepared for" */}
        <div
          className="pt-16"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "none" : "translateY(12px)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="text-text-muted text-[13px] tracking-[0.3em] uppercase font-medium">
            Prepared exclusively for
          </p>
        </div>

        {/* Phase 3: Company name + optional logo */}
        <div
          className="pt-5"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "none" : "translateY(16px)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {hasLogo && (
            <div className="mb-5 flex justify-center">
              <Image
                src={logoUrl}
                alt={companyName}
                width={isAndress ? 720 : 560}
                height={isAndress ? 230 : 180}
                className={`${isAndress ? "h-24 sm:h-28" : "h-20 sm:h-24"} w-auto object-contain opacity-95`}
              />
            </div>
          )}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={{
              textShadow: phase >= 3 ? "0 0 60px rgba(var(--color-evios-rgb),0.12)" : "none",
              transition: "text-shadow 2s ease",
            }}
          >
            {companyName}
          </h1>
        </div>

        {/* Phase 4: Optional hero tagline */}
        {heroTagline && (
          <div
            className="pt-5"
            style={{
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? "none" : "translateY(10px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <p className="text-text-muted text-[12px] tracking-[0.22em] uppercase font-medium">
              {heroTagline}
            </p>
          </div>
        )}

        {/* Phase 5: Divider + contact */}
        <div
          className="pt-10"
          style={{
            opacity: phase >= 5 ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            className="w-20 h-px mx-auto mb-6"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(var(--color-evios-rgb),0.8), transparent)",
              boxShadow: "0 0 12px rgba(var(--color-evios-rgb),0.3)",
              transform: phase >= 5 ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          />
          {isPersonalized && (
            <p className="text-text-secondary text-2xl sm:text-3xl font-semibold">
              {contactFirstName} {contactLastName}
              {contactTitle && (
                <span className="text-text-muted text-xl sm:text-2xl"> &mdash; {contactTitle}</span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Phase 6: Scroll hint */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        style={{
          opacity: phase >= 6 ? 1 : 0,
          transition: "opacity 1s ease",
          animation: phase >= 6 ? "scroll-hint 2.5s ease-in-out infinite" : "none",
        }}
      >
        <a href="#team" aria-label="Scroll down">
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </a>
      </div>
    </section>
  );
}
