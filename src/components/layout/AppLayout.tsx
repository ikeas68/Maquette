import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ThemeName, themeLabels } from '../../theme/presets';
import { ThemeSwitcherContext } from '../../theme/ThemeContext';
import { useContext } from 'react';
import { NavigationTree } from '../navigation/NavigationTree';
import { BreadcrumbsNav } from './BreadcrumbsNav';
import { AboutDialog } from './AboutDialog';

const drawerWidth = 280;

interface Props {
  children: ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { themeName, setThemeName, theme } = useContext(ThemeSwitcherContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const paletteOptions = useMemo(() => Object.entries(themeLabels) as [ThemeName, string][], []);

  useEffect(() => {
    const handler = async (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'w') {
        const buffer = (window as any).__maquetteKeys || '';
        (window as any).__maquetteKeys = `${buffer}w`.slice(-3);
      } else if (event.key.toLowerCase() === 'o') {
        const buffer = (window as any).__maquetteKeys || '';
        (window as any).__maquetteKeys = `${buffer}o`.slice(-3);
      } else {
        (window as any).__maquetteKeys = '';
      }

      if ((window as any).__maquetteKeys === 'wow') {
        const module = await import('canvas-confetti');
        module.default({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        (window as any).__maquetteKeys = '';
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 2 }}>
        <Avatar variant="rounded" sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.getContrastText(theme.palette.primary.main) }}>
          M
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            Maquette POC
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4 }}>
            Frontend only
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <NavigationTree />
      <Box sx={{ flexGrow: 1 }} />
      <Typography variant="body2" color="text.secondary">
        Edition live & itérative
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: theme.palette.background.default }}>
      <AppBar
        position="fixed"
        elevation={3}
        color="transparent"
        sx={{ backdropFilter: 'blur(18px)', borderBottom: `1px solid ${theme.palette.divider}`, backgroundImage: 'none' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              aria-label="open navigation drawer"
              sx={{
                borderRadius: 2,
                p: 1.2,
                bgcolor: theme.palette.background.paper,
                boxShadow: 1,
                '&:hover': {
                  bgcolor: theme.palette.action.hover
                }
              }}
            >
              <MenuRoundedIcon fontSize="large" />
            </IconButton>
            <Typography variant={isMobile ? 'h6' : 'h5'} component="div" sx={{ fontWeight: 800 }}>
              Experience Center
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Changer de thème">
              <IconButton color="primary" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <ColorLensIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="À propos">
              <IconButton color="inherit" onClick={() => setAboutOpen(true)} aria-label="open about dialog">
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" aria-label="navigation drawer">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.04), transparent)'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, mt: 8 }}>
        <BreadcrumbsNav />
        {children}
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {paletteOptions.map(([name, label]) => (
          <MenuItem
            key={name}
            selected={themeName === name}
            onClick={() => {
              setThemeName(name);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <ColorLensIcon fontSize="small" />
            </ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </Menu>

      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </Box>
  );
};
