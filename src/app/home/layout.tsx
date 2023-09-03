import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid h-screen grid-cols-[240px,1fr] p-4 md:grid-cols-1">
      <Sidebar />

      <main>{children}</main>
    </div>
  )
}
