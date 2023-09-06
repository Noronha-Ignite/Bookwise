'use client'

import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

type AuthSessionProviderProps = {
  session: Session | null
}

export const AuthSessionProvider = ({
  children,
  session,
}: PropsWithChildren<AuthSessionProviderProps>) => (
  <SessionProvider session={session}>{children}</SessionProvider>
)
