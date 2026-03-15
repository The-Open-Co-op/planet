import { createTheme, alpha } from '@mui/material/styles';

// PLANET Design System - Cool-toned grey palette (slight blue undertone)
const grey = {
  0: '#FFFFFF',
  25: '#FCFCFD',
  50: '#F8F9FA',
  75: '#F3F4F6',
  100: '#E9EAED',
  150: '#DFE1E6',
  200: '#D4D7DC',
  250: '#C5C9D0',
  300: '#B3B8C1',
  350: '#A0A6B1',
  400: '#8B92A0',
  450: '#767E8E',
  500: '#636B7C',
  550: '#525A6A',
  600: '#434A59',
  650: '#373E4A',
  700: '#2D333D',
  750: '#242930',
  800: '#1C2025',
  850: '#15181C',
  900: '#0F1114',
  950: '#090A0C',
  1000: '#000000',
};

// Semantic colors for status indicators only
const semanticColors = {
  success: {
    light: '#4caf50',
    main: '#2e7d32',
    dark: '#1b5e20',
  },
  warning: {
    light: '#ff9800',
    main: '#ed6c02',
    dark: '#e65100',
  },
  error: {
    light: '#ef5350',
    main: '#d32f2f',
    dark: '#c62828',
  },
  info: {
    light: '#03a9f4',
    main: '#0288d1',
    dark: '#01579b',
  },
};

