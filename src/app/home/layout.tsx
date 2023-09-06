import { PropsWithChildren } from 'react'
import { Sidebar } from './components/Sidebar'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid h-screen max-h-screen grid-cols-[240px,1fr] justify-items-center gap-4 p-4">
      <Sidebar />

      <main className="no-scrollbar max-h-screen w-full max-w-5xl overflow-auto">
        {children}
      </main>
    </div>
  )
}
