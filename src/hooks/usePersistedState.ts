"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const DEBOUNCE_MS = 600;

/**
 * Persists state to the API (Neon DB) with localStorage fallback.
 * - On mount: tries GET /api/discovery/:slug, falls back to localStorage
 * - On change: debounced PUT to API, falls back to localStorage
 */
export function usePersistedState<T>(
  slug: string,
  dataType: "snapshot" | "mapper",
  initial: T
): [T, (updater: T | ((prev: T) => T)) => void, boolean] {
  const [data, setData] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const useApiRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const localKey = `evios-${dataType}-${slug}`;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/discovery/${slug}`);
        if (res.ok) {
          const json = await res.json();
          const payload = json[dataType];
          if (!cancelled && payload && Object.keys(payload).length > 0) {
            setData(payload as T);
          } else if (!cancelled) {
            const raw = localStorage.getItem(localKey);
            if (raw) setData(JSON.parse(raw) as T);
          }
        } else if (res.status === 503) {
          useApiRef.current = false;
          const raw = localStorage.getItem(localKey);
          if (!cancelled && raw) setData(JSON.parse(raw) as T);
        }
      } catch {
        useApiRef.current = false;
        try {
          const raw = localStorage.getItem(localKey);
          if (!cancelled && raw) setData(JSON.parse(raw) as T);
        } catch { /* ignore */ }
      }
      if (!cancelled) setHydrated(true);
    }

    load();
    return () => { cancelled = true; };
  }, [slug, dataType, localKey]);

  const save = useCallback(
    (payload: T) => {
      if (useApiRef.current) {
        fetch(`/api/discovery/${slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: dataType, payload }),
        }).catch(() => {
          try {
            localStorage.setItem(localKey, JSON.stringify(payload));
          } catch { /* ignore */ }
        });
      } else {
        try {
          localStorage.setItem(localKey, JSON.stringify(payload));
        } catch { /* ignore */ }
      }
    },
    [slug, dataType, localKey]
  );

  const update = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setData((prev) => {
        const next =
          typeof updater === "function"
            ? (updater as (prev: T) => T)(prev)
            : updater;

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => save(next), DEBOUNCE_MS);

        return next;
      });
    },
    [save]
  );

  return [data, update, hydrated];
}
