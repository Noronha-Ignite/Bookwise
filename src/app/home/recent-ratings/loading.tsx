import { Header } from '../components/Header'
import { LoadingRatingCard } from '@/components/RatingCard/loading'
import { LoadingBookCard } from '@/components/dialogs/BookCard/loading'

export default function LoadingRecentRatings() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr,1fr]">
        <section className="flex flex-col gap-4">
          <h4 className="text-xs leading-base">Avaliações mais recentes</h4>

          <div className="flex h-full flex-col gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingRatingCard key={index} />
            ))}
          </div>
        </section>
        <section className="hidden flex-col gap-4 lg:flex">
          <header className="flex justify-between">
            <h4 className="text-xs leading-base">Livros populares</h4>
          </header>

          <div className="flex h-full flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <LoadingBookCard key={index} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
