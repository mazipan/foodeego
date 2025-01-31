// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import '@fontsource-variable/inter';
import './index.css';

import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { SWRConfig } from 'swr';

import { swrCache } from './lib/swr-cache.ts';

import { Layout } from './views/_layout.tsx';
import { Spinner } from './components/spinner.tsx';

const NotFound = lazy(() =>
  import('./views/NotFound.tsx').then((module) => ({
    default: module.NotFound,
  }))
);

const Home = lazy(() =>
  import('./views/Home.tsx').then((module) => ({
    default: module.Home,
  }))
);

export function App() {
  return (
    <SWRConfig
      value={{
        provider: swrCache,
      }}
    >
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-[350px] flex flex-col gap-6 items-center px-4 py-24">
              <Spinner size="lg" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SWRConfig>
  );
}
