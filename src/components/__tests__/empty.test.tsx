import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Empty } from '../empty';

describe('Empty', () => {
  test('should render title only', async () => {
    render(
      <Empty
        title="Hello"
      />
    );

    expect(await screen.findByText('Hello')).toBeInTheDocument();
  });

  test('should render children along with description & action', async () => {
    render(
      <Empty
        title="Hello"
        description="Longer description"
        action={<p>Action text</p>}
      />
    );

    expect(await screen.findByText('Hello')).toBeInTheDocument();
    expect(await screen.findByText('Longer description')).toBeInTheDocument();
    expect(await screen.findByText('Action text')).toBeInTheDocument();
  });
});
