import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { NavLink, Outlet } from 'react-router';
import { ThemeProvider, useTheme } from '../components/theme-provider';

function Header() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <header className="w-full border-b border-gray-300 dark:border-gray-600">
      <section className="container mx-auto flex justify-between px-4 py-2 items-center gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-200 hover:dark:bg-slate-700"
        >
          <img src="/favicon/favicon-32x32.png" />
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-green-500 inline-block text-transparent bg-clip-text hover:from-green-500 hover:to-red-500 transition-colors duration-500">
            Foodeego
          </h1>
        </NavLink>
        <div className="flex items-center gap-2">
          <button
            role="button"
            data-current-theme={theme}
            onClick={toggleTheme}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-200 hover:dark:bg-slate-700 cursor-pointer text-slate-900 dark:text-slate-200"
          >
            <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <SunIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>
          <a
            href="https://github.com/mazipan/foodeego"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-200 hover:dark:bg-slate-700"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[1.2rem] w-[1.2rem] fill-slate-900 dark:fill-slate-200"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
              ></path>
            </svg>
          </a>
        </div>
      </section>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full">
      <section className="container mx-auto px-4 text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          © 2025. By{' '}
          <a
            className="hover:underline"
            href="https://www.mazipan.space/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Irfan Maulana
          </a>
        </p>
      </section>
    </footer>
  );
}

function Layout() {
  return (
    <ThemeProvider>
      <main id="main">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

Footer.displayName = 'Footer';
Header.displayName = 'Header';
Layout.displayName = 'Layout';

export { Layout, Header, Footer };
