import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeSwitcherProvider } from './theme/ThemeContext';
import { SnackbarProvider } from './components/notifications/SnackbarProvider';
import { App } from './App';

const renderApp = () =>
  render(
    <BrowserRouter>
      <ThemeSwitcherProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeSwitcherProvider>
    </BrowserRouter>
  );

describe('App smoke test', () => {
  it('renders splash then dashboard', async () => {
    renderApp();
    expect(await screen.findByText(/Experience Center/i)).toBeInTheDocument();
  });
});
