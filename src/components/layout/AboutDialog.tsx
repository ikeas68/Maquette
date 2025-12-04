import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  Chip
} from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AboutDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby="about-dialog-title">
      <DialogTitle id="about-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CelebrationIcon color="secondary" />
        À propos de cette vitrine
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText>
            Cette démonstration React + MUI a été conçue pour itérer rapidement sur vos idées. Chaque module est
            composable, typé et prêt à être personnalisé.
          </DialogContentText>
          <DialogContentText sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiObjectsIcon color="warning" />
            Easter egg : essayez de taper « wow » sur votre clavier, une pluie de confettis apparaîtra !
          </DialogContentText>
          <Stack direction="row" spacing={1}>
            <Chip label="React 18" color="primary" />
            <Chip label="MUI v5" color="secondary" />
            <Chip label="Vite" variant="outlined" />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
