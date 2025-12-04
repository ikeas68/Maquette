import { alpha, createTheme, Theme } from '@mui/material/styles';

export type ThemeName = 'modernDark' | 'lightCorporate' | 'glass' | 'retro';

const modernDark = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f0f0f',
      paper: '#161616'
    },
    primary: { main: '#5ef0ff' },
    secondary: { main: '#a855f7' },
    divider: alpha('#5ef0ff', 0.2)
  },
  shape: { borderRadius: 14 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(94,240,255,0.12), transparent 25%), radial-gradient(circle at 100% 0%, rgba(168,85,247,0.16), transparent 30%)'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", system-ui, sans-serif'
  }
});

const lightCorporate = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#f5f7fb', paper: '#ffffff' },
    primary: { main: '#1e88e5' },
    secondary: { main: '#1565c0' }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }
      }
    }
  }
});

const glass = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#e3ecf7', paper: alpha('#ffffff', 0.7) },
    primary: { main: '#6c5ce7' },
    secondary: { main: '#00b894' }
  },
  shape: { borderRadius: 18 },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backdropFilter: 'blur(14px)',
          border: `1px solid ${alpha('#ffffff', 0.4)}`,
          boxShadow: '0 8px 30px rgba(108,92,231,0.18), 0 2px 12px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#ffffff', 0.7),
          backdropFilter: 'blur(12px)'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif'
  }
});

const retro = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#f7e9d7', paper: '#fff5e1' },
    primary: { main: '#ff3366' },
    secondary: { main: '#4a90e2' },
    success: { main: '#3cb878' }
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
    h1: { letterSpacing: 1 },
    h2: { letterSpacing: 1 }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '3px solid #000',
          boxShadow: '6px 6px 0 #000'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '3px solid #000',
          boxShadow: '4px 4px 0 #000',
          textTransform: 'uppercase'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          border: '2px solid #000',
          boxShadow: '3px 3px 0 #000'
        }
      }
    }
  }
});

export const themes: Record<ThemeName, Theme> = {
  modernDark,
  lightCorporate,
  glass,
  retro
};

export const themeLabels: Record<ThemeName, string> = {
  modernDark: 'Modern Dark',
  lightCorporate: 'Light Corporate',
  glass: 'Glassmorphism',
  retro: 'Retro 90s'
};
