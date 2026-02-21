"use client";

import { useState } from "react";
import {
  Users,
  HardHat,
  Monitor,
  Briefcase,
  Laptop,
  Target,
  Clock,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import { usePersistedState } from "@/hooks/usePersistedState";

type FieldType = "pills" | "dual-pills" | "chips";

interface DualPillGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  options: string[];
}

interface Field {
  id: string;
  icon: LucideIcon;
  label: string;
  subtitle: string;
  type: FieldType;
  options?: string[];
  dualGroups?: DualPillGroup[];
  allowCustom?: boolean;
  customPlaceholder?: string;
}

const fields: Field[] = [
  {
    id: "teamSize",
    icon: Users,
    label: "Team Size",
    subtitle: "How many people are on the team?",
    type: "dual-pills",
    dualGroups: [
      {
        id: "fieldWorkers",
        label: "Field / Technicians",
        icon: HardHat,
        options: ["1–3", "4–6", "7–10", "11–15", "16–25", "25+"],
      },
      {
        id: "backOffice",
        label: "Back Office / Admin",
        icon: Monitor,
        options: ["0–1", "2–3", "4–6", "7–10", "10+"],
      },
    ],
  },
  {
    id: "jobVolume",
    icon: Briefcase,
    label: "Jobs Per Week",
    subtitle: "Average weekly job volume across all techs.",
    type: "pills",
    options: ["Under 10", "10–25", "25–50", "50–100", "100+"],
  },
  {
    id: "responseTime",
    icon: Clock,
    label: "Lead Response Time",
    subtitle: "How quickly does a new lead hear back from you?",
    type: "pills",
    options: ["< 5 min", "5–30 min", "30 min–1 hr", "1–4 hrs", "4+ hrs", "Don't track"],
  },
  {
    id: "software",
    icon: Laptop,
    label: "Current Software",
    subtitle: "What tools does the team use day-to-day?",
    type: "chips",
    options: [
      "ServiceTitan",
      "Housecall Pro",
      "Jobber",
      "QuickBooks",
      "Excel",
      "Pen & Paper",
    ],
    allowCustom: true,
    customPlaceholder: "Add other...",
  },
  {
    id: "goals",
    icon: Target,
    label: "Primary Goals",
    subtitle: "What matters most in the next 6–12 months?",
    type: "chips",
    options: [
      "Grow revenue",
      "Reduce overhead",
      "Scale team",
      "Improve reviews",
      "Automate processes",
      "Faster lead response",
    ],
    allowCustom: true,
    customPlaceholder: "Add custom goal...",
  },
];

type SnapshotData = Record<string, string | string[]>;

function isFieldFilled(data: SnapshotData, field: Field): boolean {
  if (field.type === "dual-pills" && field.dualGroups) {
    return field.dualGroups.some((g) => {
      const v = data[g.id];
      return typeof v === "string" && v.trim().length > 0;
    });
  }
  const val = data[field.id];
  if (Array.isArray(val)) return val.length > 0;
  return typeof val === "string" && val.trim().length > 0;
}

