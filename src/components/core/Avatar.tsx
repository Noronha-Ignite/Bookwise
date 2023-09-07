'use client'

import { RouteNames } from '@/app/home/routes'
import { getSocialName } from '@/utils/string'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'

type AvatarProps = {
  size?: number
  name?: string
  user?: User
} & ComponentProps<typeof Image>

export const Avatar = ({ size = 40, name, user, ...props }: AvatarProps) => {
  const { data } = useSession()

  const profileHref =
    data?.user.id === user?.id
      ? RouteNames.Profile
      : `${RouteNames.Profile}/${user?.id}`

  return (
    <Link
      href={user ? profileHref : '#'}
      className={!user ? 'pointer-events-none' : ''}
    >
      <div className="flex items-center justify-center gap-3 ">
        <div
          className="flex items-center justify-center gap-3 rounded-full bg-gradient-vertical"
          style={{
            width: size + 2,
            height: size + 2,
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            {...props}
            width={size}
            height={size}
            style={{
              width: size,
              height: size,
            }}
            className="rounded-full object-cover"
          />
        </div>
        {name && (
          <span className="text-xs font-bold leading-base text-gray-200">
            {getSocialName(name)}
          </span>
        )}
      </div>
    </Link>
  )
}
