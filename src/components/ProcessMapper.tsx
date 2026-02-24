"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePersistedState } from "@/hooks/usePersistedState";
import {
  PhoneIncoming,
  Calendar,
  MapPin,
  Wrench,
  Receipt,
  UserCheck,
  Plus,
  X,
  Flag,
  MessageSquare,
  ChevronRight,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface PainPoint {
  id: string;
  text: string;
  severity: "minor" | "major";
}

interface StageState {
  notes: string;
  painPoints: PainPoint[];
}

type MapperData = Record<string, StageState>;

interface Stage {
  id: string;
  icon: LucideIcon;
  title: string;
  prompt: string;
}

const stages: Stage[] = [
  {
    id: "inbound",
    icon: PhoneIncoming,
    title: "Inbound Leads",
    prompt:
      "How do new customers find you? Phone calls, website forms, referrals, advertising?",
  },
  {
    id: "scheduling",
    icon: Calendar,
    title: "Scheduling",
    prompt:
      "How do you book and confirm appointments? What tools or software do you use?",
  },
  {
    id: "dispatch",
    icon: MapPin,
    title: "Dispatch",
    prompt: "How are technicians assigned and routed to job sites?",
  },
  {
    id: "service",
    icon: Wrench,
    title: "On-Site Service",
    prompt:
      "What does the technician workflow look like when they arrive on-site?",
  },
  {
    id: "invoicing",
    icon: Receipt,
    title: "Invoicing",
    prompt:
      "How are jobs billed? What does the payment collection process look like?",
  },
  {
    id: "followup",
    icon: UserCheck,
    title: "Follow-Up",
    prompt:
      "What happens after the job? Reviews, repeat business, maintenance plans?",
  },
];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function emptyStage(): StageState {
  return { notes: "", painPoints: [] };
}

export default function ProcessMapper({ customer }: { customer: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [data, setData, hydrated] = usePersistedState<MapperData>(customer, "mapper", {});

  const [addingPoint, setAddingPoint] = useState(false);
  const [newText, setNewText] = useState("");
  const [newSeverity, setNewSeverity] = useState<"minor" | "major">("minor");
  const inputRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const get = useCallback(
    (id: string): StageState => data[id] || emptyStage(),
    [data]
  );

  const updateNotes = (stageId: string, notes: string) => {
    setData((prev) => ({
      ...prev,
      [stageId]: { ...get(stageId), notes },
    }));
  };

  const addPainPoint = (stageId: string) => {
    if (!newText.trim()) return;
    const point: PainPoint = {
      id: uid(),
      text: newText.trim(),
      severity: newSeverity,
    };
    setData((prev) => ({
      ...prev,
      [stageId]: {
        ...get(stageId),
        painPoints: [...get(stageId).painPoints, point],
      },
    }));
    setNewText("");
    setNewSeverity("minor");
    setAddingPoint(false);
  };

  const removePainPoint = (stageId: string, pointId: string) => {
    setData((prev) => ({
      ...prev,
      [stageId]: {
        ...get(stageId),
        painPoints: get(stageId).painPoints.filter((p) => p.id !== pointId),
      },
    }));
  };

  useEffect(() => {
    setAddingPoint(false);
    setNewText("");
  }, [activeIdx]);

  useEffect(() => {
    if (addingPoint) inputRef.current?.focus();
  }, [addingPoint]);

  const autoResize = () => {
    const el = notesRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const stage = stages[activeIdx];
  const stageData = get(stage.id);
  const totalPainPoints = Object.values(data).reduce(
    (s, d) => s + d.painPoints.length,
    0
  );

  if (!hydrated) return null;

  return (
    <section id="mapper" className="py-20 lg:py-24 bg-bg-elevated relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-evios text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Process Discovery
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Let&apos;s Map Your Process
          </h2>
          <p className="mt-3 text-text-secondary max-w-lg mx-auto">
            Walk us through each stage. Flag where friction happens.
          </p>
        </ScrollReveal>

        {/* Pipeline strip */}
        <ScrollReveal className="mb-10">
          <div
            className="rounded-2xl p-4 sm:p-5"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="flex items-center justify-between gap-1">
              {stages.map((s, i) => {
                const sd = get(s.id);
                const isActive = activeIdx === i;
                const count = sd.painPoints.length;
                const hasMajor = sd.painPoints.some(
                  (p) => p.severity === "major"
                );
                const hasNotes = sd.notes.trim().length > 0;
                const hasContent = count > 0 || hasNotes;
                const Icon = s.icon;

                return (
                  <div
                    key={s.id}
                    className="flex items-center flex-shrink-0"
                  >
                    <button
                      onClick={() => setActiveIdx(i)}
                      className="relative flex flex-col items-center gap-2 rounded-xl transition-all duration-400 px-3 py-3 sm:px-4 outline-none"
                      style={{
                        background: isActive
                          ? "rgba(var(--color-evios-rgb),0.1)"
                          : "transparent",
                        boxShadow: isActive
                          ? "0 0 20px rgba(var(--color-evios-rgb),0.12)"
                          : "none",
                      }}
                    >
                      {/* Icon box with inline badge */}
                      <div className="relative">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-400"
                          style={{
                            background: isActive
                              ? "var(--color-evios)"
                              : count > 0
                                ? hasMajor
                                  ? "rgba(239,68,68,0.1)"
                                  : "rgba(245,158,11,0.1)"
                                : hasContent
                                  ? "rgba(var(--color-evios-rgb),0.08)"
                                  : "var(--color-bg-elevated)",
                            boxShadow: isActive
                              ? "0 0 15px rgba(var(--color-evios-rgb),0.4)"
                              : "none",
                          }}
                        >
                          <Icon
                            className="w-4.5 h-4.5 transition-colors duration-300"
                            style={{
                              color: isActive
                                ? "#fff"
                                : count > 0
                                  ? hasMajor
                                    ? "var(--color-red)"
                                    : "#F59E0B"
                                  : hasContent
                                    ? "var(--color-evios)"
                                    : "var(--color-text-muted)",
                            }}
                          />
                        </div>

                        {count > 0 && (
                          <div
                            className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold text-white px-1 pointer-events-none"
                            style={{
                              background: hasMajor
                                ? "var(--color-red)"
                                : "#F59E0B",
                              boxShadow: hasMajor
                                ? "0 0 8px rgba(239,68,68,0.5)"
                                : "0 0 8px rgba(245,158,11,0.5)",
                            }}
                          >
                            {count}
                          </div>
                        )}
                      </div>

                      <span
                        className="text-[10px] sm:text-[11px] font-medium text-center transition-colors duration-300 leading-tight whitespace-nowrap"
                        style={{
                          color: isActive
                            ? "var(--color-text)"
                            : "var(--color-text-muted)",
                        }}
                      >
                        {s.title}
                      </span>

                      {isActive && (
                        <div
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                          style={{
                            background: "var(--color-evios)",
                            boxShadow: "0 0 8px rgba(var(--color-evios-rgb),0.5)",
                          }}
                        />
                      )}
                    </button>

                    {i < stages.length - 1 && (
                      <ChevronRight
                        className="w-3.5 h-3.5 mx-0.5 sm:mx-1 flex-shrink-0"
                        style={{
                          color:
                            i < activeIdx
                              ? "rgba(var(--color-evios-rgb),0.35)"
                              : "var(--color-border)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Detail panel */}
        <div className="relative">
          {stages.map((s, i) => {
            const isActive = activeIdx === i;
            const sd = get(s.id);
            const Icon = s.icon;

            return (
              <div
                key={s.id}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(20px)",
                  position: isActive ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  pointerEvents: isActive ? "auto" : "none",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                <div
                  className="rounded-2xl border overflow-hidden glow-blue"
                  style={{
                    borderColor: "rgba(var(--color-evios-rgb),0.12)",
                    background: "var(--color-bg-card)",
                  }}
                >
                  {/* Stage header */}
                  <div
                    className="p-7 lg:p-9"
                    style={{
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: "rgba(var(--color-evios-rgb),0.1)",
                          boxShadow: "0 0 15px rgba(var(--color-evios-rgb),0.1)",
                        }}
                      >
                        <Icon className="w-5 h-5 text-evios" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-evios font-mono text-sm font-bold">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                            {s.title}
                          </h3>
                        </div>
                        <p className="text-text-secondary text-sm">
                          {s.prompt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Two columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
                    {/* Notes */}
                    <div className="p-7 lg:p-9">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare className="w-4 h-4 text-evios" />
                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                          Notes
                        </h4>
                      </div>
                      <textarea
                        ref={isActive ? notesRef : undefined}
                        value={sd.notes}
                        onChange={(e) => {
                          updateNotes(s.id, e.target.value);
                          autoResize();
                        }}
                        placeholder="Type notes during the call..."
                        className="w-full bg-transparent text-text text-[15px] leading-relaxed resize-none outline-none placeholder:text-text-muted/40 min-h-[140px]"
                        style={{ caretColor: "var(--color-evios)" }}
                      />
                    </div>

                    {/* Pain Points */}
                    <div className="p-7 lg:p-9">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <Flag className="w-4 h-4 text-red" />
                          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Pain Points
                          </h4>
                          {sd.painPoints.length > 0 && (
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{
                                background: "rgba(239,68,68,0.1)",
                                color: "var(--color-red)",
                              }}
                            >
                              {sd.painPoints.length}
                            </span>
                          )}
                        </div>
                        {!addingPoint && (
                          <button
                            onClick={() => setAddingPoint(true)}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                            style={{
                              color: "var(--color-evios)",
                              background: "rgba(var(--color-evios-rgb),0.08)",
                              border: "1px solid rgba(var(--color-evios-rgb),0.2)",
                            }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Flag
                          </button>
                        )}
                      </div>

                      <div className="space-y-3 mb-4">
                        {sd.painPoints.length === 0 && !addingPoint && (
                          <p className="text-text-muted text-sm py-8 text-center">
                            No pain points flagged yet
                          </p>
                        )}
                        {sd.painPoints.map((point, pi) => (
                          <div
                            key={point.id}
                            className="flex items-start gap-3 p-3.5 rounded-xl group transition-all duration-300"
                            style={{
                              background:
                                point.severity === "major"
                                  ? "rgba(239,68,68,0.06)"
                                  : "rgba(245,158,11,0.04)",
                              borderLeft: `3px solid ${
                                point.severity === "major"
                                  ? "rgba(239,68,68,0.5)"
                                  : "rgba(245,158,11,0.4)"
                              }`,
                              animation: `fade-in 0.4s ease ${pi * 0.05}s both`,
                            }}
                          >
                            <AlertTriangle
                              className="w-4 h-4 mt-0.5 shrink-0"
                              style={{
                                color:
                                  point.severity === "major"
                                    ? "var(--color-red)"
                                    : "#F59E0B",
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-text leading-relaxed">
                                {point.text}
                              </p>
                              <span
                                className="text-[10px] font-bold uppercase tracking-wider mt-1 inline-block"
                                style={{
                                  color:
                                    point.severity === "major"
                                      ? "var(--color-red)"
                                      : "#F59E0B",
                                }}
                              >
                                {point.severity === "major"
                                  ? "Major"
                                  : "Minor"}{" "}
                                friction
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                removePainPoint(s.id, point.id)
                              }
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/5"
                            >
                              <X className="w-3.5 h-3.5 text-text-muted" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {addingPoint && (
                        <div
                          className="rounded-xl p-4"
                          style={{
                            background: "rgba(var(--color-evios-rgb),0.04)",
                            border: "1px solid rgba(var(--color-evios-rgb),0.15)",
                            animation: "fade-in 0.3s ease",
                          }}
                        >
                          <input
                            ref={inputRef}
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") addPainPoint(s.id);
                              if (e.key === "Escape") setAddingPoint(false);
                            }}
                            placeholder="Describe the pain point..."
                            className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-muted/40 mb-3"
                            style={{ caretColor: "var(--color-evios)" }}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setNewSeverity("minor")}
                                className="text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all duration-200"
                                style={{
                                  background:
                                    newSeverity === "minor"
                                      ? "rgba(245,158,11,0.15)"
                                      : "transparent",
                                  color:
                                    newSeverity === "minor"
                                      ? "#F59E0B"
                                      : "var(--color-text-muted)",
                                  border: `1px solid ${
                                    newSeverity === "minor"
                                      ? "rgba(245,158,11,0.3)"
                                      : "transparent"
                                  }`,
                                }}
                              >
                                Minor
                              </button>
                              <button
                                onClick={() => setNewSeverity("major")}
                                className="text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all duration-200"
                                style={{
                                  background:
                                    newSeverity === "major"
                                      ? "rgba(239,68,68,0.15)"
                                      : "transparent",
                                  color:
                                    newSeverity === "major"
                                      ? "var(--color-red)"
                                      : "var(--color-text-muted)",
                                  border: `1px solid ${
                                    newSeverity === "major"
                                      ? "rgba(239,68,68,0.3)"
                                      : "transparent"
                                  }`,
                                }}
                              >
                                Major
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setAddingPoint(false)}
                                className="text-xs text-text-muted hover:text-text transition-colors px-2 py-1"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => addPainPoint(s.id)}
                                className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                                style={{
                                  background: "var(--color-evios)",
                                  color: "#fff",
                                  boxShadow: "0 0 12px rgba(var(--color-evios-rgb),0.3)",
                                  opacity: newText.trim() ? 1 : 0.4,
                                }}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary bar */}
        {totalPainPoints > 0 && (
          <ScrollReveal>
            <div
              className="mt-10 rounded-xl p-5 flex items-center justify-between"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(239,68,68,0.1)" }}
                >
                  <Flag className="w-4 h-4 text-red" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {totalPainPoints} pain point
                    {totalPainPoints !== 1 ? "s" : ""} identified
                  </p>
                  <p className="text-text-muted text-xs">
                    Across{" "}
                    {
                      Object.values(data).filter(
                        (d) => d.painPoints.length > 0
                      ).length
                    }{" "}
                    stage
                    {Object.values(data).filter(
                      (d) => d.painPoints.length > 0
                    ).length !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>
              </div>
              <p className="text-text-muted text-xs hidden sm:block">
                Saved automatically
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
