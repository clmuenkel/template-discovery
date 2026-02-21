"use client";

import { useState } from "react";
import { Search, Code, Rocket, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    free: true,
    headline: "Understand your business inside out",
    description:
      "We deeply understand your business \u2014 workflows, pain points, and growth objectives.",
    points: [
      "In-depth overview of your existing use cases",
      "Map your business processes end-to-end",
      "Determine automation potential & prioritize opportunities",
    ],
  },
  {
    icon: Code,
    number: "02",
    title: "Develop & Test",
    free: true,
    headline: "Build it. Test it. Perfect it.",
    description:
      "We build custom solutions that plug into your tools \u2014 and you test before committing.",
    points: [
      "Custom software & automations built for you",
      "Direct integration with your current tools",
      "Test in your environment until it\u2019s right",
    ],
  },
  {
    icon: Rocket,
    number: "03",
    title: "Implement & Support",
    free: false,
    headline: "Go live with confidence",
    description:
      "Seamless rollout with hands-on onboarding and long-term support.",
    points: [
      "Seamless implementation into your environment",
      "Free onboarding & enablement with our experts",
      "Continuous support with a 1-year warranty",
    ],
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-evios text-xs tracking-[0.3em] uppercase font-medium mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Our Process
          </h2>
          <p className="mt-3 text-text-secondary max-w-md mx-auto">
            Free discovery. Free development. You only pay when it works.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-stretch">
          {/* Left: Step selector */}
          <ScrollReveal direction="left" distance={40} className="flex">
            <div className="flex lg:flex-col gap-3 w-full">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                const isPast = i < activeStep;
                const StepIcon = step.icon;

                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(i)}
                    className="relative flex items-center gap-4 rounded-xl text-left transition-all duration-400 flex-1 outline-none"
                    style={{
                      padding: "16px 20px",
                      background: isActive
                        ? "rgba(var(--color-evios-rgb),0.08)"
                        : "transparent",
                      border: `1px solid ${isActive ? "rgba(var(--color-evios-rgb),0.25)" : "rgba(22,22,37,0.5)"}`,
                      boxShadow: isActive
                        ? "0 0 25px rgba(var(--color-evios-rgb),0.1)"
                        : "none",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-400"
                      style={{
                        background: isActive
                          ? "var(--color-evios)"
                          : isPast
                            ? "rgba(var(--color-evios-rgb),0.12)"
                            : "rgba(22,22,37,1)",
                        boxShadow: isActive
                          ? "0 0 20px rgba(var(--color-evios-rgb),0.35)"
                          : "none",
                      }}
                    >
                      {isPast ? (
                        <Check className="w-5 h-5 text-evios" strokeWidth={2.5} />
                      ) : (
                        <StepIcon
                          className="w-5 h-5 transition-colors duration-400"
                          style={{
                            color: isActive ? "#fff" : "var(--color-text-muted)",
                          }}
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="font-semibold transition-colors duration-400"
                        style={{
                          fontSize: "15px",
                          color: isActive
                            ? "var(--color-text)"
                            : isPast
                              ? "var(--color-text-secondary)"
                              : "var(--color-text-muted)",
                        }}
                      >
                        {step.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p
                          className="font-mono text-xs transition-colors duration-400"
                          style={{
                            color: isActive ? "var(--color-evios)" : "var(--color-text-muted)",
                          }}
                        >
                          Step {step.number}
                        </p>
                        {step.free && (
                          <span
                            className="text-[10px] font-bold rounded-full px-2 py-0.5"
                            style={{
                              color: "var(--color-green)",
                              background: "rgba(34,197,94,0.08)",
                            }}
                          >
                            FREE
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right: Active step content */}
          <ScrollReveal direction="right" distance={40} className="flex">
            <div className="relative w-full">
              {steps.map((step, i) => {
                const isActive = activeStep === i;

                return (
                  <div
                    key={step.number}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(16px)",
                      position: isActive ? "relative" : "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      pointerEvents: isActive ? "auto" : "none",
                      transition: "opacity 0.4s ease, transform 0.4s ease",
                    }}
                  >
                    <div
                      className="rounded-2xl border p-8 lg:p-10 glow-blue"
                      style={{
                        borderColor: "rgba(var(--color-evios-rgb),0.12)",
                        background:
                          "linear-gradient(135deg, rgba(14,14,26,0.95), rgba(10,10,18,0.98))",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-evios font-mono text-sm font-bold">
                          {step.number}
                        </span>
                        {step.free && (
                          <span className="text-[11px] font-bold text-green bg-green/10 px-2.5 py-1 rounded-full border border-green/20">
                            FREE
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "none" : "translateY(8px)",
                          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s",
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="text-evios-light text-lg font-medium mb-6"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "none" : "translateY(8px)",
                          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s",
                        }}
                      >
                        {step.headline}
                      </p>

                      <div
                        className="h-px mb-6"
                        style={{
                          background: "linear-gradient(90deg, rgba(var(--color-evios-rgb),0.35), transparent)",
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                          transformOrigin: "left",
                          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s",
                        }}
                      />

                      <p
                        className="text-text-secondary mb-8"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transition: "opacity 0.4s ease 0.2s",
                        }}
                      >
                        {step.description}
                      </p>

                      <div className="space-y-3">
                        {step.points.map((point, pi) => (
                          <div
                            key={point}
                            className="flex items-start gap-3.5 p-3.5 rounded-xl"
                            style={{
                              background: isActive ? "rgba(var(--color-evios-rgb),0.04)" : "transparent",
                              borderLeft: isActive
                                ? "2px solid rgba(var(--color-evios-rgb),0.35)"
                                : "2px solid transparent",
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? "translateX(0)" : "translateX(-16px)",
                              transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${0.25 + pi * 0.08}s`,
                            }}
                          >
                            <div className="w-5 h-5 rounded-full bg-evios/15 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-evios" strokeWidth={2.5} />
                            </div>
                            <span className="text-text-secondary text-[15px]">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
