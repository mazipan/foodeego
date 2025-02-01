import { vi, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ButtonGroup } from '../button-group';

const user = userEvent.setup();

test('ButtonGroup > render items', async () => {
  const mockOnClick = vi.fn();
  render(
    <ButtonGroup
      items={[{ id: 'all', name: 'All', isActive: true, onClick: mockOnClick }]}
    />
  );

  const item = await screen.findByText('All');

  expect(item).toBeInTheDocument();
  expect(item).toHaveAttribute('data-active', 'true');

  await user.click(item);
  expect(mockOnClick).toHaveBeenCalled();
});
