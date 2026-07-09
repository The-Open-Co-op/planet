import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

/**
 * The organisation's "desktop" view — shown sequenced AFTER the phone action
 * (not beside it). A light browser/desktop chrome so it reads as the org's
 * screen, without competing with the phone for horizontal space.
 */
export const DesktopCard = ({
  org,
  children,
  maxWidth = 460,
}: {
  org: string;
  children: ReactNode;
  maxWidth?: number;
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
    <Box
      sx={{
        width: '100%',
        maxWidth,
        borderRadius: 2.5,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: 3,
        overflow: 'hidden',
      }}
    >
      {/* Window chrome */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'grey.50',
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />
          ))}
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, ml: 1 }}>
          {org} — admin
        </Typography>
      </Box>
      {/* Body */}
      <Box sx={{ p: 2.5 }}>{children}</Box>
    </Box>
  </Box>
);