export default function DiscoverySnapshot({ slug }: { slug: string }) {
  const [data, setData, hydrated] = usePersistedState<SnapshotData>(slug, "snapshot", {});
  const [step, setStep] = useState(0);
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});
  const [addingCustom, setAddingCustom] = useState<string | null>(null);

  const field = fields[step];
  const filledCount = fields.filter((f) => isFieldFilled(data, f)).length;

  const go = (delta: number) => {
    setStep((s) => Math.max(0, Math.min(fields.length - 1, s + delta)));
    setAddingCustom(null);
  };

  const selectPill = (fieldId: string, value: string) => {
    setData((prev: SnapshotData) => ({
      ...prev,
      [fieldId]: prev[fieldId] === value ? "" : value,
    }));
  };

  const toggleChip = (fieldId: string, value: string) => {
    setData((prev: SnapshotData) => {
      const current = (prev[fieldId] as string[]) || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [fieldId]: next };
    });
  };

  const addCustomChip = (fieldId: string) => {
    const text = (customInputs[fieldId] || "").trim();
    if (!text) return;
    setData((prev: SnapshotData) => {
      const current = (prev[fieldId] as string[]) || [];
      if (current.includes(text)) return prev;
      return { ...prev, [fieldId]: [...current, text] };
    });
    setCustomInputs((prev) => ({ ...prev, [fieldId]: "" }));
    setAddingCustom(null);
  };

  if (!hydrated) return null;

  const Icon = field.icon;
  const isFilled = isFieldFilled(data, field);

  return (
    <section id="snapshot" className="py-20 lg:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-2xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-evios text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Discovery
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Business Snapshot
          </h2>
        </div>

        {/* Step indicators with labels and connectors */}
        <div className="flex items-start justify-center mb-12">
          {fields.map((f, i) => {
            const filled = isFieldFilled(data, f);
            const active = i === step;
            const isLast = i === fields.length - 1;

            return (
              <div key={f.id} className="flex items-start">
                <button
                  onClick={() => setStep(i)}
                  className="flex flex-col items-center gap-2.5 outline-none group"
                  style={{ width: "80px" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400"
                    style={{
                      background: active
                        ? "rgba(var(--color-evios-rgb),0.15)"
                        : filled
                          ? "rgba(var(--color-evios-rgb),0.06)"
                          : "rgba(22,22,37,0.5)",
                      border: `1.5px solid ${
                        active
                          ? "rgba(var(--color-evios-rgb),0.5)"
                          : filled
                            ? "rgba(var(--color-evios-rgb),0.2)"
                            : "rgba(22,22,37,0.8)"
                      }`,
                      boxShadow: active
                        ? "0 0 24px rgba(var(--color-evios-rgb),0.2), inset 0 1px 0 rgba(var(--color-evios-rgb),0.1)"
                        : "none",
                      transform: active ? "scale(1.08)" : "scale(1)",
                    }}
                  >
                    {filled && !active ? (
                      <Check className="w-5 h-5 text-evios" />
                    ) : (
                      <f.icon
                        className="w-5 h-5 transition-colors duration-300"
                        style={{
                          color: active ? "var(--color-evios)" : "var(--color-text-muted)",
                        }}
                      />
                    )}
                  </div>
                  <span
                    className="text-[10px] font-medium leading-tight text-center transition-colors duration-300"
                    style={{
                      color: active
                        ? "var(--color-text)"
                        : filled
                          ? "var(--color-text-secondary)"
                          : "var(--color-text-muted)",
                    }}
                  >
                    {f.label}
                  </span>
                </button>

                {!isLast && (
                  <div
                    className="h-px mt-7 transition-all duration-500"
                    style={{
                      width: "24px",
                      background: i < step || (filled && isFieldFilled(data, fields[i + 1]))
                        ? "rgba(var(--color-evios-rgb),0.3)"
                        : "rgba(22,22,37,0.6)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div
          key={step}
          className="rounded-2xl p-7 sm:p-9 transition-colors duration-300"
          style={{
            background: isFilled
              ? "rgba(var(--color-evios-rgb),0.03)"
              : "rgba(14,14,26,0.5)",
            border: `1px solid ${isFilled ? "rgba(var(--color-evios-rgb),0.12)" : "rgba(22,22,37,0.6)"}`,
            animation: "card-enter 0.4s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {/* Field header */}
          <div className="flex items-center gap-4 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0"
              style={{
                background: isFilled
                  ? "rgba(var(--color-evios-rgb),0.12)"
                  : "rgba(22,22,37,0.8)",
                boxShadow: isFilled
                  ? "0 0 16px rgba(var(--color-evios-rgb),0.12)"
                  : "none",
              }}
            >
              <Icon
                className="w-6 h-6 transition-colors"
                style={{ color: isFilled ? "var(--color-evios)" : "var(--color-text-muted)" }}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">{field.label}</h3>
              <p className="text-text-muted text-sm">{field.subtitle}</p>
            </div>
          </div>

          <div
            className="w-full h-px my-5"
            style={{ background: "rgba(22,22,37,0.6)" }}
          />

          {/* Dual pills (team size) */}
          {field.type === "dual-pills" && field.dualGroups && (
            <div className="space-y-6">
              {field.dualGroups.map((group) => {
                const GroupIcon = group.icon;
                const selected = (data[group.id] as string) || "";
                return (
                  <div key={group.id}>
                    <div className="flex items-center gap-2 mb-3">
                      <GroupIcon className="w-3.5 h-3.5 text-text-muted" />
                      <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        {group.label}
                      </span>
                      {selected && (
                        <span className="ml-auto text-xs font-bold text-evios">{selected}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((opt) => {
                        const isSelected = selected === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => selectPill(group.id, opt)}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 active:scale-95"
                            style={{
                              background: isSelected ? "var(--color-evios)" : "rgba(22,22,37,0.6)",
                              color: isSelected ? "#fff" : "var(--color-text-secondary)",
                              border: `1px solid ${isSelected ? "var(--color-evios)" : "rgba(22,22,37,0.8)"}`,
                              boxShadow: isSelected ? "0 0 16px rgba(var(--color-evios-rgb),0.25)" : "none",
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Single pills */}
          {field.type === "pills" && (
            <div className="flex flex-wrap gap-2.5">
              {field.options?.map((opt) => {
                const selected = (data[field.id] as string) || "";
                const isSelected = selected === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => selectPill(field.id, opt)}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 active:scale-95"
                    style={{
                      background: isSelected ? "var(--color-evios)" : "rgba(22,22,37,0.6)",
                      color: isSelected ? "#fff" : "var(--color-text-secondary)",
                      border: `1px solid ${isSelected ? "var(--color-evios)" : "rgba(22,22,37,0.8)"}`,
                      boxShadow: isSelected ? "0 0 16px rgba(var(--color-evios-rgb),0.25)" : "none",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* Multi-select chips */}
          {field.type === "chips" && (
            <div className="flex flex-wrap gap-2.5">
              {field.options?.map((opt) => {
                const chips = (data[field.id] as string[]) || [];
                const isSelected = chips.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleChip(field.id, opt)}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 active:scale-95"
                    style={{
                      background: isSelected
                        ? "rgba(var(--color-evios-rgb),0.15)"
                        : "rgba(22,22,37,0.6)",
                      color: isSelected ? "var(--color-evios-light)" : "var(--color-text-secondary)",
                      border: `1px solid ${isSelected ? "rgba(var(--color-evios-rgb),0.35)" : "rgba(22,22,37,0.8)"}`,
                      boxShadow: isSelected ? "0 0 12px rgba(var(--color-evios-rgb),0.1)" : "none",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}

              {((data[field.id] as string[]) || [])
                .filter((v) => !field.options?.includes(v))
                .map((custom) => (
                  <button
                    key={custom}
                    onClick={() => toggleChip(field.id, custom)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 active:scale-95"
                    style={{
                      background: "rgba(var(--color-evios-rgb),0.15)",
                      color: "var(--color-evios-light)",
                      border: "1px solid rgba(var(--color-evios-rgb),0.35)",
                    }}
                  >
                    {custom}
                    <X className="w-3 h-3 opacity-60" />
                  </button>
                ))}

              {field.allowCustom && (
                addingCustom === field.id ? (
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(22,22,37,0.6)",
                      border: "1px solid rgba(var(--color-evios-rgb),0.25)",
                    }}
                  >
                    <input
                      autoFocus
                      type="text"
                      value={customInputs[field.id] || ""}
                      onChange={(e) =>
                        setCustomInputs((p) => ({ ...p, [field.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addCustomChip(field.id);
                        if (e.key === "Escape") setAddingCustom(null);
                      }}
                      placeholder={field.customPlaceholder}
                      className="bg-transparent text-sm text-text outline-none w-28 placeholder:text-text-muted/40"
                      style={{ caretColor: "var(--color-evios)" }}
                    />
                    <button
                      onClick={() => addCustomChip(field.id)}
                      className="text-evios hover:text-evios-light transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingCustom(field.id)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 active:scale-95"
                    style={{
                      background: "transparent",
                      color: "var(--color-text-muted)",
                      border: "1px dashed rgba(22,22,37,0.8)",
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Other
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => go(-1)}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5 active:scale-95"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs font-medium">
              {filledCount}/{fields.length}
            </span>
            <div className="w-16 h-1 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(filledCount / fields.length) * 100}%`,
                  background:
                    filledCount === fields.length
                      ? "var(--color-green)"
                      : "var(--color-evios)",
                }}
              />
            </div>
          </div>

          <button
            onClick={() => go(1)}
            disabled={step === fields.length - 1}
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed active:scale-95"
            style={{
              color: isFilled ? "var(--color-evios)" : "var(--color-text-secondary)",
              background: isFilled ? "rgba(var(--color-evios-rgb),0.08)" : "transparent",
            }}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
