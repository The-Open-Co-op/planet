import { forwardRef } from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { Button } from '../Button';
import type { PageHeaderProps } from './types';

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, subtitle, actions = [], loading = false, ...props }, ref) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          mb: { xs: 1, md: 1 },
          gap: { xs: 1, md: 1 },
          width: '100%',
          overflow: 'hidden',
          minWidth: 0,
          ...props.sx
        }}
        {...props}
      >
        <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: '1.25rem', // 20px - consistent on mobile
                md: '1.5rem'   // 24px - consistent on desktop
              },
              fontWeight: 700,
              lineHeight: 1.2,
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              width: isMobile ? '100%' : 'auto',
              flexWrap: isMobile ? 'nowrap' : 'wrap',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outlined'}
                color={action.color}
                startIcon={action.icon}
                onClick={action.onClick}
                disabled={action.disabled}
                loading={loading || action.loading}
                fullWidth={isMobile}
                sx={{
                  borderRadius: 2,
                  ...(isMobile && {
                    height: 44,
                    fontSize: '0.8rem'
                  })
                }}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    );
  }
);

PageHeader.displayName = 'PageHeader';