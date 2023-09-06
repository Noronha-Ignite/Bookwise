'use client'

import { api } from '@/lib/axios'
import { formatDifferenceToToday } from '@/utils/date'
import { useQuery } from 'react-query'
import { Box } from '../core/Box'
import { StarRating } from '../core/StarRating'
import { Book } from '@prisma/client'
import Image from 'next/image'
import { Link } from '../core/Link'

type BookRatingsProps = {
  book: Book
}

export const BookRatings = ({ book }: BookRatingsProps) => {
  const { data: ratings } = useQuery<RatingWithUser[]>(
    [book.id, '@bookwise:fetch-book-ratings'],
    () =>
      api
        .get<RatingWithUser[]>('/ratings', {
          params: {
            book: book.id,
          },
        })
        .then((response) => response.data),
    { staleTime: 1000 * 60 * 30 }, // 30 min
  )

  return (
    <section className="flex h-40 flex-1 flex-col gap-4">
      <header className="flex w-full justify-between">
        <h6 className="text-gray-200">Avaliações</h6>

        <Link href="#">Avaliar</Link>
      </header>

      {ratings?.map((rating) => (
        <Box key={rating.id} className="flex flex-col gap-8">
          <header className="flex gap-4">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gradient-vertical">
              <Image
                src={rating.user.avatar_url ?? ''}
                alt={rating.user.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <h4>{rating.user.name}</h4>

              <p className="capitalize text-gray-400">
                {formatDifferenceToToday(rating.created_at)}
              </p>
            </div>

            <StarRating rate={rating.rate} />
          </header>

          <p className="flex flex-wrap text-xs leading-base text-gray-300">
            {rating.description}
          </p>
        </Box>
      ))}
    </section>
  )
}
