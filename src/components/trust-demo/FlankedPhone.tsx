import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

const LABEL = {
  ux: { text: 'UX', color: '#0066CC' },
  backend: { text: 'BACKEND', color: '#660000' },
} as const;

const Flank = ({
  kind,
  align,
  children,
}: {
  kind: 'ux' | 'backend';
  align: object | string;
  children: ReactNode;
}) => (
  <Box sx={{ textAlign: align }}>
    <Typography
      component="div"
      sx={{
        color: LABEL[kind].color,
        fontWeight: 700,
        fontSize: '0.6rem',
        letterSpacing: '0.08em',
        mb: 0.75,
      }}
    >
      {LABEL[kind].text}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
      {children}
    </Typography>
  </Box>
);

/**
 * A centered phone (or other mock) flanked by general UX / Backend annotations
 * — plain text, no boxes, no connector lines (the annotations describe the
 * screen as a whole). On narrow widths it stacks: phone, then UX, then Backend.
 * Stays within the section's content width so the left UX column lines up with
 * the section prose.
 */
export const FlankedPhone = ({
  ux,
  backend,
  children,
}: {
  ux: ReactNode;
  backend: ReactNode;
  children: ReactNode;
}) => (
  <Box
    sx={{
      width: '100%',
      display: 'grid',
      alignItems: 'center',
      gap: { xs: 3, md: 3 },
      gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
      my: 2,
    }}
  >
    <Box sx={{ order: { xs: 2, md: 1 } }}>
      <Flank kind="ux" align={{ xs: 'left', md: 'right' }}>
        {ux}
      </Flank>
    </Box>
    <Box sx={{ order: { xs: 1, md: 2 }, justifySelf: 'center' }}>{children}</Box>
    <Box sx={{ order: 3 }}>
      <Flank kind="backend" align="left">
        {backend}
      </Flank>
    </Box>
  </Box>
);
