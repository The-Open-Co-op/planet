import { useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight, DesktopWindows, ArrowBack } from '@mui/icons-material';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { Annotation } from '@/components/demo/Annotation';
import type { AnnotationItem } from '@/components/demo/Annotation';

export type AnnotationWithCategory = AnnotationItem & { category: 'ui' | 'protocol' };

export interface StepHelpers {
  goToStep: (slug: string) => void;
  setDynamicAnnotations: (annotations: AnnotationWithCategory[] | null) => void;
  /**
   * Report a sub-view to the parent (feedback context) WITHOUT changing the
   * active step. Use for in-frame navigation inside a single step (e.g. the
   * Home screen's Contacts/Chat/Alerts tabs) so feedback attaches to the
   * sub-view rather than piling onto the parent step.
   */
  reportStep: (slug: string, title: string) => void;
}

export interface DemoStep {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  screen: React.ReactNode | ((helpers: StepHelpers) => React.ReactNode);
  annotations: AnnotationWithCategory[];
  /** If true, render full-page (no phone frame) */
  fullPage?: boolean;
}

interface DemoPageShellProps {
  title: string;
  subtitle: string;
  basePath: string;
  steps: DemoStep[];
  /** Extra controls for the right of the top bar (e.g. Reset, trust-layer toggle). */
  topBarExtra?: ReactNode;
  /** Extra controls pinned to the left of the bottom bar. */
  bottomBarExtra?: ReactNode;
  /** When false, 'protocol' annotations are hidden — plain English only. */
  protocolVisible?: boolean;
  /** Colour for the step number in the top bar. */
  accent?: string;
  /** Colour for the scene markers above the story text. */
  storyColor?: string;
}

