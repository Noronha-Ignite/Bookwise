import { PropsWithChildren } from 'react'
import { Sidebar } from './components/Sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'BookWise',
    template: '%s | BookWise',
  },
}

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid h-screen max-h-screen grid-cols-1 justify-items-center gap-4 px-4 xs:px-16 xl:grid-cols-[240px,1fr] xl:p-4">
      <div className="hidden xl:block">
        <Sidebar />
      </div>

      <main className="no-scrollbar max-h-screen w-full max-w-5xl overflow-auto pb-8">
        {children}
      </main>
    </div>
  )
}
