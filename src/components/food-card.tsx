import { Food } from '../hooks/useData';
import { formatRating } from '../lib/utils';
import { Badge } from './badge';
import { GiftIcon, StarIcon } from '@heroicons/react/16/solid';

export function FoodCard({ food }: { food: Food }) {
  return (
    <div
      key={food.id}
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#" className="relative">
        <img
          className="rounded-t-lg max-h-[200px] w-full object-cover"
          src={food.imageUrl}
          alt={food.name}
          loading='lazy'
        />

        {food.promotion === 'gift' && (
          <Badge className="absolute top-0 left-0 rounded-tl-lg rounded-tr-none  rounded-bl-none rounded-br-lg px-3 py-1 bg-sky-500 text-white dark:bg-sky-500 dark:text-white">
            <GiftIcon className="size-5" />
            <span className="sr-only">Gift</span>
          </Badge>
        )}

        {food.promotion === 'discount' && (
          <Badge className="absolute top-0 left-0 rounded-tl-lg rounded-tr-none  rounded-bl-none rounded-br-lg px-3 py-1 bg-red-400 text-white dark:bg-red-400 dark:text-white">
            <span className="text-sm">%</span>
          </Badge>
        )}

        {food.promotion === '1+1' && (
          <Badge className="absolute top-0 left-0 rounded-tl-lg rounded-tr-none  rounded-bl-none rounded-br-lg px-3 py-1 bg-violet-600 text-white dark:bg-violet-600 dark:text-white">
            <span className="text-sm">1+1</span>
          </Badge>
        )}
      </a>

      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {food.name}
          </h5>
        </a>

        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 inline-flex flex-wrap gap-1">
          <Badge>
            <StarIcon className="size-3" />
            {formatRating(food.rating)}
          </Badge>
          <Badge>
            {food.minCookTime}-{food.maxCookTime} min
          </Badge>
          {food.isNew && <Badge className="text-green-500 dark:text-green-500">New</Badge>}
        </div>
      </div>
    </div>
  );
}
