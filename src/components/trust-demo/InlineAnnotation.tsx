import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export type AnnotationKind = 'ux' | 'backend';

const STYLES: Record<AnnotationKind, { label: string; color: string; bg: string }> = {
  ux: { label: 'UX', color: '#0066CC', bg: 'rgba(0,102,204,0.06)' },
  backend: { label: 'BACKEND', color: '#660000', bg: 'rgba(102,0,0,0.06)' },
};

interface InlineAnnotationProps {
  kind: AnnotationKind;
  children: ReactNode;
}

/**
 * A UX or BACKEND annotation rendered inline *below* a device mock (the
 * scroll-page evolution of the flanking left/right annotations used in the
 * stepped demos). Stacks cleanly on any width — no clipping.
 */
export const InlineAnnotation = ({ kind, children }: InlineAnnotationProps) => {
  const s = STYLES[kind];
  return (
    <Box
      sx={{
        p: 1.75,
        borderRadius: 2,
        bgcolor: s.bg,
        border: '1px solid',
        borderColor: `${s.color}22`,
      }}
    >
      <Typography
        component="div"
        sx={{
          color: s.color,
          fontWeight: 700,
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          mb: 0.75,
        }}
      >
        {s.label}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.55 }}>
        {children}
      </Typography>
    </Box>
  );
};

/** Convenience wrapper: a responsive UX + BACKEND pair under a mock. */
export const AnnotationPair = ({
  ux,
  backend,
}: {
  ux: ReactNode;
  backend: ReactNode;
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      gap: 1.5,
      width: '100%',
      mt: 3,
    }}
  >
    <InlineAnnotation kind="ux">{ux}</InlineAnnotation>
    <InlineAnnotation kind="backend">{backend}</InlineAnnotation>
  </Box>
);
