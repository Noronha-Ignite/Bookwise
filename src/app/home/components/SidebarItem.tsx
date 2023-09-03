import Link, { LinkProps } from 'next/link'
import { IconProps } from 'phosphor-react'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type SidebarItemProps = {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  active?: boolean
} & PropsWithChildren &
  LinkProps

export const SidebarItem = ({
  children,
  icon: Icon,
  active,
  ...props
}: SidebarItemProps) => {
  return (
    <Link
      className={twMerge(
        'flex items-center gap-3 text-gray-400',
        'before:h-full before:w-1 before:rounded-full',
        'transition-colors hover:text-gray-100',
        active && 'text-gray-100 before:bg-gradient-vertical',
      )}
      {...props}
    >
      <Icon size={24} />
      {children}
    </Link>
  )
}
