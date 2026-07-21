'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

export const SPRING = 'cubic-bezier(.34,1.56,.64,1)';

/**
 * Scroll-reveal system: sections register a named ref, an IntersectionObserver
 * marks them "seen", and a fallback timer reveals everything in case the
 * observer never fires. Reduced-motion users get everything revealed at once.
 */
export function useReveal(allNames: string[], fallbackMs = 2400) {
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const io = useRef<IntersectionObserver | null>(null);
  const refs = useRef<Record<string, (el: HTMLElement | null) => void>>({});

  const revealAll = useCallback(() => {
    setSeen(s => {
      const next = { ...s };
      for (const n of allNames) next[n] = true;
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refFor = useCallback((name: string) => {
    if (!refs.current[name]) {
      refs.current[name] = (el: HTMLElement | null) => {
        if (!el) return;
        el.dataset.reveal = name;
        if (!io.current) {
          io.current = new IntersectionObserver(
            entries => {
              setSeen(s => {
                let changed = false;
                const next = { ...s };
                for (const e of entries) {
                  const n = (e.target as HTMLElement).dataset.reveal;
                  if (e.isIntersecting && n && !next[n]) {
                    next[n] = true;
                    changed = true;
                  }
                }
                return changed ? next : s;
              });
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
          );
        }
        io.current.observe(el);
      };
    }
    return refs.current[name];
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return;
    }
    const t = setTimeout(revealAll, fallbackMs);
    return () => {
      clearTimeout(t);
      io.current?.disconnect();
    };
  }, [fallbackMs, revealAll]);

  return { seen, refFor };
}

export function reveal(on: boolean, dy = 44): CSSProperties {
  return {
    opacity: on ? 1 : 0,
    transform: on ? 'none' : `translateY(${dy}px) scale(.96)`,
    transition: `opacity .7s ease, transform .85s ${SPRING}`
  };
}

export function revealX(on: boolean, dx: number): CSSProperties {
  return {
    opacity: on ? 1 : 0,
    transform: on ? 'none' : `translateX(${dx}px) scale(.97)`,
    transition: `opacity .8s ease, transform .9s ${SPRING}`
  };
}

export function revealUp(on: boolean, dy = 30): CSSProperties {
  return {
    opacity: on ? 1 : 0,
    transform: on ? 'none' : `translateY(${dy}px)`,
    transition: `opacity .7s ease, transform .8s ${SPRING}`
  };
}

export function stagger(on: boolean, i: number, dy = 16): CSSProperties {
  const delay = (0.12 + i * 0.09).toFixed(2);
  return {
    opacity: on ? 1 : 0,
    transform: on ? 'none' : `translateY(${dy}px)`,
    transition: `opacity .5s ease ${delay}s, transform .55s ${SPRING} ${delay}s`
  };
}

export function note(on: boolean, i: number, rot: number): CSSProperties {
  const delay = (0.25 + i * 0.12).toFixed(2);
  return {
    opacity: on ? 1 : 0,
    transform: on ? `translateY(0) rotate(${rot}deg)` : `translateY(16px) rotate(${rot}deg)`,
    transition: `opacity .5s ease ${delay}s, transform .5s ${SPRING} ${delay}s`
  };
}

export function postit(on: boolean, i: number, rot: number): CSSProperties {
  const delay = (0.15 + i * 0.13).toFixed(2);
  return {
    opacity: on ? 1 : 0,
    transform: on ? `translateY(0) rotate(${rot}deg)` : `translateY(50px) rotate(${rot}deg)`,
    animation: on ? `yarnSway ${(4 + i * 0.4).toFixed(1)}s ease-in-out ${(0.6 + i * 0.2).toFixed(1)}s infinite` : undefined,
    transition: `opacity .55s ease ${delay}s, transform .55s ${SPRING} ${delay}s`
  };
}

export function doodle(on: boolean, delay: number): CSSProperties {
  return { opacity: on ? 1 : 0, transition: `opacity .6s ease ${delay}s` };
}
