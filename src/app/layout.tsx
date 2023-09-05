import './global.css'
import 'dayjs/locale/pt-br'

import { Nunito } from 'next/font/google'
import { Suspense } from 'react'

import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import { QueryProvider } from '@/lib/queryClient'

dayjs.locale('pt-br')
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Bookwise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          'min-w-[240px] bg-gray-800 text-gray-100',
          nunito.className,
        )}
      >
        <QueryProvider>
          <Suspense>{children}</Suspense>
        </QueryProvider>
      </body>
    </html>
  )
}
