import { createTheme } from '@mui/material/styles';

const createAppTheme = (mode) => {
  const isLight = mode === 'light';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#805AD5',
        light: '#9F7AEA',
        dark: '#553C9A',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: isLight ? '#805AD5' : '#9F7AEA',
        light: '#9F7AEA',
        dark: '#553C9A',
        contrastText: '#FFFFFF',
      },
      background: {
        default: isLight ? '#F7FAFC' : '#0F1419',
        paper: isLight ? '#FFFFFF' : '#1A202C',
      },
      text: {
        primary: isLight ? '#2D3748' : '#F7FAFC',
        secondary: isLight ? '#4A5568' : '#A0AEC0',
      },
      grey: {
        50: isLight ? '#F7FAFC' : '#2D3748',
        100: isLight ? '#EDF2F7' : '#4A5568',
        200: isLight ? '#E2E8F0' : '#718096',
        300: isLight ? '#CBD5E0' : '#A0AEC0',
        400: isLight ? '#A0AEC0' : '#CBD5E0',
        500: isLight ? '#718096' : '#E2E8F0',
        600: isLight ? '#4A5568' : '#EDF2F7',
        700: isLight ? '#2D3748' : '#F7FAFC',
        800: isLight ? '#1A202C' : '#FFFFFF',
        900: isLight ? '#171923' : '#FFFFFF',
      },
      success: {
        main: '#38A169',
        light: '#48BB78',
        dark: '#2F855A',
      },
      error: {
        main: '#E53E3E',
        light: '#FC8181',
        dark: '#C53030',
      },
      warning: {
        main: '#D69E2E',
        light: '#F6E05E',
        dark: '#B7791F',
      },
      info: {
        main: '#3182CE',
        light: '#63B3ED',
        dark: '#2C5282',
      },
    },
    typography: {
      fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontSize: '2.25rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '1.875rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        color: isLight ? '#4A5568' : '#A0AEC0',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        color: isLight ? '#718096' : '#718096',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.875rem',
      },
    },
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isLight ? '#F7FAFC' : '#0F1419',
            transition: 'background-color 0.3s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '12px 24px',
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 600,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: isLight ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(255, 255, 255, 0.1)',
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: isLight ? '0 8px 25px rgba(0, 0, 0, 0.15)' : '0 8px 25px rgba(255, 255, 255, 0.1)',
            },
          },
          outlined: {
            borderWidth: '1.5px',
            borderColor: isLight ? '#E2E8F0' : '#4A5568',
            '&:hover': {
              borderWidth: '1.5px',
              backgroundColor: isLight ? 'rgba(45, 55, 72, 0.04)' : 'rgba(255, 255, 255, 0.04)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isLight 
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            border: `1px solid ${isLight ? '#E2E8F0' : '#4A5568'}`,
            backgroundColor: isLight ? '#FFFFFF' : '#1A202C',
          },
          elevation1: {
            boxShadow: isLight 
              ? '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
              : '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4)',
          },
          elevation3: {
            boxShadow: isLight 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              backgroundColor: isLight ? '#FFFFFF' : '#2D3748',
              transition: 'all 0.2s ease-in-out',
              '& fieldset': {
                borderColor: isLight ? '#E2E8F0' : '#4A5568',
                borderWidth: '1.5px',
              },
              '&:hover fieldset': {
                borderColor: isLight ? '#CBD5E0' : '#718096',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#805AD5',
                borderWidth: '2px',
              },
              '&.Mui-error fieldset': {
                borderColor: '#E53E3E',
              },
            },
            '& .MuiInputLabel-root': {
              color: isLight ? '#718096' : '#A0AEC0',
              '&.Mui-focused': {
                color: '#805AD5',
              },
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            border: '1px solid',
          },
          standardSuccess: {
            backgroundColor: isLight ? '#F0FFF4' : '#1A2E1A',
            borderColor: isLight ? '#9AE6B4' : '#38A169',
            color: isLight ? '#2F855A' : '#9AE6B4',
          },
          standardError: {
            backgroundColor: isLight ? '#FED7D7' : '#2E1A1A',
            borderColor: isLight ? '#FEB2B2' : '#E53E3E',
            color: isLight ? '#C53030' : '#FEB2B2',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? '#FFFFFF' : '#1A202C',
            borderRadius: 12,
            border: `1px solid ${isLight ? '#E2E8F0' : '#4A5568'}`,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: isLight ? '#E2E8F0' : '#4A5568',
          },
          head: {
            backgroundColor: isLight ? '#F7FAFC' : '#2D3748',
            color: isLight ? '#2D3748' : '#F7FAFC',
          },
        },
      },
    },
  });
};

export default createAppTheme;