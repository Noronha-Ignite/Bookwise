import { prisma } from '@/lib/prisma'
import { UserList, CaretRight } from '@/components/core/Icons'
import { Link } from '@/components/core/Link'
import { RatingCard } from '@/components/RatingCard'
import { BookCard } from '@/components/BookCard'

import { Header } from '../components/Header'
import { RouteNames } from '../routes'
import { NoItemFound } from '@/components/core/NoItemFound'

export default async function Home() {
  const recentRatings = await prisma.rating.findMany({
    take: 10,
    orderBy: {
      created_at: 'desc',
    },
    include: {
      user: true,
      book: true,
    },
  })

  const popularBooks = await prisma.book.findMany({
    take: 4,
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
    include: {
      ratings: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  })

  const books: BookWithRatingAndCategories[] = popularBooks.map((book) => ({
    ...book,
    categories: book.categories.map(
      (categoryOnBook) => categoryOnBook.category,
    ),
  }))

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr,1fr]">
        <section className="flex flex-col gap-4">
          <h4 className="text-xs leading-base">Avaliações mais recentes</h4>

          <div className="flex flex-col gap-3">
            {!recentRatings.length && (
              <NoItemFound
                icon={UserList}
                title="Nenhuma avaliação encontrada."
                subtitle="Seja o primeiro! :)"
              />
            )}

            {recentRatings.map((rating) => (
              <RatingCard key={rating.id} rating={rating} />
            ))}
          </div>
        </section>
        <section className="hidden flex-col gap-4 lg:flex">
          <header className="flex justify-between pr-2">
            <h4 className="text-xs leading-base">Livros populares</h4>

            <Link href={RouteNames.Explore} rightIcon={CaretRight}>
              Ver todos
            </Link>
          </header>

          <div className="flex flex-col gap-3">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
