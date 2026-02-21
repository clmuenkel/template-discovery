"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Flag, ClipboardCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Props {
  contactFirstName: string;
  slug: string;
  easterEgg?: string;
}

export default function Closing({ contactFirstName, slug, easterEgg }: Props) {
  const isPersonalized = contactFirstName !== "Valued";
  const [painCount, setPainCount] = useState(0);
  const [stageCount, setStageCount] = useState(0);
  const [fieldCount, setFieldCount] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/discovery/${slug}`);
        if (res.ok) {
          const json = await res.json();
          parseSummary(json.mapper, json.snapshot);
          return;
        }
      } catch { /* API unavailable, fall through to localStorage */ }

      try {
        const mapperRaw = localStorage.getItem("evios-mapper-" + slug);
        const snapRaw = localStorage.getItem("evios-snapshot-" + slug);
        parseSummary(
          mapperRaw ? JSON.parse(mapperRaw) : null,
          snapRaw ? JSON.parse(snapRaw) : null
        );
      } catch { /* ignore */ }
    }

    function parseSummary(mapper: Record<string, { painPoints?: { id: string }[] }> | null, snapshot: Record<string, unknown> | null) {
      if (mapper) {
        let pains = 0;
        let stages = 0;
        for (const val of Object.values(mapper)) {
          if (val.painPoints && val.painPoints.length > 0) {
            pains += val.painPoints.length;
            stages++;
          }
        }
        setPainCount(pains);
        setStageCount(stages);
      }
      if (snapshot) {
        setFieldCount(
          Object.values(snapshot).filter((v) => typeof v === "string" && (v as string).trim()).length
        );
      }
    }

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [slug]);

  const hasSummary = painCount > 0 || fieldCount > 0;

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(var(--color-evios-rgb),0.06) 0%, transparent 65%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        {/* Summary cards */}
        {hasSummary && (
          <ScrollReveal className="mb-12">
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              {painCount > 0 && (
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.15)",
                  }}
                >
                  <Flag className="w-4 h-4 text-red" />
                  <div>
                    <p className="text-sm font-semibold">{painCount} pain point{painCount !== 1 ? "s" : ""}</p>
                    <p className="text-text-muted text-[11px]">across {stageCount} stage{stageCount !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              )}
              {fieldCount > 0 && (
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{
                    background: "rgba(var(--color-evios-rgb),0.06)",
                    border: "1px solid rgba(var(--color-evios-rgb),0.15)",
                  }}
                >
                  <ClipboardCheck className="w-4 h-4 text-evios" />
                  <div>
                    <p className="text-sm font-semibold">{fieldCount} field{fieldCount !== 1 ? "s" : ""} captured</p>
                    <p className="text-text-muted text-[11px]">business snapshot</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal className="text-center">
          <p
            className="text-text-secondary text-xl font-medium mb-2"
            style={{
              textShadow: "0 0 30px rgba(var(--color-evios-rgb),0.08)",
            }}
          >
            {isPersonalized
              ? `Looking forward to our next steps, ${contactFirstName}.`
              : "Looking forward to our next steps."}
          </p>
          {hasSummary && (
            <p className="text-text-muted text-sm mt-2">
              Everything captured here is saved and ready for review.
            </p>
          )}
          <div
            className="w-16 h-px mx-auto mt-8 mb-8"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(var(--color-evios-rgb),0.5), transparent)",
            }}
          />
          {easterEgg && (
            <p className="text-text-muted text-xs italic opacity-60 mt-4">
              {easterEgg}
            </p>
          )}
          <div className="mt-4">
            <Image
              src="/evios-logo-blue.png"
              alt="EVIOS"
              width={120}
              height={34}
              className="h-7 w-auto mx-auto opacity-40"
              style={{
                filter: "drop-shadow(0 0 12px rgba(var(--color-evios-rgb),0.25))",
              }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
