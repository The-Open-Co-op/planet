import { Box, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import type { ReactNode } from 'react';

/**
 * Renders content as a third-party *website* inside a PhoneFrame — a coloured
 * header bar and a lightly tinted page, so each org's site is visually distinct
 * from the others and from the white PLANET app screens.
 */
export const MobileWebScreen = ({
  url,
  siteName,
  accent = '#2e7d32',
  logo,
  children,
}: {
  /** Address shown in the bottom bar, e.g. "greensgrocery.coop/join". */
  url: string;
  siteName: string;
  /** Brand colour — drives the header bar and the page tint. */
  accent?: string;
  /** Optional logo glyph (defaults to the site initial). */
  logo?: ReactNode;
  children: ReactNode;
}) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: `${accent}14` }}>
    {/* Coloured site header */}
    <Box
      sx={{
        px: 2,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: accent,
        color: '#fff',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 26,
          height: 26,
          borderRadius: '7px',
          bgcolor: 'rgba(255,255,255,0.25)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '0.85rem',
          flexShrink: 0,
        }}
      >
        {logo ?? siteName.charAt(0)}
      </Box>
      <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }} noWrap>
        {siteName}
      </Typography>
    </Box>

    {/* Page content (transparent — shows the page tint) */}
    <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {children}
    </Box>

    {/* Safari-style bottom URL bar */}
    <Box sx={{ px: 1.5, py: 1, bgcolor: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.75,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          px: 1.5,
          py: 0.75,
        }}
      >
        <Lock sx={{ fontSize: 12, color: 'text.secondary' }} />
        <Typography variant="caption" color="text.secondary" noWrap>
          {url}
        </Typography>
      </Box>
    </Box>
  </Box>
);
