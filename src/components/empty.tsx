import { FaceFrownIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

export function Empty({
  title,
  description,
  icon: Icon = FaceFrownIcon,
  action,
  className,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center justify-center space-y-6 bg-transparent p-16',
        className
      )}
      {...props}
    >
      <div className="mr-4 shrink-0 rounded-full border border-dashed p-4 border-slate-400 dark:border-slate-100">
        <Icon className="size-8 text-slate-400 dark:text-slate-100" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        {description ? (
          <p className="text-gray-700 dark:text-gray-400">{description}</p>
        ) : null}
      </div>
      {action ? action : null}
    </div>
  );
}
