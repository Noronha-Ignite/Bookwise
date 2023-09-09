import './global.css'
import './locale'
import 'react-toastify/dist/ReactToastify.css'

import { Nunito } from 'next/font/google'
import { Suspense } from 'react'

import { twMerge } from 'tailwind-merge'
import { QueryProvider } from '@/contexts/queryClient'
import { AuthSessionProvider } from '@/contexts/session'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/authOptions'
import { SignInModalProvider } from '@/contexts/signIn'
import { ToastContainer } from 'react-toastify'

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
          'min-w-[360px] bg-gray-800 text-gray-100',
          nunito.className,
        )}
      >
        <AuthSessionProvider session={session}>
          <QueryProvider>
            <SignInModalProvider>
              <Suspense>{children}</Suspense>

              <ToastContainer
                position="bottom-right"
                closeButton={false}
                limit={3}
                hideProgressBar
                autoClose={2000}
              />
            </SignInModalProvider>
          </QueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
