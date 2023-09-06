import { ComponentProps } from 'react'
import { Box } from './core/Box'
import { twMerge } from 'tailwind-merge'

type SkeletonCardProps = {
  variant?: 'box' | 'text' | 'rounded'
  size?: {
    width?: number
    height?: number
  }
} & Omit<ComponentProps<typeof Box>, 'variant'>

export const SkeletonCard = ({
  className,
  variant = 'box',
  size,
  ...props
}: SkeletonCardProps) => {
  return (
    <Box
      {...props}
      style={{ height: size?.height, width: size?.width }}
      className={twMerge(
        className,
        `relative h-full w-full overflow-hidden`,
        variant === 'text' && `h-4 w-full p-0`,
        variant === 'rounded' && 'rounded-full',
        'after:absolute after:bottom-0  after:left-0 after:right-0 after:top-0 after:-translate-x-full after:animate-shimmer after:bg-gradient-shimmer',
      )}
    />
  )
}
