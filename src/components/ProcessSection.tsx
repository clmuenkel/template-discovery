"use client";

import { useState } from "react";
import { Search, Wrench, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Search,
    id: "01",
    badge: "FREE",
    title: "We audit your business",
    description:
      "We walk through how your jobs come in, where you're losing time and money, and map a plan.",
    points: [
      "Takes about 30 minutes on a call",
      "You get a clear plan of what we'd build",
      "No commitment, no charge",
    ],
  },
  {
    icon: Wrench,
    id: "02",
    badge: "FREE BUILD + 1 MONTH TEST",
    title: "We build it and you test it",
    description:
      "We build your custom software for free, then you run it in your real business for a full month at no cost.",
    points: [
      "Built around your current tools",
      "After the month, we discuss pricing only if you want to keep it",
      "Keep it only if it works for your team",
    ],
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="process" className="py-24 lg:py-32 bg-bg-elevated relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-evios text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Two steps. Zero risk.
          </h2>
          <p className="mt-3 text-text-secondary max-w-lg mx-auto">
            Free discovery. Free build. You only pay when it works.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            const isActive = activeStep === i;

            return (
              <ScrollReveal key={step.id} delay={i * 0.1}>
                <article
                  className="h-full rounded-2xl border p-7 lg:p-8 transition-all duration-300"
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                  onFocus={() => setActiveStep(i)}
                  onBlur={() => setActiveStep(null)}
                  style={{
                    background: "var(--color-bg-card)",
                    borderColor: isActive ? "rgba(var(--color-evios-rgb),0.35)" : "var(--color-border)",
                    boxShadow: isActive
                      ? "0 18px 36px rgba(var(--color-evios-rgb),0.16)"
                      : "0 8px 24px rgba(15, 23, 42, 0.06)",
                    transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  }}
                  tabIndex={0}
                >
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(var(--color-evios-rgb),0.1)",
                        color: "var(--color-evios)",
                      }}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <span
                      className="text-[10px] font-bold rounded-full px-3 py-1 tracking-wide uppercase"
                      style={{
                        background: "var(--color-evios-light)",
                        color: "var(--color-evios-dark)",
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight mb-3 text-text">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>

                  <div
                    className="overflow-hidden transition-all duration-400 ease-out"
                    style={{
                      maxHeight: isActive ? "220px" : "0px",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="pt-5 mt-5 border-t border-border space-y-2.5">
                      {step.points.map((point, pointIdx) => (
                        <div
                          key={point}
                          className="flex items-start gap-2.5 text-sm transition-all duration-300"
                          style={{
                            transitionDelay: `${pointIdx * 60}ms`,
                            transform: isActive ? "translateY(0)" : "translateY(8px)",
                            opacity: isActive ? 1 : 0,
                          }}
                        >
                          <Check className="w-4 h-4 text-evios mt-0.5 shrink-0" />
                          <span className="text-text-secondary">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
