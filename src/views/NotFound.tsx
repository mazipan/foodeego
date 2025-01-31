import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Badge } from '../components/badge';

export function NotFound() {
  return (
    <article className="container min-h-[400px] mx-auto space-y-4 p-4 flex flex-col justify-center items-center py-16">
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge className="bg-yellow-100 text-yellow-500">ERROR 404</Badge>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-green-500 inline-block text-transparent bg-clip-text hover:from-green-500 hover:to-red-500 transition-colors duration-500">
            It's Empty Here!
          </h2>
          <p className="text-lg md:text-2xl text-gray-400 dark:text-gray-500">
            Looks like this page can not be found. <br /> Maybe it was removed,
            renamed or temporary unavailable.
          </p>
          <img
            src="/404.png"
            alt="404 error with person looking for disproportionate"
            loading="lazy"
            className="object-cover w-auto max-h-[200px] md:max-h-[300px] mt-8"
          />
          <a
            href="/"
            className="mt-8 flex justify-center gap-2 hover:underline"
          >
            <ArrowLeftIcon className="size-6" />
            Back to home
          </a>
        </div>
      </div>
    </article>
  );
}
