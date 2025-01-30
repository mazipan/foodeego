import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { chunk } from '../lib/utils';

const ENDPOINT = {
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

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    ENDPOINT.CATEGORIES,
    fetcher
  );

  return {
    categories: data,
    isLoading,
    isError: error,
  };
}

export type Food = {
  id: string;
  index: number;
  rating: number;
  promotion: string;
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
export function useFoods() {
  const [originFood, setOriginFoods] = useState<Food[]>([]);
  const [paginateFood, setPaginateFoods] = useState<Array<Food[]>>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const { data, error, isLoading } = useSWR<Foods>(ENDPOINT.FOOD, fetcher);

  const filter = (keyword: string, categoryId: string) => {
    let match: Food[] = [];
    if (categoryId !== 'all') {
      match = originFood.filter((food) => {
        return (
          food.categoryId.includes(categoryId) &&
          food.name.toLowerCase().includes(keyword.toLowerCase())
        );
      });
    } else {
      match = originFood.filter((food) => {
        return food.name.toLowerCase().includes(keyword.toLowerCase());
      });
    }

    const paginate = chunk(match || [], LIMIT);

    setPaginateFoods(paginate);
    setFoods(paginate[0] || []);

    setPage(0);
    if (paginate.length > 1) {
      setHasNext(true);
    }
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
      setOriginFoods(data?.foods || []);
      const paginate = chunk(data?.foods || [], LIMIT);
      setPaginateFoods(paginate);
      setFoods(paginate[0] || []);
    }
  }, [isLoading, error, data]);

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
