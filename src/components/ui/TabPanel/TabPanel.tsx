import { forwardRef } from 'react';
import { Box } from '@mui/material';
import { LoadingSpinner } from '../LoadingSpinner';
import type { TabPanelProps } from './types';

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, index, value, loading = false, keepMounted = false, ...props }, ref) => {
    const isActive = value === index;
    const shouldRender = isActive || keepMounted;

    if (!shouldRender) {
      return null;
    }

    return (
      <Box
        ref={ref}
        role="tabpanel"
        hidden={!isActive}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        sx={{
          p: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          ...props.sx
        }}
        {...props}
      >
        {loading ? (
          <LoadingSpinner centered message="Loading..." />
        ) : (
          children
        )}
      </Box>
    );
  }
);

TabPanel.displayName = 'TabPanel';