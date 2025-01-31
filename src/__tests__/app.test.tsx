import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../app';
import { mockSuccessResponse } from '../hooks/mock';

describe('App', () => {
  test('should render home routes', async () => {
    mockSuccessResponse();

    render(<App />);

    expect(await screen.findByText('Foodeego')).toBeInTheDocument();
    expect(await screen.findByText('All')).toBeInTheDocument();
    expect(await screen.findByText('Boilicon Shushi')).toBeInTheDocument();
  });
});
