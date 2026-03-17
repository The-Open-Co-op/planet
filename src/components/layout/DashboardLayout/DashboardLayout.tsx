import { Box } from '@mui/material';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import type { DashboardLayoutProps } from './types';

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden' 
    }}>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'background.default',
          overflow: 'hidden',
          paddingBottom: '60px'
        }}
      >
        {children}
      </Box>

      {/* Bottom Navigation - Always visible */}
      <BottomNavigation />
    </Box>
  );
};