import { Book, Rating } from '@prisma/client'
import Image from 'next/image'

import { Box } from '@/components/Box'
import { StarRating } from '@/components/StarRating'
import { getRatingAverage } from '@/utils/rating'

type BookCardProps = {
  book: Book & {
    ratings: Rating[]
  }
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <Box variant="small">
      <div className="flex gap-5">
        <Image
          src={`/images/books/${book.cover_url}`}
          alt={book.name}
          width={64}
          height={94}
          className="h-full object-cover"
        />

        <div className="flex flex-1 flex-col justify-between">
          <header className="flex flex-col">
            <h4>{book.name}</h4>

            <p className="text-gray-400">{book.author}</p>
          </header>

          <StarRating rate={getRatingAverage(book.ratings)} />
        </div>
      </div>
    </Box>
  )
}
