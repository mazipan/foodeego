import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../spinner';

test.each([
  ['xs'],
  ['sm'],
  ['md'],
  ['lg'],
])('Should render <Empty size="%s" />', async (size) => {
  render(<Spinner size={size as 'xs' | 'sm' | 'md' | 'lg'} />);
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
});
