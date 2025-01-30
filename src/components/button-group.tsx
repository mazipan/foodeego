import clsx from 'clsx';
import React from 'react';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  itemClassName?: string;
  items: {
    id: string;
    name: string;
    onClick: () => void;
    isActive?: boolean;
  }[];
}

const ButtonGroup = React.forwardRef<HTMLDivElement, Props>(
  ({ className = '', itemClassName = '', items, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('inline-flex rounded-md gap-2 py-1', className)}
      role="group"
      {...props}
    >
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          data-key={item.id}
          data-active={item.isActive}
          onClick={item.onClick}
          className={clsx(
            'px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white cursor-pointer shadow-xs data-[active=true]:bg-blue-700 data-[active=true]:text-white',
            itemClassName
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
);

ButtonGroup.displayName = 'ButtonGroup';
export { ButtonGroup };
