import { expect, test } from 'vitest';
import { chunk, formatRating, generateSearchParam } from '../utils';

test.each([
  [4.0, '4'],
  [4.91765, '4.9'],
  [3.42678, '3.4'],
  [0.00678, '0'],
  [0.09, '0.1'],
  [0.07, '0.1'],
  [0.05, '0.1'],
  [0.01, '0'],
  [0.01, '0'],
])('formatRating(%s) should return %s', (input, expected) => {
  expect(formatRating(input)).toBe(expected);
});

test.each([
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    2,
    [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ],
  ],
  [
    [1, 2, 3, 4, 5],
    3,
    [
      [1, 2, 3],
      [4, 5],
    ],
  ],
])('chunk(%s, %s) should return %s', (input, num, expected) => {
  expect(chunk(input, num)).toStrictEqual(expected);
});

test.each([
  ['something', 'all', '?s=something'],
  ['something', '', '?s=something'],
  ['something', '123', '?s=something&cat=123'],
  ['', '123', '?cat=123'],
  ['', 'all', ''],
  ['', '', ''],
])('generateSearchParam(%s, %s) should return %s', (keyword, catID, expected) => {
  expect(generateSearchParam(keyword, catID)).toBe(expected);
});
