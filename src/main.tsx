import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeSwitcherProvider } from './theme/ThemeContext';
import { SnackbarProvider } from './components/notifications/SnackbarProvider';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeSwitcherProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeSwitcherProvider>
    </BrowserRouter>
  </React.StrictMode>
);
