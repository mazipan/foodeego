import { FormEvent, ReactNode, useRef, useState } from 'react';
import { Category, useCategories, useFoods } from '../hooks/useData';
import { ButtonGroup } from '../components/button-group';
import { Spinner } from '../components/spinner';
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/16/solid';
import { FoodCard } from '../components/food-card';
import { Empty } from '../components/empty';
import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '../components/button';
import { generateSearchParam } from '../lib/utils';

function Layout({ children }: { children: ReactNode }) {
  return (
    <article className="container mx-auto space-y-4 p-4">
      <div className="space-y-4">{children}</div>
    </article>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchInput = useRef<HTMLInputElement>(null);

  const initialQuerySearchValue = searchParams.get('s') || '';
  const initialQueryCategoryValue = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(
    initialQueryCategoryValue
  );

  const catResponses = useCategories();
  const foodResponse = useFoods({
    initialCategory: initialQueryCategoryValue,
    initialKeyword: initialQuerySearchValue,
  });

  if (catResponses.isLoading || foodResponse.isLoading) {
    return (
      <Layout>
        <div className="min-h-[350px] w-full flex flex-col gap-6 items-center px-4 py-24">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (catResponses.isError || foodResponse.isError) {
    return (
      <Layout>
        <Empty
          title="Error when loading the data."
          description="Please refresh your browser or try again later."
        />
      </Layout>
    );
  }

  const handleSubmitSearch = (e: FormEvent) => {
    e.preventDefault();

    const keyword = searchInput.current?.value || '';
    foodResponse.filter(keyword, selectedCategory);

    const sp = generateSearchParam(keyword, selectedCategory);
    navigate(sp);
  };

  const handleClickCategory = (cat: Category) => {
    const keyword = searchInput.current?.value || '';

    setSelectedCategory(cat.id);
    foodResponse.filter(keyword, cat.id);

    const sp = generateSearchParam(keyword, cat.id);
    navigate(sp);
  };

  const handleResetFilter = () => {
    setSelectedCategory('all');
    foodResponse.filter('', 'all');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    searchInput.current.value = '';
    navigate('');
  };

  return (
    <Layout>
      <form
        className="w-full flex items-center gap-2"
        onSubmit={handleSubmitSearch}
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {/* HeroIcons -- Search */}
            <MagnifyingGlassIcon className="size-6 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            name="s"
            id="search_keyword"
            ref={searchInput}
            defaultValue={initialQuerySearchValue}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
            placeholder="Enter restaurant name..."
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <ButtonGroup
        className="overflow-y-auto w-full px-2"
        items={[
          { id: 'all', name: 'All', isActive: selectedCategory === 'all' },
          ...catResponses.categories,
        ].map((cat) => {
          return {
            ...cat,
            isActive: selectedCategory === cat.id,
            onClick: () => {
              handleClickCategory(cat);
            },
          };
        })}
      />

      {foodResponse.foods.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {foodResponse.foods.map((food) => (
              <FoodCard food={food} key={food.id} />
            ))}
          </div>
          <div className="w-full flex">
            <Button
              onClick={foodResponse.onLoadMore}
              type="button"
              disabled={!foodResponse.hasNext}
              className="w-full"
            >
              <PlusIcon className="size-6" /> Show More
            </Button>
          </div>
        </>
      ) : (
        <Empty
          title="Can not found any data here."
          description="Please reset your search or filters."
          action={
            <Button type="button" onClick={handleResetFilter}>
              <ArrowPathIcon className="size-6" />
              Reset Filter
            </Button>
          }
        />
      )}
    </Layout>
  );
}
