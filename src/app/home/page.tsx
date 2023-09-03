import { prisma } from '@/lib/prisma'
import { CaretRight } from '@/components/Icons'
import { Link } from '@/components/Link'

export default async function Home() {
  const books = await prisma.book.findMany({
    take: 10,
    orderBy: {
      created_at: 'desc',
    },
  })

  return (
    <div className="grid grid-cols-[2fr,1fr]">
      <section className="flex flex-col gap-4">
        <h4 className="text-xs leading-base">Avaliações mais recentes</h4>
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
