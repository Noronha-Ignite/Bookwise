import { HTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type BoxProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    variant?: 'normal' | 'small' | 'big'
    clickable?: boolean
  }

export const Box = ({
  children,
  variant = 'normal',
  className,
  clickable = false,
  ...props
}: BoxProps) => {
  return (
    <div
      className={twMerge(
        'rounded-md border-2 border-transparent bg-gray-700',
        variant === 'big' && 'p-8',
        variant === 'normal' && 'p-6',
        variant === 'small' && 'p-5',
        clickable && 'cursor-pointer hover:border-gray-500 hover:bg-gray-600',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
