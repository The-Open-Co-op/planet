import { Box, Typography, Link } from '@mui/material';
import { DescriptionOutlined } from '@mui/icons-material';
import { LINKS } from './trustDemoData';

/**
 * The MyTerms SD-BASE data-exchange terms chip (IEEE 7012-2025). Shown wherever
 * a credential is presented — both sides hold a machine-readable agreement.
 */
export const MyTermsChip = ({ compact = false }: { compact?: boolean }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 1,
      p: 1.25,
      borderRadius: 1.5,
      bgcolor: 'action.hover',
    }}
  >
    <DescriptionOutlined sx={{ fontSize: 18, color: 'text.secondary', mt: '1px' }} />
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', color: 'text.primary' }}>
        SD-BASE — Standard service relationship
      </Typography>
      {!compact && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          Data minimisation · Purpose limitation · Reciprocity · No tracking
        </Typography>
      )}
      <Link
        href={LINKS.myTermsSdBase}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#0066CC' }}
      >
        Powered by MyTerms ↗
      </Link>
    </Box>
  </Box>
);
