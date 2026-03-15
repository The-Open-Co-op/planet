import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface StandardPageProps {
  title: string | ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

export const StandardPage = ({ title, children, actions }: StandardPageProps) => {
  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      pt: 2,
      pl: 2,
      pb: 2,
      pr: { xs: 0, sm: 2 },
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: { xs: 40, sm: 48 },
        minHeight: { xs: 40, sm: 48 },
        mb: { xs: 1.5, sm: 3 },
        pr: { xs: 2, sm: 0 },
      }}>
        {typeof title === 'string' ? (
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 700
            }}
          >
            {title}
          </Typography>
        ) : (
          <Box component="h1" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 700, m: 0 }}>
            {title}
          </Box>
        )}
        {actions && <Box>{actions}</Box>}
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', pr: { xs: 2, sm: 0 } }}>
        {children}
      </Box>
    </Box>
  );
};