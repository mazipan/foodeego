import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { chunk } from '../lib/utils';

export const ENDPOINT = {
  CATEGORIES:
    'https://gist.githubusercontent.com/wilson-wego/f7381fcead7a47a7df257a97a033456a/raw/33cd31ce75ba72a809d48944463b53b74b9ccae8/categories.json',
  FOOD: 'https://gist.githubusercontent.com/wilson-wego/8311b463cd331099e34a1f251dad4cbf/raw/f1b04f9afe0fcc0c9270cb486b927641b7d27436/food.json',
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export type Category = {
  id: string;
  name: string;
};

export type Food = {
  id: string;
  index: number;
  rating: number;
  promotion: string | null;
  isNew: boolean;
  categoryId: string;
  minCookTime: number;
  maxCookTime: number;
  restaurant: string;
  name: string;
  imageUrl: string;
};

export type Foods = {
  foods: Food[];
};

const LIMIT = 9;

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    ENDPOINT.CATEGORIES,
    fetcher
  );

  return {
    categories: data || [],
    isLoading,
    isError: error,
  };
}

const _isFoodContainsCategoryId = (food: Food, categoryId: string) => {
  return food.categoryId === categoryId;
}

const _isFoodContainsKeyword = (food: Food, keyword: string) => {
  if (keyword) {
    const RGX = new RegExp(keyword, "i")
    return RGX.test(food.name)
  }

  return true
}

export const _internalFindFoods = (
  orArray: Food[],
  keyword: string,
  categoryId: string
) => {
  let match: Food[] = [];

  // Doesn't need to filter anything
  if (categoryId === 'all' && keyword === '') {
    const paginate = chunk(orArray || [], LIMIT);
    return paginate;
  }

  if (categoryId !== 'all') {
    match = orArray.filter((food) => {
      return (
        _isFoodContainsCategoryId(food, categoryId) &&
        _isFoodContainsKeyword(food, keyword)
      );
    });
  } else {
    match = orArray.filter((food) => {
      return _isFoodContainsKeyword(food, keyword);
    });
  }

  const paginate = chunk(match || [], LIMIT);
  return paginate;
};

export function useFoods({
  initialKeyword,
  initialCategory,
}: {
  initialKeyword: string;
  initialCategory: string;
}) {
  const [originFood, setOriginFoods] = useState<Food[]>([]);
  const [paginateFood, setPaginateFoods] = useState<Array<Food[]>>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const { data, error, isLoading } = useSWR<Foods>(ENDPOINT.FOOD, fetcher);

  const _execFilter = (
    orArray: Food[],
    keyword: string,
    categoryId: string
  ) => {
    const paginatedResult = _internalFindFoods(orArray, keyword, categoryId);

    setPaginateFoods(paginatedResult);
    setFoods(paginatedResult?.[0] || []);

    setPage(0);
    if (paginatedResult.length > 1) {
      setHasNext(true);
    }
  };

  const filter = (keyword: string, categoryId: string) => {
    _execFilter(originFood, keyword, categoryId);
  };

  const onLoadMore = () => {
    const nextPage = page + 1;
    if (nextPage >= paginateFood.length - 1) {
      setHasNext(false);
    }

    if (nextPage < paginateFood.length) {
      let mergedFood: Food[] = [];
      for (let index = 0; index < paginateFood.length; index++) {
        const f = paginateFood[index];
        if (index <= nextPage) {
          mergedFood = [...mergedFood, ...f];
        }
      }

      setFoods(mergedFood || []);
      setPage(nextPage);
    }
  };

  // Set initial data to internal state
  useEffect(() => {
    if (!isLoading && !error) {
      const dOrigin = data?.foods || [];
      setOriginFoods(dOrigin);

      // Read the initial value here
      if (initialCategory !== 'all' || initialKeyword !== '') {
        _execFilter(dOrigin, initialKeyword, initialCategory);
      } else {
        const paginate = chunk(dOrigin, LIMIT);
        setPaginateFoods(paginate);
        setFoods(paginate[0] || []);
      }
    }
  }, [isLoading, error, data, initialCategory, initialKeyword]);

  return {
    origin: originFood,
    isLoading,
    isError: error,
    foods,
    paginateFood,
    filter,
    onLoadMore,
    page,
    hasNext,
  };
}
