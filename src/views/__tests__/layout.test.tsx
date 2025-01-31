import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer, Header } from '../_layout';
import { MemoryRouter } from 'react-router';

describe('Layout', () => {
  test('Header', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(await screen.findByText('Foodeego')).toBeInTheDocument();
  });

  test('Footer', async () => {
    render(<Footer />);
    expect(await screen.findByText('Irfan Maulana')).toBeInTheDocument();
  });
});
