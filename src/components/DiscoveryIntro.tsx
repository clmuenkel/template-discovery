"use client";

import ScrollReveal from "./ScrollReveal";

interface Props {
  companyName: string;
  contactFirstName: string;
  callNotes?: string;
  easterEgg?: string;
}

export default function DiscoveryIntro({
  companyName,
  contactFirstName,
  callNotes,
  easterEgg,
}: Props) {
  const isPersonalized = companyName !== "Your Company";

  return (
    <section
      id="discovery"
      className="py-28 lg:py-36 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--color-bg) 0%, rgba(var(--color-evios-rgb),0.03) 50%, var(--color-bg-elevated) 100%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 relative z-10 text-center">
        <ScrollReveal>
          <p className="text-evios text-xs tracking-[0.3em] uppercase font-medium mb-6">
            Your Turn
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {isPersonalized ? (
              <>
                Now let&apos;s focus on{" "}
                <span
                  className="text-evios"
                  style={{
                    textShadow: "0 0 30px rgba(var(--color-evios-rgb),0.2)",
                  }}
                >
                  {companyName}
                </span>
              </>
            ) : (
              "Now let\u2019s focus on your business"
            )}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div
            className="w-16 h-px mx-auto mt-8 mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(var(--color-evios-rgb),0.5), transparent)",
            }}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {isPersonalized
              ? `Walk us through how ${companyName} operates today, ${contactFirstName}. We\u2019ll capture everything here.`
              : "Walk us through how your business operates today. We\u2019ll capture everything here."}
          </p>
        </ScrollReveal>

        {callNotes && (
          <ScrollReveal delay={0.4}>
            <div
              className="mt-10 rounded-xl p-5 text-left max-w-lg mx-auto"
              style={{
                background: "var(--color-surface2)",
                border: "1px solid var(--color-border)",
              }}
            >
              <p className="text-evios text-[10px] tracking-[0.2em] uppercase font-bold mb-2">
                Pre-call notes
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {callNotes}
              </p>
            </div>
          </ScrollReveal>
        )}

        {easterEgg && (
          <ScrollReveal delay={0.5}>
            <p className="mt-6 text-text-muted text-xs italic opacity-60">
              {easterEgg}
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
