'use client'

import Image from 'next/image'

import { SignIn, SignOut } from '@/components/core/Icons'
import LogoSVG from '@/assets/logo.svg'

import { routes, useGetCurrentRoute } from '../routes'
import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '@/components/core/Avatar'
import { getFirstName } from '@/utils/string'
import { useSignInModal } from '@/contexts/signIn'
import { SidebarItem } from './SidebarItem'
import { SignOutDialog } from '@/components/dialogs/SignOutDialog'

export const Sidebar = () => {
  const currentRoute = useGetCurrentRoute()
  const { data, status } = useSession()
  const { openSignInModal } = useSignInModal()

  const isAuthenticated = status === 'authenticated'
  const user = data?.user

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="flex h-full max-h-[calc(100vh-32px)] w-full flex-col items-center gap-16 rounded-lg bg-gray-700 px-12 py-10 shadow-primary-inner">
      <Image src={LogoSVG} alt="Bookwise" width={128} height={32} priority />

      <nav className="flex w-full flex-1 flex-col justify-start gap-6">
        {Object.values(routes)
          .filter((route) => isAuthenticated || !route.requireAuth)
          .map(({ path, icon, label }) => (
            <SidebarItem
              key={path}
              href={path}
              active={path === currentRoute?.path}
              icon={icon}
            >
              {label}
            </SidebarItem>
          ))}
      </nav>

      {isAuthenticated && user ? (
        <div className="flex w-full items-center justify-between">
          <Avatar
            src={user.avatar_url ?? ''}
            alt={user.name}
            size={32}
            name={getFirstName(user.name)}
          />
          <SignOutDialog>
            <button className="flex items-center rounded-sm p-1 font-bold transition-colors hover:bg-hover-white">
              <SignOut className="text-danger" size={20} />
            </button>
          </SignOutDialog>
        </div>
      ) : (
        <button
          onClick={openSignInModal}
          className="flex items-center gap-3 rounded-sm px-2 py-1 font-bold transition-colors hover:bg-hover-white"
        >
          Fazer login
          <SignIn className="text-green-100" size={20} />
        </button>
      )}
    </div>
  )
}
