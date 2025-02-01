import { expect, test, describe } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { _internalFindFoods, useCategories, useFoods } from '../useData';
import {
  MOCK_CATEGORIES_RESPONSE,
  MOCK_FOOD_FIRST_PAGE,
  MOCK_FOOD_RESPONSE,
  mockErrorResponse,
  mockSuccessResponse,
} from '../mock';

describe('useCategories', () => {
  test('return error', async () => {
    mockErrorResponse();

    const { result } = renderHook(() => useCategories());

    await waitFor(() =>
      expect(result.current.isError.message).toStrictEqual(
        'something awful happened'
      )
    );
  });

  test('return success mock data', async () => {
    mockSuccessResponse();

    const { result } = renderHook(() => useCategories());

    await waitFor(() =>
      expect(result.current.categories).toStrictEqual(MOCK_CATEGORIES_RESPONSE)
    );
  });
});

describe('useFoods', () => {
  test('return error', async () => {
    mockErrorResponse();

    const { result } = renderHook(() =>
      useFoods({ initialCategory: 'all', initialKeyword: '' })
    );

    await waitFor(() =>
      expect(result.current.isError.message).toStrictEqual(
        'something awful happened'
      )
    );
  });

  test('return success mock data', async () => {
    mockSuccessResponse();

    const { result } = renderHook(() =>
      useFoods({ initialCategory: 'all', initialKeyword: '' })
    );

    await waitFor(() => {
      expect(result.current.origin.length).toBe(
        MOCK_FOOD_RESPONSE.foods.length
      );
      expect(result.current.hasNext).toBe(true);
      expect(result.current.foods).toStrictEqual(MOCK_FOOD_FIRST_PAGE);
    });
  });

  test('return success mock data with initial filters applied', async () => {
    mockSuccessResponse();

    const { result } = renderHook(() =>
      useFoods({
        initialCategory: '6288a89f1f0152b8c2cd512b',
        initialKeyword: 'Quinex Shushi',
      })
    );

    await waitFor(() => {
      expect(result.current.foods.length).toBe(1);
      expect(result.current.foods).toStrictEqual([MOCK_FOOD_FIRST_PAGE[2]]);
    });
  });

  test('return success then trigger filter', async () => {
    mockSuccessResponse();

    const { result } = renderHook(() =>
      useFoods({ initialCategory: 'all', initialKeyword: '' })
    );

    await waitFor(() => {
      expect(result.current.foods).toStrictEqual(MOCK_FOOD_FIRST_PAGE);
      // Trigger filter to show first element
      result.current.filter('Niquent Drinks', 'all');
    });

    await waitFor(() => {
      // Only show the first element
      expect(result.current.foods).toStrictEqual([MOCK_FOOD_FIRST_PAGE[0]]);

      // Trigger filter to show second element
      result.current.filter('Boilicon Shushi', '6288a89f1f0152b8c2cd512b');
    });

    await waitFor(() => {
      // Only show the first element
      expect(result.current.foods).toStrictEqual([MOCK_FOOD_FIRST_PAGE[1]]);
    });
  });

  test('return success then load the next page', async () => {
    mockSuccessResponse();

    const { result } = renderHook(() =>
      useFoods({ initialCategory: 'all', initialKeyword: '' })
    );

    await waitFor(() => {
      expect(result.current.foods.length).toStrictEqual(9);
      // Trigger load more data -- trigger page 2
      result.current.onLoadMore();
    });

    await waitFor(() => {
      expect(result.current.foods.length).toStrictEqual(18);
      // Trigger load more data -- trigger page 3 (only have 1 element)
      result.current.onLoadMore();
    });

    await waitFor(() => {
      expect(result.current.foods.length).toStrictEqual(19);
    });
  });
});

describe('_internalFindFoods', () => {
  test('should not filter anything', async () => {
    const res = _internalFindFoods(MOCK_FOOD_FIRST_PAGE, '', 'all');
    expect(res[0][0]).toStrictEqual(MOCK_FOOD_FIRST_PAGE[0])
  });

  test('should filter with keyword only', async () => {
    const res = _internalFindFoods(MOCK_FOOD_FIRST_PAGE, 'Shushi', 'all');
    expect(res[0][0]).toStrictEqual(MOCK_FOOD_FIRST_PAGE[1])
  });

  test('should filter with keyword and category', async () => {
    const res = _internalFindFoods(MOCK_FOOD_FIRST_PAGE, 'kle', '6288a89f7338764f2071a8a8');
    expect(res[0][0]).toStrictEqual(MOCK_FOOD_FIRST_PAGE[3])
  });
});
