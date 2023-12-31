'use client'

import Image from 'next/image'
import Link from 'next/link'

import GoogleSVG from '@/assets/google.svg'
import GithubSVG from '@/assets/github.svg'
import RocketSVG from '@/assets/rocket.svg'
import { RouteNames } from '../home/routes'
import { signIn } from 'next-auth/react'

export const Actions = () => {
  const handleConnect = async (provider: 'google' | 'github') => {
    try {
      await signIn(provider, {
        callbackUrl: RouteNames.Home,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <button
        onClick={() => handleConnect('google')}
        className="flex w-full items-center gap-3 rounded-md bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500"
      >
        <Image src={GoogleSVG} alt="Google" width={32} height={32} />
        <span className="text-md font-bold leading-base">
          Entrar com Google
        </span>
      </button>
      <button
        onClick={() => handleConnect('github')}
        className="flex w-full items-center gap-5 rounded-md bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500 xs:gap-3"
      >
        <Image src={GithubSVG} alt="Github" width={32} height={32} />
        <span className="text-md font-bold leading-base">
          Entrar com GitHub
        </span>
      </button>
      <Link
        prefetch
        href={RouteNames.Home}
        className="flex w-full items-center gap-5 rounded-md bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500 xs:gap-3"
      >
        <Image
          src={RocketSVG}
          alt="Rocket"
          width={32}
          height={32}
          className="xs:h-6 xs:w-6"
        />
        <span className="text-md font-bold leading-base">
          Acessar como visitante
        </span>
      </Link>
    </div>
  )
}
