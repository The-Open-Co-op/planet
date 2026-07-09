import { Box, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import type { ReactNode } from 'react';

/**
 * Renders content as a mobile *website* inside a PhoneFrame — a branded header
 * at the top and a Safari-style URL bar at the bottom — so a join/checkout page
 * reads as a real website the user has navigated to, not an app screen.
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
  /** Logo tile colour. */
  accent?: string;
  /** Optional logo glyph (defaults to the site initial). */
  logo?: ReactNode;
  children: ReactNode;
}) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
    {/* Site header / logo */}
    <Box
      sx={{
        px: 2,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 26,
          height: 26,
          borderRadius: '7px',
          bgcolor: accent,
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
      <Typography sx={{ fontWeight: 800, fontSize: '0.9rem' }} noWrap>
        {siteName}
      </Typography>
    </Box>

    {/* Page content */}
    <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {children}
    </Box>

    {/* Safari-style bottom URL bar */}
    <Box sx={{ px: 1.5, py: 1, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'grey.50', flexShrink: 0 }}>
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
