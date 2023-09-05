import { PropsWithChildren } from 'react'
import { Sidebar } from './components/Sidebar'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid h-screen max-h-screen grid-cols-[240px,1fr] justify-items-center gap-4 p-4">
      <Sidebar />

      <main className="w-full max-w-5xl">{children}</main>
    </div>
  )
}
