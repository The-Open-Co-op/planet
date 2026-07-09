import { Box, Typography, Link } from '@mui/material';
import type { ReactNode } from 'react';

/** The Open Co-op blue — titles and links. */
export const OC_BLUE = '#0066CC';

export const BlueLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    underline="hover"
    sx={{ color: OC_BLUE, fontWeight: 600 }}
  >
    {children}
  </Link>
);

export const StandardLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    underline="hover"
    sx={{
      px: 1,
      py: 0.5,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      color: OC_BLUE,
      fontSize: '0.72rem',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      '&:hover': { borderColor: OC_BLUE },
    }}
  >
    {children}
  </Link>
);

/** Small uppercase label above a section heading (e.g. "Section 2 — …"). */
export const SectionEyebrow = ({ children }: { children: ReactNode }) => (
  <Typography variant="overline" sx={{ color: OC_BLUE, fontWeight: 700, display: 'block', mb: 1.5 }}>
    {children}
  </Typography>
);

/** Section heading in OC blue. */
export const SectionHeading = ({ children }: { children: ReactNode }) => (
  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: OC_BLUE }}>
    {children}
  </Typography>
);

/** Green "For communities:" value-line box (label above the copy). */
export const OrgValueLine = ({ label = 'For communities:', children }: { label?: string; children: ReactNode }) => (
  <Box
    sx={{
      mt: 3,
      p: 2,
      borderLeft: '3px solid',
      borderColor: 'success.main',
      bgcolor: 'rgba(46,125,50,0.05)',
      borderRadius: '0 8px 8px 0',
    }}
  >
    <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.dark', display: 'block', mb: 0.5, letterSpacing: '0.03em' }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.primary' }}>
      {children}
    </Typography>
  </Box>
);

/** Header row inside a PhoneFrame mock — org name + optional strapline. */
export const ScreenHeader = ({ org, strap }: { org: string; strap?: string }) => (
  <Box sx={{ px: 2, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography sx={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.06em', color: OC_BLUE }}>
      {org.toUpperCase()}
    </Typography>
    {strap && (
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
        {strap}
      </Typography>
    )}
  </Box>
);

/** Scrollable body for a phone mock. */
export const ScreenBody = ({ children }: { children: ReactNode }) => (
  <Box sx={{ p: 2, height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
    {children}
  </Box>
);
