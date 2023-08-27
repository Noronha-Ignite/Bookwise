import { Nunito } from 'next/font/google'
import { Suspense } from 'react'

import './global.css'
import { twMerge } from 'tailwind-merge'

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
          'bg-gray-800 text-gray-100 min-w-[240px]',
          nunito.className,
        )}
      >
        <Suspense>{children}</Suspense>
      </body>
    </html>
  )
}
