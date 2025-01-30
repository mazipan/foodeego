
import { expect, test } from 'vitest';
import {
  render,
  screen,
} from "@testing-library/react";
import { Button } from '../button';


test("Button > render children", async () => {
  render(<Button>Hello</Button>);
  expect(await screen.findByText('Hello')).toBeInTheDocument();
});