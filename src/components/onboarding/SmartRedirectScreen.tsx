import { Box, Typography, CircularProgress } from '@mui/material';

/** Step 03 — Smart Redirect: Brief flash before app store redirect */
export const SmartRedirectScreen = () => {
  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#0F1114',
      color: 'white',
    }}>
      {/* PLANET brand mark */}
      <Box sx={{
        width: 80,
        height: 80,
        borderRadius: '20px',
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3,
      }}>
        <Typography sx={{ fontWeight: 800, fontSize: '2rem', color: 'white' }}>P</Typography>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        PLANET
      </Typography>

      <CircularProgress size={20} sx={{ color: 'grey.500', mt: 2 }} />

      <Typography variant="caption" sx={{ color: 'grey.500', mt: 2 }}>
        Redirecting to App Store...
      </Typography>
    </Box>
  );
};
