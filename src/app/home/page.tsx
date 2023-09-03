import { prisma } from '@/lib/prisma'
import { CaretRight } from '@/components/Icons'
import { Link } from '@/components/Link'
import { RatingCard } from './components/RatingCard'

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
  })

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-16">
      <section className="flex flex-col gap-4">
        <h4 className="text-xs leading-base">Avaliações mais recentes</h4>

        <div className="no-scrollbar flex h-[calc(100vh-202px)] flex-col gap-3 overflow-y-auto">
          {recentRatings.map((rating) => (
            <RatingCard key={rating.id} rating={rating} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <header className="flex justify-between">
          <h4 className="text-xs leading-base">Livros populares</h4>

          <Link rightIcon={CaretRight}>Ver todos</Link>
        </header>
      </section>
    </div>
  )
}
