import { useState } from 'react';
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  ExpandMore,
  Circle,
  Share,
  Code,
  Close,
  QrCode2,
} from '@mui/icons-material';
import type { DemoCredential } from './trustDemoData';
import { CREDENTIAL_ACCENT } from './trustDemoData';

/** A deterministic QR-like block (decorative — this is a simulated demo). */
const FauxQr = ({ seed }: { seed: string }) => {
  const n = 21;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < n * n; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    cells.push((h & 1) === 1);
  }
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, n - 7) || inBox(n - 7, 0);
  };
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${n}, 1fr)`,
        width: 180,
        height: 180,
        p: 1,
        bgcolor: '#fff',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {cells.map((on, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        const filled = isFinder(r, c) ? true : on;
        return (
          <Box key={i} sx={{ aspectRatio: '1', bgcolor: filled ? '#0F1114' : 'transparent' }} />
        );
      })}
    </Box>
  );
};

interface CredentialCardProps {
  credential: DemoCredential;
}

export const CredentialCard = ({ credential }: CredentialCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const accent = CREDENTIAL_ACCENT[credential.type];

  return (
    <>
      <Box
        sx={{
          borderRadius: 2.5,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          overflow: 'hidden',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:hover': { borderColor: 'grey.300', boxShadow: 1 },
        }}
      >
        {/* Header row */}
        <Box
          onClick={() => setExpanded((e) => !e)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.75,
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              px: 1,
              py: 0.5,
              borderRadius: 1.5,
              bgcolor: `${accent}14`,
              color: accent,
              fontWeight: 800,
              fontSize: '0.7rem',
              letterSpacing: '0.04em',
            }}
          >
            {credential.type}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, lineHeight: 1.3 }} noWrap>
              {credential.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
              {credential.subtitle}
            </Typography>
          </Box>
          {credential.active && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
              <Circle sx={{ fontSize: 8, color: 'success.main' }} />
              <Typography variant="caption" color="text.secondary">
                Active
              </Typography>
            </Box>
          )}
          <ExpandMore
            sx={{
              flexShrink: 0,
              color: 'text.secondary',
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          />
        </Box>

        {/* Expanded detail */}
        <Collapse in={expanded} unmountOnExit>
          <Box sx={{ px: 1.75, pb: 1.75, pt: 0 }}>
            <Typography variant="body2" sx={{ mb: 1.5, color: 'text.primary' }}>
              {credential.detail}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              Signed by {credential.signedBy}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<Share sx={{ fontSize: 16 }} />}
                onClick={() => setShowQr(true)}
              >
                Share
              </Button>
              <Button
                size="small"
                variant="text"
                startIcon={<Code sx={{ fontSize: 16 }} />}
                onClick={() => setShowJson((s) => !s)}
              >
                {showJson ? 'Hide' : 'Raw'} JSON
              </Button>
            </Box>

            <Collapse in={showJson} unmountOnExit>
              <Box
                component="pre"
                sx={{
                  mt: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'grey.900',
                  color: 'grey.50',
                  fontSize: '0.68rem',
                  lineHeight: 1.5,
                  overflow: 'auto',
                  maxHeight: 280,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              >
                {JSON.stringify(credential.rawJson, null, 2)}
              </Box>
            </Collapse>
          </Box>
        </Collapse>
      </Box>

      {/* Share QR dialog */}
      <Dialog open={showQr} onClose={() => setShowQr(false)} maxWidth="xs">
        <DialogContent sx={{ textAlign: 'center', p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: -1 }}>
            <IconButton size="small" onClick={() => setShowQr(false)}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <FauxQr seed={credential.id} />
          </Box>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
            <QrCode2 sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 0.5 }} />
            Share {credential.type}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Scan to present “{credential.title}”. The holder selects exactly what to
            disclose — nothing is shared until they approve.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
