import { useState, useEffect } from 'react';
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
}

export const DemoPageShell = ({ title: _title, subtitle: _subtitle, basePath, steps }: DemoPageShellProps) => {
  const isMobile = useMediaQuery('(max-width:900px)');
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

  const visibleAnnotations = dynamicAnnotations || step.annotations;

  const bottomNav = (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      py: 1.5,
      flexShrink: 0,
      bgcolor: step.fullPage ? 'background.default' : undefined,
    }}>
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
          {typeof step.screen === 'function' ? step.screen({ goToStep, setDynamicAnnotations }) : step.screen}
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
              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
                {step.id}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {step.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                — {step.subtitle}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Phone + Annotations */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
      }}>
        <Box sx={{ position: 'relative' }}>
          <PhoneFrame key={step.slug}>
            {typeof step.screen === 'function' ? step.screen({ goToStep, setDynamicAnnotations }) : step.screen}
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
