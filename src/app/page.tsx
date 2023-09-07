import { getSessionSSR } from '@/lib/auth/authOptions'
import { Hero } from './components/Hero'
import { Welcome } from './components/Welcome'
import { redirect } from 'next/navigation'
import { RouteNames } from './home/routes'

export default async function Landing() {
  const session = await getSessionSSR()

  if (session?.user) {
    redirect(RouteNames.Home)
  }

  return (
    <div className="grid h-screen grid-cols-[min(50%,700px),1fr] p-4 md:grid-cols-1">
      <Hero />
      <Welcome />
    </div>
  )
}
