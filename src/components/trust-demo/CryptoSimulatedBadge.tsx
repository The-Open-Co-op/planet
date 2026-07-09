import { Box, Typography, Link } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { CRYPTO_SIMULATED_NOTE, LINKS } from './trustDemoData';

/** Persistent, low-key reminder that signatures are simulated in the demo. */
export const CryptoSimulatedBadge = ({ compact = false }: { compact?: boolean }) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0.75,
      px: 1.25,
      py: 0.5,
      borderRadius: 1.5,
      bgcolor: 'action.hover',
      color: 'text.secondary',
    }}
  >
    <LockOutlined sx={{ fontSize: 14 }} />
    <Typography variant="caption" sx={{ lineHeight: 1.4 }}>
      {compact ? 'Signatures simulated' : CRYPTO_SIMULATED_NOTE}{' '}
      <Link
        href={LINKS.w3cVc}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{ color: 'inherit', fontWeight: 600 }}
      >
        Learn more →
      </Link>
    </Typography>
  </Box>
);
