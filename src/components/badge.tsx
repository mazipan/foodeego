import clsx from 'clsx';
import React, { ReactNode } from 'react';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', children, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx(
        'inline-flex gap-1 items-center bg-gray-100 text-gray-800 text-xs font-medium rounded-sm dark:bg-gray-700 dark:text-gray-300 px-1.5 py-0.5',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';

export { Badge };
