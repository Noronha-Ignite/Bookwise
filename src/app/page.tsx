import { Hero } from './components/Hero'
import { Welcome } from './components/Welcome'

export default async function Landing() {
  return (
    <div className="grid h-screen grid-cols-[min(50%,700px),1fr] p-4 md:grid-cols-1">
      <Hero />
      <Welcome />
    </div>
  )
}
