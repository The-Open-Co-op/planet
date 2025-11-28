import { Box, Tabs, Tab, Typography } from '@mui/material';
import { List as ListIcon } from '@mui/icons-material';

interface ContactTabsProps {
  tabValue: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  contactCount: number;
  isLoading: boolean;
}

export const ContactTabs = ({ tabValue, onTabChange, contactCount, isLoading }: ContactTabsProps) => {

  return (
    <Box sx={{ 
      flexShrink: 0,
      mb: 1,
      width: { xs: 'calc(100% + 20px)', md: '100%' }, 
      maxWidth: { xs: 'calc(100vw - 0px)', md: '100%' }, 
      overflow: 'hidden',
      mx: { xs: '-10px', md: 0 },
      boxSizing: 'border-box'
    }}>
      <Tabs
        value={tabValue}
        onChange={onTabChange}
        aria-label="contact view tabs"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTab-root': {
            minHeight: 56,
            textTransform: 'none',
            fontWeight: 500,
            minWidth: { xs: 80, sm: 120 },
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }
        }}
      >
        <Tab icon={<ListIcon />} label="List" />
      </Tabs>
      
    </Box>
  );
};