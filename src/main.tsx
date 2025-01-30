import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css';

import { swrCache } from './lib/swr-cache.ts';
import Home from './views/Home.tsx';
import { Layout } from './views/layout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRConfig
      value={{
        provider: swrCache,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  </StrictMode>
);
