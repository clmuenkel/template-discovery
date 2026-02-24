"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ProspectConfig } from "@/config/types";
import StatsSection from "./StatsSection";

interface Props {
  prospect: ProspectConfig;
}

export default function Appendix({ prospect }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section id="appendix" className="pb-16 lg:pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full rounded-2xl border px-5 py-4 flex items-center justify-between transition-colors"
          style={{
            background: "var(--color-bg-card)",
            borderColor: open ? "rgba(var(--color-evios-rgb),0.35)" : "var(--color-border)",
          }}
        >
          <span className="text-sm sm:text-base font-semibold text-text">
            Appendix: The Numbers
          </span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-evios" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </button>

        <div
          className="overflow-hidden transition-all duration-400"
          style={{
            maxHeight: open ? "4000px" : "0px",
            opacity: open ? 1 : 0,
          }}
        >
          <div className="pt-6">
            <StatsSection prospect={prospect} />
          </div>
        </div>
      </div>
    </section>
  );
}
