'use client'

import { PropsWithChildren } from 'react'
import { useGetCurrentRoute } from '../routes'
import { SidebarDialog } from './SidebarDialog'
import { List } from '@/components/core/Icons'
import { twMerge } from 'tailwind-merge'

export const Header = ({ children }: PropsWithChildren) => {
  const currentRoute = useGetCurrentRoute()

  const marginToContent = children ? 'mb-40' : 'mb-28'

  return (
    <div className={twMerge(marginToContent, 'relative xl:mb-4')}>
      <header
        className={twMerge(
          'fixed left-0 top-0 flex w-full items-center justify-center bg-gray-800 px-4 py-7 xs:px-16',
          'xl:static xl:mx-0 xl:translate-x-0 xl:px-0 xl:py-4',
        )}
      >
        <div
          className={twMerge(
            'grid w-full max-w-5xl grid-cols-1 gap-4',
            'sm:grid-cols-[2fr,1fr]',
          )}
        >
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
        </div>
      </header>
    </div>
  )
}
