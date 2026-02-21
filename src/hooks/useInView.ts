"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit & { once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { once = true, ...observerOptions } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(element);
          }
        } else {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.15, ...observerOptions }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, observerOptions.threshold, observerOptions.rootMargin]);

  return { ref, isInView };
}
