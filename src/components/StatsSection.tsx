"use client";

import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useInView } from "@/hooks/useInView";
import { Zap, TrendingUp, Star, Check, AlertCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import type { ProspectConfig } from "@/config/types";

function StatBlock({
  icon: Icon,
  stat,
  label,
  sublabel,
  bullets,
  painPoint,
  solutions,
  relatedPainPoint,
  index,
}: {
  icon: typeof Zap;
  stat: number;
  label: string;
  sublabel: string;
  bullets: string[];
  painPoint: string;
  solutions: string[];
  relatedPainPoint?: string;
  index: number;
}) {
  const { count, ref: counterRef } = useAnimatedCounter(stat, 2000);
  const { ref: barRef, isInView: barVisible } = useInView({ once: false, threshold: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      {/* Stat side */}
      <ScrollReveal
        direction={isEven ? "left" : "right"}
        distance={60}
        duration={0.9}
        className={isEven ? "" : "lg:order-2"}
      >
        <div ref={counterRef}>
          {/* Big label */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-11 h-11 rounded-xl bg-evios/10 flex items-center justify-center"
              style={{
                boxShadow: "0 0 15px rgba(var(--color-evios-rgb),0.15)",
              }}
            >
              <Icon className="w-5 h-5 text-evios" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-evios">
              {label}
            </h3>
          </div>

          {/* Giant number */}
          <div className="mb-4">
            <span
              className="text-8xl sm:text-9xl font-extrabold tracking-tighter leading-none"
              style={{
                animation: "number-glow 4s ease-in-out infinite",
              }}
            >
              {count}
            </span>
            <span
              className="text-6xl sm:text-7xl font-extrabold text-evios tracking-tighter"
              style={{
                textShadow: "0 0 40px rgba(var(--color-evios-rgb),0.35)",
              }}
            >
              %
            </span>
          </div>

          {/* Sublabel */}
          <p className="text-text-secondary font-semibold text-xl mb-5">
            {sublabel}
          </p>

          {/* Progress bar visualization */}
          <div ref={barRef} className="mb-6">
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-evios to-evios-light"
                style={{
                  width: barVisible ? `${stat}%` : "0%",
                  transition: "width 2s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              />
            </div>
          </div>

          {/* Bullets */}
          <div className="space-y-2">
            {bullets.map((b) => (
              <p key={b} className="text-text-muted text-sm leading-relaxed">
                {b}
              </p>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Solutions side */}
      <ScrollReveal
        direction={isEven ? "right" : "left"}
        distance={60}
        delay={0.2}
        duration={0.9}
        className={isEven ? "" : "lg:order-1"}
      >
        <div className="p-7 rounded-2xl bg-bg-card border border-border glow-blue">
          {/* Pain point */}
          <div className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-red/5 border border-red/10">
            <AlertCircle className="w-5 h-5 text-red mt-0.5 shrink-0" />
            <p className="text-red text-sm font-semibold">{painPoint}</p>
          </div>

          {/* Prospect's own pain point woven in */}
          {relatedPainPoint && (
            <div className="mb-6 pl-5 border-l-2 border-evios/40">
              <p className="text-text-secondary text-sm italic leading-relaxed">
                {relatedPainPoint}
              </p>
            </div>
          )}

          {/* Solutions with stagger */}
          <p className="text-text-muted text-xs tracking-[0.15em] uppercase font-medium mb-4">
            Our Solutions
          </p>
          <div className="space-y-3">
            {solutions.map((s, si) => (
              <ScrollReveal key={s} delay={0.4 + si * 0.1} direction="up" distance={16}>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green/5 border border-green/10 transition-all duration-300 hover:bg-green/8 hover:border-green/20">
                  <Check className="w-4 h-4 text-green shrink-0" strokeWidth={2.5} />
                  <span className="text-text-secondary text-sm font-medium">{s}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

const pillars = [
  {
    icon: Zap,
    stat: 78,
    label: "Speed to Lead",
    sublabel: "The \u201CFirst-In\u201D Factor",
    bullets: [
      "78% of customers buy from the first responder.",
      "21x higher conversion if you respond in under 5 minutes.",
    ],
    painPoint: "If the competitor is faster \u2014 they win",
    solutions: [
      "AI Voice Agents",
      "Lead Control Tower & Instant Response",
      "Search Engine Optimization",
    ],
    matchPainKeywords: ["lead response", "response time", "slow", "faster"],
  },
  {
    icon: TrendingUp,
    stat: 80,
    label: "Conversion Rate",
    sublabel: "The Persistence Gap",
    bullets: [
      "80% of sales require 5+ touchpoints to close.",
      "44% of businesses quit after only one attempt.",
    ],
    painPoint: "No follow-ups \u2014 no sales",
    solutions: [
      "Follow-up Automations",
      "Instant Quoting",
      "AI-Optimized Pricing Strategy",
    ],
    matchPainKeywords: ["follow-up", "follow up", "quoting", "pricing"],
  },
  {
    icon: Star,
    stat: 57,
    label: "Reputation",
    sublabel: "The Trust Barrier",
    bullets: [
      "57% of clients only choose businesses with 4+ stars.",
      "73% only trust reviews from the last month.",
    ],
    painPoint: "No reviews \u2014 low rating \u2014 no customers",
    solutions: [
      "Referral Optimizer",
      "Sentiment-Based Routing",
      "Search Engine Optimization",
    ],
    matchPainKeywords: ["review", "rating", "star", "reputation"],
  },
];

interface Props {
  prospect: ProspectConfig;
}

export default function StatsSection({ prospect }: Props) {
  const prospectPains = prospect.painPoints || [];

  return (
    <section id="insights" className="py-24 lg:py-32 bg-bg-elevated relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-evios text-xs tracking-[0.3em] uppercase font-medium mb-3">
            The Numbers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Why This Matters
          </h2>
        </ScrollReveal>

        <div className="space-y-20 lg:space-y-28">
          {pillars.map((pillar, i) => {
            const relatedPain = prospectPains.find((pain) =>
              pillar.matchPainKeywords.some((kw) =>
                pain.toLowerCase().includes(kw)
              )
            );

            return (
              <StatBlock
                key={pillar.label}
                icon={pillar.icon}
                stat={pillar.stat}
                label={pillar.label}
                sublabel={pillar.sublabel}
                bullets={pillar.bullets}
                painPoint={pillar.painPoint}
                solutions={pillar.solutions}
                relatedPainPoint={
                  relatedPain
                    ? `From your business: \u201C${relatedPain}\u201D`
                    : undefined
                }
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
