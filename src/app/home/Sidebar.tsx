'use client'

import Image from 'next/image'
import { Binoculars, ChartLineUp, SignIn } from 'phosphor-react'
import { usePathname } from 'next/navigation'
import LogoSVG from '@/assets/logo.svg'

import { SidebarItem } from './SidebarItem'

const routes = [
  { path: '/home', label: 'Início', icon: ChartLineUp },
  { path: '/home/explore', label: 'Explorar', icon: Binoculars },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="shadow-primary-inner flex h-full flex-col items-center gap-16 rounded-lg bg-gray-700 px-12 py-10">
      <Image src={LogoSVG} alt="Bookwise" width={128} height={32} />

      <nav className="flex w-full flex-1 flex-col justify-start gap-6">
        {routes.map(({ path, icon, label }) => (
          <SidebarItem
            key={path}
            href={path}
            active={path === pathname}
            icon={icon}
          >
            {label}
          </SidebarItem>
        ))}
      </nav>

      <button className="flex items-center gap-3 rounded-sm font-bold  hover:outline hover:outline-1 hover:outline-offset-8 hover:outline-gray-100">
        Fazer login
        <SignIn className="text-green-100" size={20} />
      </button>
    </div>
  )
}
