import { PropsWithChildren } from 'react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid h-screen grid-cols-[240px,1fr] justify-items-center gap-4 p-4">
      <Sidebar />

      <main className="w-full max-w-5xl">
        <Header />
        {children}
      </main>
    </div>
  )
}
