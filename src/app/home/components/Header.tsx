'use client'

import { PropsWithChildren } from 'react'
import { useGetCurrentRoute } from '../routes'

export const Header = ({ children }: PropsWithChildren) => {
  const currentRoute = useGetCurrentRoute()

  return (
    <header className="mb-10 mt-14 grid grid-cols-[2fr,1fr]">
      {currentRoute && (
        <div className="flex items-center gap-3 text-xl font-bold">
          <currentRoute.icon className="text-green-100" size={32} />
          {currentRoute.label}
        </div>
      )}

      <div>{children}</div>
    </header>
  )
}
