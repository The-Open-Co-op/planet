import { useState } from 'react';
import { Box, Typography, Button, CircularProgress, Avatar, IconButton } from '@mui/material';
import { CheckCircle, Verified, Lock, Fingerprint, ArrowBack } from '@mui/icons-material';
import { jonny, draftPost } from '@/mocks/blogDemo';

interface SignPublishScreenProps {
  onContinue?: () => void;
  onBack?: () => void;
}

type Phase = 'review' | 'signing' | 'done';

export const SignPublishScreen = ({ onContinue, onBack }: SignPublishScreenProps) => {
  const [phase, setPhase] = useState<Phase>('review');

  const handlePublish = () => {
    setPhase('signing');
    setTimeout(() => setPhase('done'), 1400);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {phase === 'review' && (
        <>
          <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={onBack}
              aria-label="Back to edit"
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <ArrowBack sx={{ fontSize: 16 }} />
            </IconButton>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Ready to publish</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                Review and sign with your DID
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1, overflow: 'auto', px: 2, pb: 1 }}>
            <Box sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', overflow: 'hidden', mb: 1.25 }}>
              <Box
                sx={{
                  height: 140,
                  backgroundImage: `url(${draftPost.featuredImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Box sx={{ p: 1.25 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>
                  {draftPost.title}
                </Typography>
                {draftPost.subtitle && (
                  <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mb: 0.75 }}>
                    {draftPost.subtitle}
                  </Typography>
                )}
                {draftPost.body.map((para, i) => (
                  <Typography
                    key={i}
                    sx={{ fontSize: '0.7rem', lineHeight: 1.55, mb: 0.75, color: 'text.primary' }}
                  >
                    {para}
                  </Typography>
                ))}
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', my: 0.75 }}>
                  {draftPost.hashtags.map((tag) => (
                    <Typography
                      key={tag}
                      sx={{
                        fontSize: '0.6rem',
                        color: '#0066CC',
                        fontWeight: 600,
                        bgcolor: 'rgba(0,102,204,0.08)',
                        px: 0.5,
                        py: 0.1,
                        borderRadius: 8,
                      }}
                    >
                      #{tag}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Lock sx={{ fontSize: 12, color: 'text.secondary' }} />
                  <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary' }}>
                    PLANET Members only
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 1.25, borderRadius: 1.5, bgcolor: '#f5f7fa' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                <Fingerprint sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700 }}>
                  Sign with your DID
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.66rem', color: 'text.secondary' }}>
                Signing is handled by your PNM vault — your keys never leave the device.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handlePublish}
              startIcon={<Fingerprint />}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 2,
                py: 1.1,
                bgcolor: '#0066CC',
                '&:hover': { bgcolor: '#0052a3' },
              }}
            >
              Sign & Publish
            </Button>
          </Box>
        </>
      )}

      {phase === 'signing' && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, px: 3 }}>
          <CircularProgress size={48} />
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Signing post…</Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', textAlign: 'center' }}>
            Generating cryptographic signature with your DID via the PNM vault.
          </Typography>
        </Box>
      )}

      {phase === 'done' && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.25, px: 2.5, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 56, color: '#2e7d32' }} />
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem' }}>Published</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
            Your post is live and cryptographically signed.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1,
              py: 0.5,
              borderRadius: 10,
              bgcolor: 'rgba(46,125,50,0.1)',
              color: '#2e7d32',
            }}
          >
            <Verified sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700 }}>Verified</Typography>
            <Typography sx={{ fontSize: '0.68rem', fontFamily: 'monospace' }}>
              {jonny.agentName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, p: 1, borderRadius: 1.5, bgcolor: '#f5f7fa', width: '100%' }}>
            <Avatar src={jonny.avatar} sx={{ width: 28, height: 28 }} />
            <Typography sx={{ fontSize: '0.7rem', color: 'primary.main', fontFamily: 'monospace', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {jonny.agentName}/blog
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            onClick={onContinue}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              mt: 1,
              bgcolor: '#0066CC',
              '&:hover': { bgcolor: '#0052a3' },
            }}
          >
            Go to your posts
          </Button>
        </Box>
      )}
    </Box>
  );
};
