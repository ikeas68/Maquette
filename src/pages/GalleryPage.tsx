import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  LinearProgress,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';

export const GalleryPage = () => {
  const [alignment, setAlignment] = useState('web');

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Galerie des composants</Typography>
      <Typography variant="body2" color="text.secondary">
        Testez rapidement les variantes MUI utilisées dans cette vitrine.
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Boutons & états
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button variant="contained" startIcon={<RocketLaunchIcon />}>
              Lancer
            </Button>
            <Button variant="outlined" color="secondary" endIcon={<FavoriteIcon />}>
              Favori
            </Button>
            <Button variant="text" color="success" startIcon={<CheckCircleIcon />}>
              Validé
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Feedback utilisateur
          </Typography>
          <Stack spacing={2}>
            <Alert severity="success" icon={<AutoAwesomeIcon />}>
              Succès : opération terminée.
            </Alert>
            <Alert severity="info">Info : aucun backend requis.</Alert>
            <Alert severity="warning">Warning : valeurs mockées.</Alert>
            <Alert severity="error">Erreur simulée.</Alert>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Formulaires rapides
          </Typography>
          <Stack spacing={2}>
            <TextField label="Champ" placeholder="Tapez ici" fullWidth />
            <TextField label="Disabled" disabled fullWidth />
            <ToggleButtonGroup exclusive value={alignment} onChange={(_, val) => val && setAlignment(val)}>
              <ToggleButton value="web">Web</ToggleButton>
              <ToggleButton value="ios">iOS</ToggleButton>
              <ToggleButton value="android">Android</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Progression
          </Typography>
          <Stack spacing={2}>
            <LinearProgress />
            <LinearProgress color="secondary" variant="buffer" value={60} valueBuffer={80} />
            <Stack direction="row" spacing={2}>
              <CircularProgress />
              <CircularProgress color="secondary" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Chips & badges
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Neon" color="primary" />
            <Chip label="Glass" variant="outlined" color="secondary" />
            <Chip label="Retro" icon={<AutoAwesomeIcon />} />
            <Chip label="Success" color="success" variant="outlined" />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
