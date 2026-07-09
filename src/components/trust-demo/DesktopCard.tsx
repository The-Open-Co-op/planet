import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

/**
 * The organisation's "laptop" view — shown sequenced AFTER the phone action.
 * A large browser/desktop screen with a coloured header keyed to the org's
 * accent and a lightly tinted page, so it reads as that org's own site. The
 * result copy is a neat block centred both vertically and horizontally.
 */
export const DesktopCard = ({
  org,
  accent = '#475569',
  children,
}: {
  org: string;
  accent?: string;
  children: ReactNode;
}) => (
  <Box
    sx={{
      // Break out wider than the prose column so it reads as a full laptop screen.
      width: 'min(1040px, 94vw)',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
      my: 3,
    }}
  >
    <Box
      sx={{
        width: '100%',
        minHeight: 440,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: `${accent}12`,
        boxShadow: 4,
        overflow: 'hidden',
      }}
    >
      {/* Coloured window chrome */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.25,
          bgcolor: accent,
          color: '#fff',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.45)' }} />
          ))}
        </Box>
        <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, ml: 1 }}>
          {org} — admin
        </Typography>
      </Box>

      {/* Body — result copy centred vertically and horizontally */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 5 } }}>
        <Box sx={{ width: '100%', maxWidth: 560 }}>{children}</Box>
      </Box>
    </Box>
  </Box>
);
