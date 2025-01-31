import { expect, test, describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Home } from '../Home';
import { mockErrorResponse, mockSuccessResponse } from '../../hooks/mock';
import userEvent from '@testing-library/user-event';

describe('Home', () => {
  test('render error state', async () => {
    mockErrorResponse();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Error when loading the data.')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Please refresh your browser or try again later.')
    ).toBeInTheDocument();
  });

  test('render success with mocked data', async () => {
    mockSuccessResponse();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText('All')).toBeInTheDocument();
  });

  test('render success then search by the keyword', async () => {
    const user = userEvent.setup();

    mockSuccessResponse();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText('All')).toBeInTheDocument();
    const secondItem = await screen.findByText('Boilicon Shushi');
    expect(secondItem).toBeInTheDocument();

    // Fill the search input
    const searchInputEl = await screen.findByPlaceholderText(
      'Enter restaurant name...'
    );
    await user.type(searchInputEl, 'Niquent Drinks');

    // Submit form
    const submitBtn = await screen.findByRole('button', { name: 'Search' });
    await user.click(submitBtn);

    await waitFor(() => {
      // Wait for 2nd item to be removed from the DOM
      expect(secondItem).not.toBeInTheDocument();
    });

    // Search with random keyword to show the empty state
    await user.type(searchInputEl, 'Lorem Ipsum Dolor Sit Amet');
    await user.click(submitBtn);

    expect(
      await screen.findByText('Can not found any data here.')
    ).toBeInTheDocument();

    // Click the reset button to show all the data
    const resetBtn = await screen.findByRole('button', {
      name: 'Reset Filter',
    });
    await user.click(resetBtn);

    expect(await screen.findByText('Boilicon Shushi')).toBeInTheDocument();
  });

  test('render success then filter by the category', async () => {
    const user = userEvent.setup();

    mockSuccessResponse();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const btnCat_All = await screen.findByText('All');
    const btnCat_Desert = await screen.findByText('Desserts', { exact: true });

    expect(btnCat_All).toBeInTheDocument();
    expect(btnCat_Desert).toBeInTheDocument();

    const secondItem = await screen.findByText('Boilicon Shushi');
    expect(secondItem).toBeInTheDocument();

    // Click btn desert to change the category
    await user.click(btnCat_Desert);

    await waitFor(() => {
      // Wait for 2nd item to be removed from the DOM
      expect(secondItem).not.toBeInTheDocument();
    });
  });
});
