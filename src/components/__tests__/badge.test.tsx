
import { expect, test } from 'vitest';
import {
  render,
  screen,
} from "@testing-library/react";
import { Badge } from '../badge';


test("Badge > render children", async () => {
  render(<Badge>Hello</Badge>);
  expect(await screen.findByText('Hello')).toBeInTheDocument();
});