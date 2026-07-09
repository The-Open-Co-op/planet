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
} from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import type { DemoCredential } from './trustDemoData';
import { CREDENTIAL_ACCENT } from './trustDemoData';

/** Single demo presentation target — real, scannable QR (same for all creds). */
const DEMO_QR_VALUE = 'https://collab.open.coop/demo/planet-trust-layer';

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
          <Typography sx={{ fontWeight: 700, mb: 2 }}>
            Share {credential.type}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <QRCodeSVG value={DEMO_QR_VALUE} size={176} level="M" />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
