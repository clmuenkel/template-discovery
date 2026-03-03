"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import basePath from "@/lib/basePath";

interface AggieEasterEggProps {
  keyword?: string;
  logoUrl?: string;
  message?: string;
}

export default function AggieEasterEgg({
  keyword,
  logoUrl,
  message = "Whoop! Gig 'em, Kristin.",
}: AggieEasterEggProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const bufferRef = useRef("");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const normalizedKeyword = useMemo(
    () => (keyword || "").trim().toLowerCase(),
    [keyword]
  );

  useEffect(() => {
    if (!normalizedKeyword || !logoUrl) return;

    function clearResetTimer() {
      if (!resetTimerRef.current) return;
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    function scheduleReset() {
      clearResetTimer();
      resetTimerRef.current = setTimeout(() => {
        bufferRef.current = "";
      }, 1500);
    }

    function dismiss() {
      setIsActive(false);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setIsVisible(false), 240);
    }

    function trigger() {
      setIsVisible(true);
      requestAnimationFrame(() => setIsActive(true));
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => dismiss(), 2500);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key.length !== 1) return;

      const nextBuffer = (bufferRef.current + event.key.toLowerCase()).slice(
        -normalizedKeyword.length
      );
      bufferRef.current = nextBuffer;
      scheduleReset();

      if (nextBuffer === normalizedKeyword) {
        bufferRef.current = "";
        clearResetTimer();
        trigger();
      } else if (
        normalizedKeyword.startsWith(nextBuffer) === false &&
        nextBuffer.length > 1
      ) {
        bufferRef.current = event.key.toLowerCase();
      }
    }

    function onPointerDown() {
      if (!isVisible) return;
      dismiss();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      clearResetTimer();
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isVisible, logoUrl, normalizedKeyword]);

  if (!logoUrl || !normalizedKeyword || !isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      aria-hidden
      style={{
        background: isActive
          ? "radial-gradient(circle at center, rgba(80,0,0,0.22) 0%, rgba(80,0,0,0.12) 40%, rgba(0,0,0,0.35) 100%)"
          : "radial-gradient(circle at center, rgba(80,0,0,0.08) 0%, rgba(0,0,0,0.18) 100%)",
        opacity: isActive ? 1 : 0,
        transition: "opacity 220ms ease",
        pointerEvents: "none",
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: isActive ? "scale(1)" : "scale(0.96)",
          transition: "transform 260ms ease",
        }}
      >
        <Image
          src={`${basePath}${logoUrl}`}
          alt=""
          width={420}
          height={420}
          className="w-[260px] sm:w-[360px] h-auto select-none"
          style={{ opacity: 0.6, filter: "drop-shadow(0 0 24px rgba(80,0,0,0.35))" }}
          aria-hidden
        />
      </div>
      <p
        className="relative z-10 text-center text-2xl sm:text-4xl font-semibold tracking-tight"
        style={{
          color: "rgba(255,255,255,0.94)",
          textShadow: "0 0 18px rgba(80,0,0,0.6)",
          transform: isActive ? "scale(1)" : "scale(0.95)",
          transition: "transform 240ms ease",
        }}
      >
        {message}
      </p>
    </div>
  );
}
