import { Box, Typography, Button } from '@mui/material';
import { Star } from '@mui/icons-material';

/** Step 04 — App Store: What the user sees in the store listing */
export const AppStoreScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* App header */}
      <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <Box
          component="img"
          src="/images/planet-app-icon.jpg"
          alt="PLANET"
          sx={{
            width: 64,
            height: 64,
            borderRadius: '14px',
            flexShrink: 0,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>PLANET</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2, display: 'block' }}>Decentralised Trust Network</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            {[1,2,3,4,5].map(i => (
              <Star key={i} sx={{ fontSize: 12, color: '#f59e0b' }} />
            ))}
            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.25, fontSize: '0.65rem' }}>5.0</Typography>
          </Box>
        </Box>
        <Button variant="contained" size="small" sx={{ borderRadius: 4, px: 2, fontWeight: 700, textTransform: 'none' }}>
          Get
        </Button>
      </Box>

      {/* Screenshot carousel */}
      <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 1.5, overflowX: 'auto' }}>
        {[
          'The start of a new decentralised trust network',
          'A new economy built on real relationships',
          'Your data. Your network. Your rules.',
        ].map((text, i) => (
          <Box key={i} sx={{
            width: 200,
            height: 360,
            borderRadius: 2,
            backgroundImage: 'url(/images/planet-billboard-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            flexShrink: 0,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.3)',
              borderRadius: 2,
            },
          }}>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', textAlign: 'center', lineHeight: 1.3, position: 'relative', zIndex: 1 }}>
              {text}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Description */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="body2" sx={{ lineHeight: 1.5, fontSize: '0.8rem' }}>
          PLANET is a regenerative trust network where your identity, data, and relationships belong to you. Built on decentralised identity and verifiable credentials. PLANET is co-owned by the members of The Open Co-op, join us!
        </Typography>
      </Box>
    </Box>
  );
};
