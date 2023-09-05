import { HTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type BoxProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    variant?: 'normal' | 'small'
  }

export const Box = ({
  children,
  variant = 'normal',
  className,
  ...props
}: BoxProps) => {
  return (
    <div
      className={twMerge(
        'rounded-md bg-gray-700',
        variant === 'normal' && 'p-6',
        variant === 'small' && 'p-5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
