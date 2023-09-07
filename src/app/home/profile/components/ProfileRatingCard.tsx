import { Box } from '@/components/core/Box'
import { StarRating } from '@/components/core/StarRating'
import { formatHasPassedTime } from '@/utils/date'
import { capitalize } from '@/utils/string'
import Image from 'next/image'

type ProfileRatingCardProps = {
  rating: RatingWithUserAndBook
}

export const ProfileRatingCard = ({ rating }: ProfileRatingCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs leading-base text-gray-300">
        {capitalize(formatHasPassedTime(rating.created_at))}
      </span>

      <Box className="flex flex-col gap-6">
        <header className="flex gap-5">
          <Image
            width={98}
            height={134}
            src={`/images/books/${rating.book.cover_url}`}
            alt={rating.book.name}
          />

          <div className="flex flex-1 flex-col justify-between">
            <header className="flex flex-col">
              <h4>{rating.book.name}</h4>

              <p className="text-gray-400">{rating.book.author}</p>
            </header>

            <StarRating rate={rating.rate} />
          </div>
        </header>

        <p className="text-xs leading-base text-gray-300">
          {rating.description}
        </p>
      </Box>
    </div>
  )
}
