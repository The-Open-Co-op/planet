import { Box } from '@mui/material';
import AppStorePage from '@/pages/AppStorePage';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';

/** Step 13 — App Store */
export const AppStoreCardScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', mb: -2 }}>
        <AppStorePage />
      </Box>
      <DemoTabBar />
    </Box>
  );
};
