import { Box, Typography, Button } from '@mui/material';
import { DynamicFeed, ToggleOn, AccountTree, Visibility } from '@mui/icons-material';

interface FeedWelcomeScreenProps {
  onContinue?: () => void;
}

const POINTS = [
  { icon: ToggleOn, title: 'No platform-imposed ranking.' },
  { icon: AccountTree, title: 'As many feeds as you need.' },
  { icon: Visibility, title: 'Follow per tag to reduce noise.' },
];

export const FeedWelcomeScreen = ({ onContinue }: FeedWelcomeScreenProps) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
    <Box sx={{ flex: 1, px: 2.5, pt: 3, pb: 1.5, overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        bgcolor: '#0066CC',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        mb: 1.5,
      }}>
        <DynamicFeed sx={{ fontSize: 32 }} />
      </Box>
      <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', textAlign: 'center', mb: 0.5 }}>
        Your feeds - Your way
      </Typography>
      <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary', textAlign: 'center', lineHeight: 1.5, mb: 2.5 }}>
        Design your own algorithms to find the news, views and opportunities you care about, from sources you trust.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {POINTS.map(({ icon: Icon, title }) => (
          <Box
            key={title}
            sx={{ display: 'flex', gap: 1.25, alignItems: 'center', p: 1.25, borderRadius: 1.5, bgcolor: '#f5f7fa' }}
          >
            <Box sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: '#0066CC',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon sx={{ fontSize: 16 }} />
            </Box>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.3 }}>{title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
    <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
      <Button
        fullWidth
        variant="contained"
        onClick={onContinue}
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 2,
          bgcolor: '#0066CC',
          '&:hover': { bgcolor: '#0052a3' },
        }}
      >
        Find sources to follow
      </Button>
    </Box>
  </Box>
);
