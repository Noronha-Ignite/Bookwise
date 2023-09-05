import NextLink from 'next/link'
import { Icon } from 'phosphor-react'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type LinkProps = {
  rightIcon?: Icon
  leftIcon?: Icon
} & PropsWithChildren

export const Link = ({
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  children,
}: LinkProps) => (
  <NextLink
    href="/home"
    className={twMerge(
      'flex items-center gap-2 rounded-sm text-xs font-bold leading-base text-purple-100',
      'hover:shadow-outline-purple hover:bg-hover-purple',
    )}
  >
    {LeftIcon && <LeftIcon size={16} />}
    {children}
    {RightIcon && <RightIcon size={16} />}
  </NextLink>
)
