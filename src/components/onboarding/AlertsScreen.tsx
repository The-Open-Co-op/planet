import { Box } from '@mui/material';
import { NotificationsPage } from '@/components/notifications/NotificationsPage';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';

/** Step 14 — Alerts */
export const AlertsScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', mb: -2 }}>
        <NotificationsPage />
      </Box>
      <DemoTabBar active="alerts" />
    </Box>
  );
};
