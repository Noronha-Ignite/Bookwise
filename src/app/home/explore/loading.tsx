import { Header } from '../components/Header'
import { LoadingBookCard } from '@/components/cards/BookCard/loading'
import { SkeletonCard } from '@/components/core/SkeletonCard'
import { twMerge } from 'tailwind-merge'
import { CategorySelectTab } from './components/CategorySelectTab'

type LoadingExploreProps = {
  selectedCategory?: string
  categories?: string[]
}

export default function LoadingExplore({ categories }: LoadingExploreProps) {
  return (
    <>
      <Header />

      {categories ? (
        <CategorySelectTab
          categories={categories}
          selectedCategories={[]}
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

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 16 }).map((_, index) => (
          <LoadingBookCard key={index} variant="big" />
        ))}
      </div>
    </>
  )
}
