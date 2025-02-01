import { expect, test, describe } from 'vitest';
import { MemoryRouter } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Footer, Header } from '../_layout';
import { ThemeProvider } from '../../components/theme-provider';

const user = userEvent.setup();

describe('Layout > Header', () => {
  test('should render Header', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Foodeego')).toBeInTheDocument();
  });

  test('should toggle the theme', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Toggle theme')).toBeInTheDocument();
    const btnToggleTheme = await screen.findByRole('button', {
      name: 'Toggle theme',
    });
    expect(btnToggleTheme).toBeInTheDocument();
    expect(btnToggleTheme).toHaveAttribute('data-current-theme', 'system');

    await user.click(btnToggleTheme);

    waitFor(() =>
      expect(btnToggleTheme).toHaveAttribute('data-current-theme', 'dark')
    );

    await user.click(btnToggleTheme);

    waitFor(() =>
      expect(btnToggleTheme).toHaveAttribute('data-current-theme', 'light')
    );
  });
});

describe('Layout > Footer', () => {
  test('should render Footer', async () => {
    render(<Footer />);
    expect(await screen.findByText('Irfan Maulana')).toBeInTheDocument();
  });
});
