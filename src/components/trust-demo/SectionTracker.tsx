import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import type { ReactNode } from 'react';
import { Box } from '@mui/material';

/**
 * Tracks which demo section is currently in view and reports it to the parent
 * frame (planet-site) via the same `demo-step-change` postMessage the stepped
 * demos use — so the feedback panel scopes comments to the section on screen
 * instead of one giant undifferentiated list.
 */

interface SectionMeta {
  slug: string;
  title: string;
}

interface TrackerCtx {
  register: (el: Element, meta: SectionMeta) => () => void;
}

const SectionTrackerContext = createContext<TrackerCtx | null>(null);

function postStepChange(slug: string, title: string) {
  try {
    window.parent.postMessage({ type: 'demo-step-change', slug, title }, '*');
  } catch {
    /* not in an iframe — no-op */
  }
}

export const SectionTrackerProvider = ({ children }: { children: ReactNode }) => {
  const metaByEl = useRef(new Map<Element, SectionMeta>());
  const visible = useRef(new Map<Element, number>());
  const current = useRef<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const recompute = useCallback(() => {
    // Pick the most-visible section; ties break towards the top of the page.
    let best: Element | null = null;
    let bestRatio = 0;
    for (const [el, ratio] of visible.current) {
      if (ratio > bestRatio) {
        best = el;
        bestRatio = ratio;
      }
    }
    if (!best) return;
    const meta = metaByEl.current.get(best);
    if (meta && meta.slug !== current.current) {
      current.current = meta.slug;
      postStepChange(meta.slug, meta.title);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.current.set(entry.target, entry.intersectionRatio);
          } else {
            visible.current.delete(entry.target);
          }
        }
        recompute();
      },
      { threshold: [0.15, 0.35, 0.6, 0.85] },
    );
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [recompute]);

  const register = useCallback((el: Element, meta: SectionMeta) => {
    metaByEl.current.set(el, meta);
    observerRef.current?.observe(el);
    return () => {
      observerRef.current?.unobserve(el);
      metaByEl.current.delete(el);
      visible.current.delete(el);
    };
  }, []);

  return (
    <SectionTrackerContext.Provider value={{ register }}>
      {children}
    </SectionTrackerContext.Provider>
  );
};

interface SectionProps {
  /** Feedback slug — stable identifier for this section. */
  slug: string;
  /** Human-readable label shown in the feedback panel. */
  title: string;
  children: ReactNode;
  /** Optional max content width. */
  maxWidth?: number;
  /** Background band — alternate 'paper' (white) / 'default' (off-white). */
  bg?: 'paper' | 'default';
  sx?: object;
}

/** A tracked section of the scroll page. Registers itself for feedback scoping. */
export const Section = ({ slug, title, children, maxWidth = 720, bg = 'default', sx }: SectionProps) => {
  const ctx = useContext(SectionTrackerContext);
  const ref = useRef<HTMLDivElement>(null);
  const [meta] = useState<SectionMeta>({ slug, title });

  useEffect(() => {
    const el = ref.current;
    if (!el || !ctx) return;
    return ctx.register(el, meta);
  }, [ctx, meta]);

  return (
    <Box
      ref={ref}
      id={slug}
      component="section"
      sx={{
        scrollMarginTop: '24px',
        bgcolor: bg === 'paper' ? 'background.paper' : 'background.default',
        px: { xs: 3, sm: 5 },
        py: { xs: 6, sm: 9 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...sx,
      }}
    >
      <Box sx={{ width: '100%', maxWidth }}>{children}</Box>
    </Box>
  );
};
