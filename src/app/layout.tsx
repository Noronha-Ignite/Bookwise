import './global.css'
import 'dayjs/locale/pt-br'

import { Nunito } from 'next/font/google'
import { Suspense } from 'react'

import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import { QueryProvider } from '@/contexts/queryClient'
import { AuthSessionProvider } from '@/contexts/session'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/authOptions'
import { SignInModalProvider } from '@/contexts/signIn'

dayjs.locale('pt-br')
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Bookwise',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body
        className={twMerge(
          'min-w-[240px] bg-gray-800 text-gray-100',
          nunito.className,
        )}
      >
        <AuthSessionProvider session={session}>
          <QueryProvider>
            <SignInModalProvider>
              <Suspense>{children}</Suspense>
            </SignInModalProvider>
          </QueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