export const createPlanetTheme = () => {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: grey[900],
        light: grey[700],
        dark: grey[1000],
        contrastText: grey[0],
      },
      secondary: {
        main: grey[600],
        light: grey[400],
        dark: grey[800],
        contrastText: grey[0],
      },
      success: semanticColors.success,
      warning: semanticColors.warning,
      error: semanticColors.error,
      info: semanticColors.info,
      grey: grey,
      background: {
        default: grey[50],  // #F8F9FA - Cool light grey background
        paper: grey[0],     // #FFFFFF - Pure white for cards/papers
      },
      text: {
        primary: grey[900],
        secondary: grey[600],
        disabled: grey[400],
      },
      divider: alpha(grey[900], 0.08),
      action: {
        active: grey[600],
        hover: alpha(grey[900], 0.04),
        selected: alpha(grey[900], 0.08),
        disabled: grey[300],
        disabledBackground: grey[200],
        focus: alpha(grey[900], 0.12),
      },
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      h1: {
        fontSize: '3.5rem',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2.75rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '2.2rem',
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.6,
      },
      subtitle1: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.75,
      },
      subtitle2: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.75,
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.75,
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: 1.75,
        textTransform: 'none' as const,
        letterSpacing: '0.02em',
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '0.03em',
      },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 600,
        lineHeight: 1.6,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none',
      `0 1px 2px ${alpha(grey[1000], 0.05)}`,
      `0 1px 3px ${alpha(grey[1000], 0.1)}, 0 1px 2px ${alpha(grey[1000], 0.06)}`,
      `0 4px 6px ${alpha(grey[1000], 0.07)}, 0 2px 4px ${alpha(grey[1000], 0.06)}`,
      `0 10px 15px ${alpha(grey[1000], 0.1)}, 0 4px 6px ${alpha(grey[1000], 0.05)}`,
      `0 20px 25px ${alpha(grey[1000], 0.1)}, 0 10px 10px ${alpha(grey[1000], 0.04)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
      `0 25px 50px ${alpha(grey[1000], 0.25)}`,
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
          },
          html: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
            backgroundColor: grey[50], // Cool light grey background
            margin: 0,
            padding: 0,
          },
          '#root': {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          },
          '::selection': {
            backgroundColor: alpha(grey[900], 0.2),
            color: grey[900],
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 600,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:active': {
              transform: 'scale(0.98)',
            },
          },
          contained: {
            boxShadow: `0 1px 2px ${alpha(grey[1000], 0.05)}`,
            '&:hover': {
              boxShadow: `0 4px 8px ${alpha(grey[1000], 0.15)}`,
              transform: 'translateY(-1px)',
            },
          },
          containedPrimary: {
            backgroundColor: grey[900],
            color: grey[0],
            '&:hover': {
              backgroundColor: grey[800],
            },
          },
          containedSecondary: {
            backgroundColor: grey[200],
            color: grey[900],
            '&:hover': {
              backgroundColor: grey[300],
            },
          },
          outlined: {
            borderColor: grey[300],
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
              backgroundColor: grey[50],
              borderColor: grey[400],
            },
          },
          text: {
            '&:hover': {
              backgroundColor: grey[100],
            },
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: grey[0],
            border: `1px solid ${grey[200]}`,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: grey[25],
              borderColor: grey[300],
              boxShadow: `0 4px 12px ${alpha(grey[900], 0.08)}`,
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          outlined: {
            borderColor: grey[200],
          },
          elevation0: {
            border: `1px solid ${grey[200]}`,
          },
          elevation1: {
            boxShadow: `0 1px 3px ${alpha(grey[1000], 0.08)}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: grey[0],
              transition: 'all 0.2s ease',
              '& fieldset': {
                borderColor: grey[300],
                borderWidth: '1.5px',
                transition: 'border-color 0.2s ease',
              },
              '&:hover': {
                backgroundColor: grey[50],
                '& fieldset': {
                  borderColor: grey[400],
                },
              },
              '&.Mui-focused': {
                backgroundColor: grey[0],
                '& fieldset': {
                  borderColor: grey[700],
                  borderWidth: '2px',
                },
              },
            },
            '& .MuiInputLabel-root': {
              color: grey[600],
              '&.Mui-focused': {
                color: grey[900],
              },
            },
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: grey[0],
            color: grey[900],
            borderBottom: `1px solid ${grey[200]}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: grey[25],  // Very subtle cool grey
            borderRight: `1px solid ${grey[200]}`,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            marginBottom: 2,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: grey[100],
            },
            '&.Mui-selected': {
              backgroundColor: grey[200],
              '&:hover': {
                backgroundColor: grey[250],
              },
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: grey[100],
            },
            '&.Mui-selected': {
              backgroundColor: grey[200],
              '&:hover': {
                backgroundColor: grey[250],
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
            border: `1px solid ${grey[300]}`,
          },
          filled: {
            backgroundColor: grey[200],
            color: grey[800],
            '&:hover': {
              backgroundColor: grey[300],
            },
          },
          outlined: {
            backgroundColor: grey[0],
            '&:hover': {
              backgroundColor: grey[100],
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: grey[300],
            color: grey[700],
            fontWeight: 600,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: grey[900],
            color: grey[0],
            boxShadow: `0 4px 8px ${alpha(grey[1000], 0.2)}`,
            '&:hover': {
              backgroundColor: grey[800],
              boxShadow: `0 6px 12px ${alpha(grey[1000], 0.25)}`,
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          slotProps: {
            backdrop: {
              sx: {
                backgroundColor: alpha(grey[900], 0.5),
              },
            },
          },
        },
        styleOverrides: {
          paper: {
            borderRadius: 16,
            boxShadow: `0 20px 40px ${alpha(grey[1000], 0.3)}`,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: grey[900],
            color: grey[0],
            fontSize: '0.75rem',
            fontWeight: 500,
            borderRadius: 6,
            padding: '6px 12px',
          },
          arrow: {
            color: grey[900],
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            border: '1px solid',
            fontWeight: 500,
          },
          standardSuccess: {
            backgroundColor: alpha(semanticColors.success.main, 0.08),
            color: semanticColors.success.dark,
            borderColor: alpha(semanticColors.success.main, 0.3),
            '& .MuiAlert-icon': {
              color: semanticColors.success.main,
            },
          },
          standardError: {
            backgroundColor: alpha(semanticColors.error.main, 0.08),
            color: semanticColors.error.dark,
            borderColor: alpha(semanticColors.error.main, 0.3),
            '& .MuiAlert-icon': {
              color: semanticColors.error.main,
            },
          },
          standardWarning: {
            backgroundColor: alpha(semanticColors.warning.main, 0.08),
            color: semanticColors.warning.dark,
            borderColor: alpha(semanticColors.warning.main, 0.3),
            '& .MuiAlert-icon': {
              color: semanticColors.warning.main,
            },
          },
          standardInfo: {
            backgroundColor: alpha(semanticColors.info.main, 0.08),
            color: semanticColors.info.dark,
            borderColor: alpha(semanticColors.info.main, 0.3),
            '& .MuiAlert-icon': {
              color: semanticColors.info.main,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${grey[200]}`,
          },
          indicator: {
            backgroundColor: grey[900],
            height: 3,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: grey[600],
            '&.Mui-selected': {
              color: grey[900],
              fontWeight: 600,
            },
            '&:hover': {
              color: grey[800],
              backgroundColor: grey[100],
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: grey[200],
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: grey[700],
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: grey[100],
              color: grey[900],
            },
          },
        },
      },
    },
  });
};

export default createPlanetTheme;