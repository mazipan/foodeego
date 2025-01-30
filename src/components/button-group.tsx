import clsx from 'clsx';

type Props = {
  items: {
    id: string;
    name: string;
    onClick: () => void;
    isActive?: boolean;
  }[];
};

export function ButtonGroup({ items }: Props) {
  return (
    <div className="inline-flex flex-wrap rounded-md gap-2 py-1" role="group">
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          data-key={item.id}
          data-active={item.isActive}
          onClick={item.onClick}
          className={clsx(
            'px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white cursor-pointer shadow-xs data-[active=true]:bg-blue-700 data-[active=true]:text-white'
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
