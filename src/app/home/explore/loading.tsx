import { Header } from '../components/Header'
import { LoadingBookCard } from '@/components/BookCard/loading'
import { SkeletonCard } from '@/components/core/SkeletonCard'
import { twMerge } from 'tailwind-merge'
import { CategorySelectTab } from './components/CategorySelectTab'

type LoadingExploreProps = {
  selectedCategory?: string
  categories?: {
    label: string
    value: string
  }[]
}

export default function LoadingExplore({
  categories,
  selectedCategory,
}: LoadingExploreProps) {
  return (
    <>
      <Header />

      {categories ? (
        <CategorySelectTab
          categories={categories}
          selectedCategory={selectedCategory ?? ''}
          onCategorySelect={() => undefined}
        />
      ) : (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 15 }).map((_, index) => (
            <SkeletonCard
              key={index}
              size={{
                width: 90,
                height: 24,
              }}
              className={twMerge('rounded-full border  px-4 py-1 ')}
            />
          ))}
        </div>
      )}

      <div className="mt-12 grid flex-1 grid-cols-3 gap-5">
        {Array.from({ length: 16 }).map((_, index) => (
          <LoadingBookCard key={index} variant="big" />
        ))}
      </div>
    </>
  )
}
