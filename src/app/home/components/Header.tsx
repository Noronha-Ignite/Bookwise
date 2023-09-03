'use client'

import { useGetCurrentRoute } from '../routes'

export const Header = () => {
  const { icon: Icon, label } = useGetCurrentRoute()

  return (
    <header className="mb-10 mt-14 flex items-center gap-3 text-xl font-bold">
      <Icon className="text-green-100" size={32} />
      {label}
    </header>
  )
}
