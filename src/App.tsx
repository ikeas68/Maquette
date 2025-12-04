import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, CircularProgress, Container, Fade } from '@mui/material';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { DataGridPage } from './pages/DataGridPage';
import { FormPage } from './pages/FormPage';
import { KanbanPage } from './pages/KanbanPage';
import { GalleryPage } from './pages/GalleryPage';
import { ProtectedRoute } from './components/navigation/ProtectedRoute';

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 20% 20%, rgba(94,240,255,0.2), transparent 25%), #0f0f0f' }}>
        <Fade in>
          <CircularProgress size={80} color="primary" thickness={4} />
        </Fade>
      </Box>
    );
  }

  return (
    <AppLayout>
      <Container maxWidth="xl">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute pageName="dashboard">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/data-grid"
            element={
              <ProtectedRoute pageName="data-grid">
                <DataGridPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/form"
            element={
              <ProtectedRoute pageName="form">
                <FormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kanban"
            element={
              <ProtectedRoute pageName="kanban">
                <KanbanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute pageName="gallery">
                <GalleryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </AppLayout>
  );
};
