'use client'

import { PropsWithChildren } from 'react'
import { useGetCurrentRoute } from '../routes'
import { SidebarDialog } from './SidebarDialog'
import { List } from '@/components/core/Icons'
import { twMerge } from 'tailwind-merge'

export const Header = ({ children }: PropsWithChildren) => {
  const currentRoute = useGetCurrentRoute()

  return (
    <header className="mb-10 mt-14 grid grid-cols-1 sm:grid-cols-[2fr,1fr] sm:gap-4">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 xl:hidden">
          <SidebarDialog>
            <button
              className={twMerge(
                'rounded-sm text-purple-100',
                'transition-colors hover:text-purple-50',
              )}
            >
              <List size={24} />
            </button>
          </SidebarDialog>
        </div>

        {currentRoute && (
          <div className="flex items-center gap-3 text-xl font-bold">
            <currentRoute.icon className="text-green-100" size={32} />
            {currentRoute.label}
          </div>
        )}
      </div>

      <div>{children}</div>
    </header>
  )
}
