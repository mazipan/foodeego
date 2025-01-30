import clsx from 'clsx';
import React from 'react';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400 disabled:dark:bg-blue-500 flex items-center gap-1 justify-center',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export { Button };
