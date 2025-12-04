import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { AlertColor, Snackbar, Alert, Slide } from '@mui/material';

type SnackbarState = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

interface SnackbarContextValue {
  notify: (message: string, severity?: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextValue>({
  notify: () => undefined
});

const DEFAULT: SnackbarState = {
  open: false,
  message: '',
  severity: 'info'
};

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snack, setSnack] = useState<SnackbarState>(DEFAULT);

  const notify = useCallback((message: string, severity: AlertColor = 'info') => {
    setSnack({ open: true, message, severity });
  }, []);

  const handleClose = useCallback(() => setSnack((prev) => ({ ...prev, open: false })), []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
      >
        <Alert elevation={3} variant="filled" severity={snack.severity} onClose={handleClose} sx={{ minWidth: 280 }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
