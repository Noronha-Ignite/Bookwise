'use client'

import { FormEvent, useState } from 'react'

import { useSession } from 'next-auth/react'
import { Avatar } from '../core/Avatar'
import { Box } from '../core/Box'
import { StarRating } from '../core/StarRating'
import { TextArea } from '../core/TextArea'
import { Button } from '../core/Button'
import { Check, X } from '../core/Icons'
import { useMutation, useQueryClient } from 'react-query'
import { api } from '@/lib/axios'

type RatePayload = {
  rate: number
  description: string
}

type RatingEditBoxProps = {
  onEnd?: () => void
  bookId: string
}

export const RatingEditBox = ({ onEnd, bookId }: RatingEditBoxProps) => {
  const session = useSession()

  const queryClient = useQueryClient()

  const [rate, setRate] = useState(0)
  const [rateDescription, setRateDescription] = useState('')

  const createRatingRequest = (payload: RatePayload) =>
    api.post<RatingWithUser>('/ratings', payload, {
      params: {
        user: session.data?.user.id,
        book: bookId,
      },
    })

  const addRatingToCache = (newRating: RatingWithUser) => {
    const BOOK_RATING_KEY = [bookId, '@bookwise:fetch-book-ratings']

    const previousValue =
      queryClient.getQueryData<RatingWithUser[]>(BOOK_RATING_KEY)

    queryClient.setQueryData(
      [bookId, '@bookwise:fetch-book-ratings'],
      [newRating, ...(previousValue ?? [])],
    )
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createRatingRequest,
    onSuccess: ({ data }) => addRatingToCache(data),
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await mutateAsync({
      rate,
      description: rateDescription,
    })

    onEnd?.()
  }

  if (!session.data) {
    return <></>
  }

  const { user } = session.data

  return (
    <form onSubmit={handleSubmit}>
      <Box className="flex flex-col gap-3">
        <header className="mb-3 flex items-start justify-between">
          <Avatar
            src={user.avatar_url ?? ''}
            alt={user.name}
            name={user.name}
          />

          <StarRating rate={rate} onSelect={setRate} />
        </header>

        <TextArea
          limit={450}
          value={rateDescription}
          onChange={(e) => setRateDescription(e.target.value)}
        />

        <div className="ml-auto flex justify-end gap-2">
          <Button
            type="button"
            variant="small"
            className="text-purple-100"
            disabled={isLoading}
            onClick={onEnd}
          >
            <X size={20} />
          </Button>
          <Button
            type="submit"
            variant="small"
            className="text-green-100"
            disabled={isLoading}
          >
            <Check size={20} />
          </Button>
        </div>
      </Box>
    </form>
  )
}
