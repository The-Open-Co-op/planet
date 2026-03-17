import { Box, Typography, Button } from '@mui/material';

/** Final screen — feedback splash */
export const FeedbackScreen = () => {
  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 6,
      textAlign: 'center',
    }}>
      <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 4 }}>
        Questions / Comments / Feedback?
      </Typography>

      <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6, fontWeight: 400 }}>
        We'd love to know what you think of the draft PLANET designs.
      </Typography>

      <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.6, fontWeight: 400 }}>
        PLANET is a collaborative project being designed by the people that will own it and use it.
      </Typography>

      <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 4 }}>
        No billionaires. No Ads. No BS.
      </Typography>

      <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.6, fontWeight: 400 }}>
        Join The Open Co-op to add your feedback and help make our PLANET awesome.
      </Typography>

      <Button
        variant="outlined"
        href="https://collab.open.coop/join"
        target="_blank"
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 2,
          borderColor: '#0066CC',
          color: '#0066CC',
          px: 4,
          '&:hover': { borderColor: '#004C99', bgcolor: 'rgba(0,102,204,0.08)' },
        }}
      >
        Join
      </Button>
    </Box>
  );
};
