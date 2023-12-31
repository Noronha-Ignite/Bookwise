import Image from 'next/image'

import { Box } from '../../core/Box'
import { StarRating } from '../../core/StarRating'
import { getRatingAverage } from '@/utils/rating'
import { BookDialog } from '../../dialogs/BookDialog'
import { twMerge } from 'tailwind-merge'

type BookCardProps = {
  book: BookWithRatingAndCategories
  onBookRated?: (bookRated: BookWithRatingAndCategories) => void
  variant?: 'big' | 'normal'
}

export const BookCard = ({
  book,
  variant = 'normal',
  onBookRated,
}: BookCardProps) => {
  return (
    <BookDialog book={book} onBookRated={onBookRated}>
      <Box variant="small" clickable>
        <div className="flex gap-5">
          <Image
            src={`/images/books/${book.cover_url}`}
            alt={book.name}
            width={variant === 'normal' ? 64 : 108}
            height={variant === 'normal' ? 94 : 152}
            className={twMerge(
              'h-32 w-20 object-cover xs:h-full',
              variant === 'normal' && 'h-20 w-12',
            )}
            priority
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
    </BookDialog>
  )
}
