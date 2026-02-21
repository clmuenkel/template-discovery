"use client";

import { useState } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Building2,
  Crosshair,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface BioField {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface TeamMember {
  name: string;
  title: string;
  image: string;
  imagePosition: string;
  fields: BioField[];
}

const team: TeamMember[] = [
  {
    name: "Carl-Luca Muenkel",
    title: "Founder | Head of Process",
    image: "/team/carl-luca.png",
    imagePosition: "center top",
    fields: [
      {
        icon: GraduationCap,
        label: "Education",
        value: "BBA (Finance & Consulting) — USC, Bocconi, HKUST",
      },
      {
        icon: Building2,
        label: "Previously",
        value: "Celonis — #1 Process Optimization firm globally",
      },
      {
        icon: Crosshair,
        label: "Focus",
        value: "Leads discovery and process mapping for every EVIOS engagement",
      },
    ],
  },
  {
    name: "Zad Iqbal",
    title: "Head of Partnerships",
    image: "/team/zad.png",
    imagePosition: "center 8%",
    fields: [
      {
        icon: Building2,
        label: "Software",
        value: "4 years of software experience at Amazon",
      },
      {
        icon: Building2,
        label: "Sales",
        value: "3 years in technical sales & client relations at Bridgepointe",
      },
      {
        icon: Crosshair,
        label: "Focus",
        value: "Ensures every client relationship is built to last",
      },
    ],
  },
  {
    name: "Facundo Llamas",
    title: "Head of Technology",
    image: "/team/facundo.png",
    imagePosition: "center top",
    fields: [
      {
        icon: Building2,
        label: "Previously",
        value: "3 years of technology and software experience at PwC",
      },
      {
        icon: Crosshair,
        label: "Track Record",
        value: "Built and deployed over 25 SaaS tools and automations",
      },
      {
        icon: Crosshair,
        label: "Focus",
        value: "Architects and builds every custom solution at EVIOS",
      },
    ],
  },
];

export default function TeamSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="team" className="py-24 lg:py-32 bg-bg-elevated relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <p className="text-evios text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Your Team
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Who&apos;s behind EVIOS
          </h2>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-6 md:gap-5 items-start justify-center">
          {team.map((member, i) => {
            const isActive = active === i;
            const hasActive = active !== null;
            const isInactive = hasActive && !isActive;

            return (
              <ScrollReveal key={member.name} delay={i * 0.15} className="w-full md:flex-1">
                <div
                  className="cursor-pointer select-none"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === i ? null : i)}
                >
                  {/* Photo card */}
                  <div
                    className="relative overflow-hidden rounded-2xl bg-bg transition-all duration-500 ease-out"
                    style={{
                      aspectRatio: "3/4",
                      filter: isInactive ? "brightness(0.35) saturate(0.5)" : "brightness(1)",
                      transform: isActive ? "scale(1.03)" : "scale(1)",
                      boxShadow: isActive
                        ? "0 0 40px rgba(var(--color-evios-rgb),0.2), 0 0 80px rgba(var(--color-evios-rgb),0.06)"
                        : "0 0 0 rgba(0,0,0,0)",
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out"
                      style={{
                        objectPosition: member.imagePosition,
                        transform: `scale(${isActive ? 1.06 : 1})`,
                      }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(var(--color-evios-rgb),0.7), transparent)",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.5s ease",
                      }}
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3
                        className="text-xl font-bold text-white transition-all duration-300"
                        style={{
                          textShadow: isActive ? "0 0 20px rgba(var(--color-evios-rgb),0.3)" : "none",
                        }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-evios-light text-sm font-medium mt-0.5">{member.title}</p>
                    </div>
                  </div>

                  {/* Structured bio reveal */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-out"
                    style={{
                      maxHeight: isActive ? "400px" : "0px",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="pt-4 space-y-2.5">
                      {member.fields.map((field, fi) => {
                        const FieldIcon = field.icon;
                        return (
                          <div
                            key={field.label}
                            className="rounded-xl p-3.5 transition-all duration-400"
                            style={{
                              background: "rgba(var(--color-evios-rgb),0.03)",
                              border: "1px solid rgba(var(--color-evios-rgb),0.08)",
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? "translateY(0)" : "translateY(12px)",
                              transition: `opacity 0.4s ease ${0.15 + fi * 0.1}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${0.15 + fi * 0.1}s, background 0.3s ease, border-color 0.3s ease`,
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                style={{
                                  background: "rgba(var(--color-evios-rgb),0.1)",
                                }}
                              >
                                <FieldIcon className="w-3.5 h-3.5 text-evios" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] font-bold text-evios uppercase tracking-wider mb-0.5">
                                  {field.label}
                                </p>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                  {field.value}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
