import Image from 'next/image'
import { Book, Rating, User } from '@prisma/client'

import { Box } from '@/components/Box'
import { formatDifferenceToToday } from '@/utils/date'
import { Star } from '@/components/Icons'

type RatingCardProps = {
  rating: Rating & {
    user: User
    book: Book
  }
}

export const RatingCard = ({ rating }: RatingCardProps) => {
  return (
    <Box className="flex flex-col gap-8">
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

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="text-purple-100"
              weight={index < rating.rate ? 'fill' : 'regular'}
            />
          ))}
        </div>
      </header>

      <div className="flex gap-5">
        <Image
          src={`/images/books/${rating.book.cover_url}`}
          alt={rating.book.name}
          width={108}
          height={152}
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
