import { useState } from 'react';
import { Box, Typography, Dialog, DialogContent, Button } from '@mui/material';
import { Verified, ContentCopy } from '@mui/icons-material';

interface VerifiedBadgeProps {
  agentName: string;
  signedAt?: string;
  size?: 'small' | 'medium';
}

export const VerifiedBadge = ({ agentName, signedAt, size = 'small' }: VerifiedBadgeProps) => {
  const [open, setOpen] = useState(false);
  const isSmall = size === 'small';

  return (
    <>
      <Box
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.4,
          px: 0.75,
          py: 0.2,
          borderRadius: 10,
          bgcolor: 'rgba(46,125,50,0.1)',
          color: '#2e7d32',
          cursor: 'pointer',
          '&:hover': { bgcolor: 'rgba(46,125,50,0.18)' },
        }}
      >
        <Verified sx={{ fontSize: isSmall ? 12 : 14 }} />
        <Typography sx={{ fontSize: isSmall ? '0.62rem' : '0.7rem', fontWeight: 700 }}>
          Verified
        </Typography>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { borderRadius: 2, m: 2, maxWidth: 320 } }}
      >
        <DialogContent sx={{ p: 2.5, textAlign: 'center' }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: '#2e7d32',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 1.25,
            }}
          >
            <Verified sx={{ fontSize: 28 }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 0.5 }}>
            Signature verified
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>
            Verified in your browser against the author's DID — proof this post came from them.
          </Typography>

          <Box sx={{ bgcolor: '#f5f7fa', borderRadius: 1.5, px: 1.25, py: 0.75, mb: 0.75, textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>Agent name</Typography>
              <Typography sx={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#0066CC', wordBreak: 'break-all' }}>
                {agentName}
              </Typography>
            </Box>
            <ContentCopy sx={{ fontSize: 12, color: 'text.secondary', flexShrink: 0 }} />
          </Box>

          <Box sx={{ bgcolor: '#f5f7fa', borderRadius: 1.5, px: 1.25, py: 0.75, mb: signedAt ? 0.75 : 1.5, textAlign: 'left' }}>
            <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>DID</Typography>
            <Typography sx={{ fontSize: '0.68rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              did:planet:z6Mk…f3xR
            </Typography>
          </Box>

          {signedAt && (
            <Box sx={{ bgcolor: '#f5f7fa', borderRadius: 1.5, px: 1.25, py: 0.75, mb: 1.5, textAlign: 'left' }}>
              <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>Signed at</Typography>
              <Typography sx={{ fontSize: '0.7rem' }}>
                {new Date(signedAt).toLocaleString('en-GB')}
              </Typography>
            </Box>
          )}

          <Button
            fullWidth
            variant="text"
            size="small"
            onClick={() => setOpen(false)}
            sx={{ textTransform: 'none', fontSize: '0.72rem' }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
