import { Box, Typography, Button } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import type { ReactNode } from 'react';
import { MyTermsChip } from './MyTermsChip';

interface SelectiveDisclosurePanelProps {
  org: string;
  /** What the org is asking to verify. */
  ask: ReactNode;
  willShare: string[];
  wontShare: string[];
  /** Present-credential button label. */
  cta?: string;
  onPresent?: () => void;
}

const Row = ({ ok, children }: { ok: boolean; children: ReactNode }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {ok ? (
      <Check sx={{ fontSize: 16, color: 'success.main' }} />
    ) : (
      <Close sx={{ fontSize: 16, color: 'error.main' }} />
    )}
    <Typography variant="body2" color={ok ? 'text.primary' : 'text.secondary'}>
      {children}
    </Typography>
  </Box>
);

const Label = ({ children }: { children: ReactNode }) => (
  <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.05em', color: 'text.secondary', display: 'block', mt: 1, mb: 0.5 }}>
    {children}
  </Typography>
);

/** Phone panel: what a credential presentation will and won't disclose, plus terms. */
export const SelectiveDisclosurePanel = ({
  org,
  ask,
  willShare,
  wontShare,
  cta = 'Present credential',
  onPresent,
}: SelectiveDisclosurePanelProps) => (
  <Box sx={{ p: 1.5, height: '100%', overflow: 'auto' }}>
    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0066CC', letterSpacing: '0.04em' }}>
      {org.toUpperCase()} IS ASKING TO VERIFY
    </Typography>
    <Typography variant="body2" sx={{ mt: 0.75, mb: 1 }}>
      {ask}
    </Typography>

    <Label>WILL SHARE</Label>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {willShare.map((s) => <Row key={s} ok>{s}</Row>)}
    </Box>

    <Label>WON'T SHARE</Label>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {wontShare.map((s) => <Row key={s} ok={false}>{s}</Row>)}
    </Box>

    <Label>TERMS OF THIS EXCHANGE</Label>
    <MyTermsChip compact />

    <Button
      fullWidth
      variant="contained"
      onClick={onPresent}
      sx={{ mt: 1.5, textTransform: 'none', fontWeight: 700, bgcolor: '#0066CC', '&:hover': { bgcolor: '#0055AA' } }}
    >
      {cta}
    </Button>
  </Box>
);
