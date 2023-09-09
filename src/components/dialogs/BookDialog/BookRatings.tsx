'use client'
import { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'

import { api } from '@/lib/axios'
import { formatDifferenceToToday } from '@/utils/date'
import { useSignInModal } from '@/contexts/signIn'

import { Box } from '../../core/Box'
import { StarRating } from '../../core/StarRating'
import { Link } from '../../core/Link'
import { LoadingBookRating } from './LoadingBookRating'
import { RatingEditBox } from './RatingEditBox'
import { Avatar } from '../../core/Avatar'
import { BookDialogContext } from '.'

export const BookRatings = () => {
  const { status } = useSession()
  const { openSignInModal } = useSignInModal()

  const [isRating, setIsRating] = useState(false)

  const { book } = useContext(BookDialogContext)

  const isAuthenticated = status === 'authenticated'

  const {
    data: ratings,
    isLoading,
    isFetching,
  } = useQuery<RatingWithUser[]>(
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

  if (isLoading || isFetching) {
    return <LoadingBookRating />
  }

  const handleRate = () => {
    if (!isAuthenticated) {
      return openSignInModal()
    }

    setIsRating(true)
  }

  return (
    <section className="flex h-40 flex-1 flex-col gap-4">
      <header className="flex w-full justify-between px-4 pb-0 pt-2">
        <h6 className="text-gray-200">Avaliações</h6>

        {!isRating && (
          <Link href="#" onClick={handleRate}>
            Avaliar
          </Link>
        )}
      </header>

      {isRating && <RatingEditBox onEnd={() => setIsRating(false)} />}

      {ratings?.map((rating) => (
        <Box key={rating.id} className="flex flex-col gap-8">
          <header className="flex gap-4">
            <Avatar
              src={rating.user.avatar_url ?? ''}
              alt={rating.user.name}
              user={rating.user}
            />

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
