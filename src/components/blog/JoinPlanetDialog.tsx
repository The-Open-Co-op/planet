import { Box, Typography, Button, Dialog, DialogContent } from '@mui/material';
import { Public } from '@mui/icons-material';

interface JoinPlanetDialogProps {
  open: boolean;
  onClose: () => void;
  /** Determines the title and body copy */
  reason?: 'follow' | 'comment' | 'read';
  /** Optional context displayed in the body (e.g. blogger name + hashtag) */
  followContext?: { authorName: string; hashtag?: string };
}

export const JoinPlanetDialog = ({
  open,
  onClose,
  reason = 'follow',
  followContext,
}: JoinPlanetDialogProps) => {
  const title =
    reason === 'comment'
      ? 'Join PLANET to comment'
      : reason === 'read'
      ? 'Join PLANET to read'
      : 'Join PLANET to follow';
  const body =
    reason === 'comment' ? (
      <>
        Commenting needs a PLANET account. Comments are DID-signed and tied to verified members — so join to share your thoughts.
      </>
    ) : reason === 'read' ? (
      <>
        This post is for PLANET members only. Join now to read it — and unlock every Members-Only post from blogs you follow.
      </>
    ) : followContext ? (
      <>
        Following needs a PLANET account. Join now and we'll{' '}
        <strong>set up your follow for {followContext.authorName}</strong>{' '}
        after sign-up.
      </>
    ) : (
      <>Following needs a PLANET account. Join now to get started.</>
    );

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 2, m: 2, maxWidth: 320 } }}>
      <DialogContent sx={{ p: 2.5, textAlign: 'center' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: '#0066CC',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 1.25,
          }}
        >
          <Public sx={{ fontSize: 24 }} />
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 0.5 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>
          {body}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            mb: 0.75,
            bgcolor: '#0066CC',
            '&:hover': { bgcolor: '#0052a3' },
          }}
        >
          Join The Open Co-op
        </Button>
        <Button
          fullWidth
          variant="text"
          size="small"
          onClick={onClose}
          sx={{ textTransform: 'none', fontSize: '0.72rem' }}
        >
          Maybe later
        </Button>
      </DialogContent>
    </Dialog>
  );
};
