import Image from 'next/image'

import { Box } from './core/Box'
import { StarRating } from './core/StarRating'
import { getRatingAverage } from '@/utils/rating'

type BookCardProps = {
  book: BookWithRating
  variant?: 'big' | 'normal'
}

export const BookCard = ({ book, variant = 'normal' }: BookCardProps) => {
  return (
    <Box variant="small">
      <div className="flex gap-5">
        <Image
          src={`/images/books/${book.cover_url}`}
          alt={book.name}
          width={variant === 'normal' ? 64 : 108}
          height={variant === 'normal' ? 94 : 152}
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
