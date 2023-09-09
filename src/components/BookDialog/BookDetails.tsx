import Image from 'next/image'

import { BookmarkSimple, BookOpen } from '../core/Icons'
import { Box } from '../core/Box'
import { StarRating } from '../core/StarRating'

import { getRatingAverage } from '@/utils/rating'

type BookDetailsProps = {
  book: BookWithRatingAndCategories
}

export const BookDetails = ({ book }: BookDetailsProps) => {
  const ratingAmount = book.ratings.length

  return (
    <Box variant="big">
      <div className="grid grid-cols-1 gap-5 border-b border-gray-600 pb-10 xs:grid-cols-[172px,1fr]">
        <Image
          src={`/images/books/${book.cover_url}`}
          alt={book.name}
          width={172}
          height={242}
          className="mx-auto h-full object-cover"
        />

        <div className="flex flex-1 flex-col justify-between">
          <header className="flex flex-col gap-2">
            <h4 className="text-md font-bold leading-short">{book.name}</h4>

            <p className="text-gray-400">{book.author}</p>
          </header>

          <div className="flex flex-col gap-1">
            <StarRating rate={getRatingAverage(book.ratings)} />
            <span className="text-xs leading-base text-gray-400">
              {ratingAmount} {ratingAmount === 1 ? 'avaliação' : 'avaliações'}
            </span>
          </div>
        </div>
      </div>

      <footer className="grid grid-cols-1 gap-4 py-6 xs:grid-cols-2 xs:gap-16">
        <div className="flex items-center gap-4 text-green-100">
          <BookmarkSimple size={24} />
          <div className="flex flex-col flex-wrap text-gray-100">
            <span className="text-xs leading-base text-gray-300">
              Categoria
            </span>
            <span className="text-sm font-bold leading-short text-gray-200">
              {book.categories.map((category) => category.name).join(', ')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-green-100">
          <BookOpen size={24} />
          <div className="flex flex-col flex-wrap text-gray-100">
            <span className="text-xs leading-base text-gray-300">Páginas</span>
            <span className="text-sm font-bold leading-short text-gray-200">
              {book.total_pages}
            </span>
          </div>
        </div>
      </footer>
    </Box>
  )
}
