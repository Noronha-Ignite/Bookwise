import { twMerge } from 'tailwind-merge'
import { Header } from '../components/Header'
import { SkeletonCard } from '@/components/core/SkeletonCard'
import { ProfileRatingsLoading } from './components/ProfileRatingsLoading'

export default function LoadingProfile() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-[2fr,1fr] gap-16">
        <ProfileRatingsLoading />

        <section className="flex h-fit flex-col gap-10 border-l border-gray-700 px-14">
          <header className="flex flex-col items-center">
            <SkeletonCard size={{ height: 72, width: 72 }} variant="rounded" />
            <SkeletonCard className="mt-5" variant="text" />
            <SkeletonCard variant="text" />
          </header>

          <div
            className={twMerge(
              'relative flex flex-col gap-10 py-13',
              'before:absolute before:left-1/2 before:top-0 before:h-1 before:w-8 before:-translate-x-1/2 before:rounded-full before:bg-gradient-horizontal',
            )}
          >
            <SkeletonCard size={{ height: 44 }} />
            <SkeletonCard size={{ height: 44 }} />
            <SkeletonCard size={{ height: 44 }} />
            <SkeletonCard size={{ height: 44 }} />
          </div>
        </section>
      </div>
    </>
  )
}
