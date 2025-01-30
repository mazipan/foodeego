import { expect, test } from 'vitest';
import { swrCache } from '../swr-cache';

test('SWR Cache > Get set and delete', async () => {
  const cache = swrCache()
  cache.set('foo', {
    data: 'bar',
  });

  expect(cache.get('foo')).toStrictEqual({ data: 'bar'});
  cache.delete('foo');
  expect(cache.get('foo')).toBeFalsy();
});
