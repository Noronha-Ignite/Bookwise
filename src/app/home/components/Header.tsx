'use client'

import { PropsWithChildren } from 'react'
import { useGetCurrentRoute } from '../routes'

export const Header = ({ children }: PropsWithChildren) => {
  const { icon: Icon, label } = useGetCurrentRoute()

  return (
    <header className="mb-10 mt-14 grid grid-cols-[2fr,1fr]">
      <div className="flex items-center gap-3 text-xl font-bold">
        <Icon className="text-green-100" size={32} />
        {label}
      </div>

      <div>{children}</div>
    </header>
  )
}
