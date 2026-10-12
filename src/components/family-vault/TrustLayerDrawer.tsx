import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { TRUST_LAYER, SAMPLE_DATA_NOTE } from './familyVaultData';
import type { BuildStatus } from './familyVaultData';
import { Pill } from './familyVaultKit';

/**
 * "Show the trust layer" — the only place in the demo where protocol language
 * appears. Statuses come from the Week 41 OpenVTC build report and are not
 * softened: a funder should be able to tell built from unbuilt at a glance.
 */

const STATUS_COLOR: Record<BuildStatus, string> = {
  Built: '#2E7D32',
  'Partly built': '#B45309',
  'Not built': '#B91C1C',
  'Not started': '#6B7280',
};

export const TrustLayerDrawer = ({
  open,
  onClose,
  stepSlug,
}: {
  open: boolean;
  onClose: () => void;
  stepSlug: string;
}) => {
  const rows = TRUST_LAYER.filter((r) => r.step === stepSlug || r.step === 'all');

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Box sx={{ px: 3, py: 2.5, maxHeight: '62vh', overflow: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography sx={{ fontWeight: 800 }}>What’s built</Typography>
          <IconButton size="small" onClick={onClose} aria-label="Close">
            <Close sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          What this step rests on, and how much of it exists today. Statuses come from the OpenVTC
          build report, not from aspirations.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 1.5,
          }}
        >
          {rows.map((r) => (
            <Box
              key={`${r.surface}-${r.capability}`}
              sx={{ p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.35 }}>
                {r.surface}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, mb: 1 }}>
                {r.capability}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Pill label={r.status.toUpperCase()} color={STATUS_COLOR[r.status]} filled />
                {r.note && (
                  <Typography variant="caption" color="text.secondary">
                    {r.note}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2.5 }}>
          {SAMPLE_DATA_NOTE}
        </Typography>
      </Box>
    </Drawer>
  );
};
