"use client";

import {
  Sparkles,
  Clock3,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import type { ProspectInsight } from "@/config/types";

interface Props {
  insights?: ProspectInsight[];
}

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  clock: Clock3,
  growth: TrendingUp,
};

export default function InsightSection({ insights }: Props) {
  if (!insights || insights.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="text-evios text-xs tracking-[0.3em] uppercase font-medium mb-3">
            What We Heard
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built Around Your Opportunity
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {insights.map((insight, i) => {
            const Icon = iconMap[insight.icon] || Sparkles;
            return (
              <ScrollReveal
                key={insight.title}
                delay={i * 0.12}
                direction="up"
                distance={20}
              >
                <div className="h-full rounded-2xl p-6 bg-bg-card border border-border glow-blue">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(var(--color-evios-rgb),0.1)",
                      boxShadow: "0 0 14px rgba(var(--color-evios-rgb),0.15)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-evios" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
