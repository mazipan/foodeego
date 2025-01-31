import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NotFound } from '../NotFound';

describe('Not Found', () => {
  test('render 404 page', async () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(await screen.findByText('ERROR 404')).toBeInTheDocument();
    expect(await screen.findByText(`It's Empty Here!`)).toBeInTheDocument();
  });
});
