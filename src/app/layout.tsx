import './global.css'
import './locale'

import { Nunito } from 'next/font/google'
import { Suspense } from 'react'

import { twMerge } from 'tailwind-merge'
import { QueryProvider } from '@/contexts/queryClient'
import { AuthSessionProvider } from '@/contexts/session'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/authOptions'
import { SignInModalProvider } from '@/contexts/signIn'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] })

export const dynamic = 'force-dynamic'

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
          'min-w-[430px] bg-gray-800 text-gray-100',
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
