'use client'

import { FormEvent, useContext, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { useSession } from 'next-auth/react'
import { Avatar } from '../../core/Avatar'
import { Box } from '../../core/Box'
import { StarRating } from '../../core/StarRating'
import { TextArea } from '../../core/TextArea'
import { Button } from '../../core/Button'
import { Check, X } from '../../core/Icons'
import { api } from '@/lib/axios'

import { BookDialogContext } from '.'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

type RatePayload = {
  rate: number
  description: string
}

type RatingEditBoxProps = {
  onEnd?: () => void
}

export const RatingEditBox = ({ onEnd }: RatingEditBoxProps) => {
  const session = useSession()

  const queryClient = useQueryClient()

  const { onBookRated, book } = useContext(BookDialogContext)

  const [rate, setRate] = useState(0)
  const [rateDescription, setRateDescription] = useState('')

  const createRatingRequest = (payload: RatePayload) =>
    api.post<RatingWithUser>('/ratings', payload, {
      params: {
        user: session.data?.user.id,
        book: book.id,
      },
    })

  const addRatingToCache = (newRating: RatingWithUser) => {
    const BOOK_RATING_KEY = [book.id, '@bookwise:fetch-book-ratings']

    const previousValue =
      queryClient.getQueryData<RatingWithUser[]>(BOOK_RATING_KEY)

    queryClient.setQueryData(
      [book.id, '@bookwise:fetch-book-ratings'],
      [newRating, ...(previousValue ?? [])],
    )
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createRatingRequest,
    onSuccess: ({ data }) => {
      addRatingToCache(data)

      onBookRated?.({
        ...book,
        ratings: [...book.ratings, data],
      })
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error)
      toast.error(error.response?.data.message ?? error.message)
    },
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
        <header className="mb-3 flex flex-wrap items-start justify-between gap-4">
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
