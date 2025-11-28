import { Box, Typography } from '@mui/material';
import { StandardPage } from '@/components/layout/StandardPage';

const AppsPage = () => {
  return (
    <StandardPage title="Apps">
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Apps coming soon...
        </Typography>
      </Box>
    </StandardPage>
  );
};

export default AppsPage;