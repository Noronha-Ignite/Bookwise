'use client'

import Image from 'next/image'

import { SignIn } from '@/components/Icons'
import LogoSVG from '@/assets/logo.svg'

import { SidebarItem } from './SidebarItem'
import { routes, useGetCurrentRoute } from '../routes'

export const Sidebar = () => {
  const currentRoute = useGetCurrentRoute()

  return (
    <div className="flex h-full max-h-[calc(100vh-32px)] w-full flex-col items-center gap-16 rounded-lg bg-gray-700 px-12 py-10 shadow-primary-inner">
      <Image src={LogoSVG} alt="Bookwise" width={128} height={32} />

      <nav className="flex w-full flex-1 flex-col justify-start gap-6">
        {Object.values(routes).map(({ path, icon, label }) => (
          <SidebarItem
            key={path}
            href={path}
            active={path === currentRoute.path}
            icon={icon}
          >
            {label}
          </SidebarItem>
        ))}
      </nav>

      <button className="flex items-center gap-3 rounded-sm px-2 py-1 font-bold transition-colors hover:bg-hover-white ">
        Fazer login
        <SignIn className="text-green-100" size={20} />
      </button>
    </div>
  )
}
