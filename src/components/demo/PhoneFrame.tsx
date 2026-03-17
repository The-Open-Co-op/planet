import { useRef, useState, useEffect } from 'react';
import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';
import { SignalCellularAlt, Wifi, BatteryFull } from '@mui/icons-material';
import type { ReactNode } from 'react';
import { DemoMobileProvider, DemoContainerProvider } from './DemoContext';
import { createPlanetTheme } from '@/theme/planetTheme';

interface PhoneFrameProps {
  children: ReactNode;
}

// Theme with unreachable breakpoints so Grid always uses xs values
const baseTheme = createPlanetTheme();

/** Renders children inside a realistic iPhone SE phone frame */
export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(contentRef.current);
  }, []);

  // Theme with high breakpoints + Dialog/Popover/Menu container override
  const mobileTheme = createTheme(baseTheme, {
    breakpoints: {
      values: { xs: 0, sm: 9999, md: 9999, lg: 9999, xl: 9999 },
    },
    components: {
      MuiDialog: {
        defaultProps: {
          container: container || undefined,
          disablePortal: !!container,
        },
        styleOverrides: {
          root: container ? {
            position: 'absolute',
          } : {},
        },
      },
      MuiPopover: {
        defaultProps: {
          container: container || undefined,
          disablePortal: !!container,
        },
      },
      MuiMenu: {
        defaultProps: {
          container: container || undefined,
          disablePortal: !!container,
        },
      },
      MuiModal: {
        defaultProps: {
          container: container || undefined,
          disablePortal: !!container,
        },
      },
    },
  });

  return (
    <Box
      sx={{
        width: 375,
        height: 667,
        borderRadius: '32px',
        border: '6px solid #1C2025',
        bgcolor: 'background.default',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Notch */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 22,
          bgcolor: '#1C2025',
          borderRadius: '0 0 18px 18px',
          zIndex: 10,
        }}
      />
      {/* Status bar */}
      <Box sx={{
        height: 32,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        px: 2,
        pb: 0.5,
        position: 'relative',
        zIndex: 11,
      }}>
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.primary' }}>
          9:41
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SignalCellularAlt sx={{ fontSize: 14, color: 'text.primary' }} />
          <Wifi sx={{ fontSize: 14, color: 'text.primary' }} />
          <BatteryFull sx={{ fontSize: 16, color: 'text.primary' }} />
        </Box>
      </Box>
      {/* App content — mobile theme for Grid + context for useMediaQuery */}
      <ThemeProvider theme={mobileTheme}>
        <DemoMobileProvider>
          <DemoContainerProvider container={container}>
            <Box
              ref={contentRef}
              sx={{
                flex: 1,
                overflow: 'auto',
                position: 'relative',
              }}
            >
              {children}
            </Box>
          </DemoContainerProvider>
        </DemoMobileProvider>
      </ThemeProvider>
    </Box>
  );
};
