"use client";

import { useInView } from "@/hooks/useInView";
import { ReactNode, CSSProperties } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  distance?: number;
}

const offsets: Record<Direction, CSSProperties> = {
  up: { transform: "translateY(32px)" },
  down: { transform: "translateY(-32px)" },
  left: { transform: "translateX(-32px)" },
  right: { transform: "translateX(32px)" },
  none: { transform: "none" },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  distance,
}: ScrollRevealProps) {
  const { ref, isInView } = useInView();

  const hidden = distance
    ? direction === "left"
      ? { transform: `translateX(-${distance}px)` }
      : direction === "right"
        ? { transform: `translateX(${distance}px)` }
        : direction === "down"
          ? { transform: `translateY(-${distance}px)` }
          : { transform: `translateY(${distance}px)` }
    : offsets[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : hidden.transform,
        transition: `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
