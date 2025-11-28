import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface StandardPageProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const StandardPage = ({ title, children, actions }: StandardPageProps) => {
  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      p: 2 
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography 
          component="h1" 
          sx={{ 
            fontSize: '1.5rem', 
            fontWeight: 700 
          }}
        >
          {title}
        </Typography>
        {actions && <Box>{actions}</Box>}
      </Box>
      
      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};