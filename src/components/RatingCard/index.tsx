import Image from 'next/image'

import { Box } from '../core/Box'
import { formatDifferenceToToday } from '@/utils/date'
import { StarRating } from '../core/StarRating'
import { Avatar } from '../core/Avatar'

type RatingCardProps = {
  rating: RatingWithUserAndBook
}

export const RatingCard = ({ rating }: RatingCardProps) => {
  return (
    <Box className="flex flex-col gap-8">
      <header className="flex flex-wrap gap-4">
        <Avatar
          src={rating.user.avatar_url ?? ''}
          alt={rating.user.name}
          user={rating.user}
        />

        <div className="flex flex-1 flex-col justify-between">
          <h4>{rating.user.name}</h4>

          <p className="min-w-[120px] capitalize text-gray-400">
            {formatDifferenceToToday(rating.created_at)}
          </p>
        </div>

        <StarRating rate={rating.rate} />
      </header>

      <p>{rating.description}</p>

      <div className="flex max-h-40 gap-5 overflow-y-auto">
        <Image
          src={`/images/books/${rating.book.cover_url}`}
          alt={rating.book.name}
          width={108}
          height={152}
          className="hidden h-fit xs:block"
        />

        <div className="flex flex-1 flex-col gap-5">
          <header className="flex flex-col justify-between">
            <h4>{rating.book.name}</h4>

            <p className="text-gray-400">{rating.book.author}</p>
          </header>

          <p>{rating.book.summary}</p>
        </div>
      </div>
    </Box>
  )
}
