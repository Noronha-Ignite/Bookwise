import { HTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const Scrollable = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      {...props}
      className={twMerge(
        'no-scrollbar h-full overflow-y-auto pb-16',
        className,
      )}
    >
      {children}
    </div>
  )
}