export const DemoPageShell = ({
  title: _title,
  subtitle: _subtitle,
  basePath,
  steps,
  topBarExtra,
  bottomBarExtra,
  protocolVisible = true,
  accent,
  storyColor = 'text.disabled',
}: DemoPageShellProps) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { step: stepSlug } = useParams<{ step?: string }>();
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#FAFBFC',
        px: 4,
        textAlign: 'center',
        gap: 3,
      }}>
        <DesktopWindows sx={{ fontSize: 64, color: 'text.secondary' }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Best viewed on desktop
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This interactive demo requires a larger screen. Please open it on a desktop or laptop browser.
        </Typography>
      </Box>
    );
  }

  const initialIndex = stepSlug
    ? Math.max(0, steps.findIndex(s => s.slug === stepSlug))
    : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [dynamicAnnotations, setDynamicAnnotations] = useState<AnnotationWithCategory[] | null>(null);

  // Scale the phone + annotations cluster to fit narrow / small screens so the
  // side annotations never clip. 1:1 on wide screens, shrinks to fit below that.
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const hasStory = steps.some((s) => s.annotations.some((a) => a.variant === 'story'));
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    // phone (375) + two 270px annotation columns + gaps. The story column is
    // positioned in the margin beside the cluster, so it isn't part of this.
    const DESIGN_W = 950;
    const DESIGN_H = 700; // phone height (667) + breathing room
    const fit = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      setScale(Math.min(width / DESIGN_W, height / DESIGN_H, 1));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [hasStory]);

  useEffect(() => {
    if (stepSlug) {
      const idx = steps.findIndex(s => s.slug === stepSlug);
      if (idx >= 0 && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
  }, [stepSlug]);

  // Notify parent of initial step
  useEffect(() => {
    try {
      window.parent.postMessage({
        type: 'demo-step-change',
        slug: step.slug,
        title: step.title,
      }, '*');
    } catch (_) { /* not in iframe */ }
  }, []);

  const step = steps[currentIndex];

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setDynamicAnnotations(null);
    navigate(`${basePath}/${steps[index].slug}`, { replace: true });
    // Notify parent frame (planet-site) for feedback context
    try {
      window.parent.postMessage({
        type: 'demo-step-change',
        slug: steps[index].slug,
        title: steps[index].title,
      }, '*');
    } catch (_) { /* not in iframe */ }
  };
  const goBack = () => { if (currentIndex > 0) goTo(currentIndex - 1); };
  const goForward = () => { if (currentIndex < steps.length - 1) goTo(currentIndex + 1); };

  const goToStep = (slug: string) => {
    const idx = steps.findIndex(s => s.slug === slug);
    if (idx >= 0) goTo(idx);
  };

  // Report an in-frame sub-view to the parent without moving the step index.
  const reportStep = useCallback((slug: string, title: string) => {
    try {
      window.parent.postMessage({ type: 'demo-step-change', slug, title }, '*');
    } catch (_) { /* not in iframe */ }
  }, []);

  const allAnnotations = (dynamicAnnotations || step.annotations).filter(
    (a) => protocolVisible || a.category !== 'protocol'
  );
  const storyNotes = allAnnotations.filter((a) => a.variant === 'story');
  const visibleAnnotations = allAnnotations.filter((a) => a.variant !== 'story');


  const bottomNav = (
    <Box sx={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      py: 1.5,
      flexShrink: 0,
      bgcolor: step.fullPage ? 'background.default' : undefined,
    }}>
      {bottomBarExtra && (
        <Box sx={{ position: 'absolute', left: 24, display: 'flex', alignItems: 'center', gap: 1 }}>
          {bottomBarExtra}
        </Box>
      )}
      <IconButton
        onClick={goBack}
        disabled={currentIndex === 0}
        size="small"
        sx={{ border: '1px solid', borderColor: 'divider' }}
      >
        <ChevronLeft />
      </IconButton>

      <Box sx={{ display: 'flex', gap: 0.75 }}>
        {steps.map((s, i) => (
          <Box
            key={s.id}
            onClick={() => goTo(i)}
            sx={{
              width: i === currentIndex ? 20 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: i === currentIndex ? 'primary.main' : 'grey.300',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </Box>

      <IconButton
        onClick={goForward}
        disabled={currentIndex === steps.length - 1}
        size="small"
        sx={{ border: '1px solid', borderColor: 'divider' }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );

  // Full-page screens (e.g. feedback) bypass the phone frame
  if (step.fullPage) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1 }}>
          {typeof step.screen === 'function' ? step.screen({ goToStep, setDynamicAnnotations, reportStep }) : step.screen}
        </Box>
        {bottomNav}
      </Box>
    );
  }

  return (
    <Box sx={{
      height: '100vh',
      bgcolor: '#FAFBFC',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: '10px',
        flexShrink: 0,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            onClick={() => {
              try {
                if (window.self !== window.top) {
                  window.parent.postMessage({ type: 'demo-navigate', slug: '' }, '*');
                  return;
                }
              } catch (_) {}
              navigate('/demo');
            }}
            size="small"
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <ArrowBack sx={{ fontSize: 18 }} />
          </IconButton>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  px: 0.75,
                  py: 0.2,
                  borderRadius: 1,
                  color: accent || 'primary.main',
                  bgcolor: accent ? `${accent}14` : 'transparent',
                }}
              >
                {step.id}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {step.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                — {step.subtitle}
              </Typography>
            </Box>
          </Box>
        </Box>
        {topBarExtra}
      </Box>

      {/* Phone + Annotations */}
      <Box ref={stageRef} sx={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
        overflow: 'hidden',
      }}>
        {/* The story sits in the margin beside the phone, far enough out that
            it can never reach the annotation column. */}
        {hasStory && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 24,
              // half the phone + annotation cluster, scaled, plus a gutter
              right: `calc(50% + ${532 * scale + 32}px)`,
              maxWidth: 320,
              display: { xs: 'none', md: 'block' },
            }}
          >
            {storyNotes.map((note, i) => (
              <Box key={`story-${i}`} sx={{ mb: 3 }}>
                {/* A scene marker rather than a heading, so it carries place
                    and time without competing with the step title above. */}
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    color: storyColor,
                    mb: 1.25,
                  }}
                >
                  {note.title}
                </Typography>
                <Typography
                  sx={{ fontSize: '1rem', lineHeight: 1.6, color: 'text.primary', whiteSpace: 'pre-line' }}
                >
                  {note.description}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Box
          sx={{
            position: 'relative',
            flexShrink: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <PhoneFrame key={step.slug}>
            {typeof step.screen === 'function' ? step.screen({ goToStep, setDynamicAnnotations, reportStep }) : step.screen}
          </PhoneFrame>

          {visibleAnnotations.map((annotation, i) => (
            <Annotation key={`${step.id}-${i}`} annotation={annotation} category={annotation.category} />
          ))}
        </Box>
      </Box>

      {/* Bottom nav */}
      {bottomNav}
    </Box>
  );
};
