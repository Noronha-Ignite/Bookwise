import NextLink, { LinkProps } from 'next/link'

import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import { Icon } from '@/components/core/Icons'

type LinkComponentProps = {
  rightIcon?: Icon
  leftIcon?: Icon
  variant?: 'colored' | 'white'
} & LinkProps

export const Link = ({
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  children,
  variant = 'colored',
  ...props
}: PropsWithChildren<LinkComponentProps>) => (
  <NextLink
    {...props}
    className={twMerge(
      'flex items-center gap-2 rounded-sm text-xs font-bold leading-base text-purple-100',
      'hover:bg-hover-purple hover:shadow-outline-purple',
      variant === 'white' && 'text-gray-200',
    )}
  >
    {LeftIcon && <LeftIcon size={16} />}
    {children}
    {RightIcon && <RightIcon size={16} />}
  </NextLink>
)
