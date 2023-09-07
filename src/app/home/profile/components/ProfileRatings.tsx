'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'

import { SearchInput } from '@/components/core/SearchInput'
import useDebounce from '@/hooks/useDebounce'
import { api } from '@/lib/axios'
import { ProfileRatingCard } from './ProfileRatingCard'
import { ProfileRatingsLoading } from './ProfileRatingsLoading'
import { NoteBlank } from '@/components/core/Icons'
import { NoItemFound } from '@/components/core/NoItemFound'

type ProfileRatingsProps = {
  user: User
}

export const ProfileRatings = ({ user }: ProfileRatingsProps) => {
  const [query, setQuery] = useState('')

  const debouncedQuery = useDebounce(query, 650)

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery(
    [user.id, debouncedQuery, '@bookwise:user-profile-ratings'],
    () =>
      api.get<RatingWithUserAndBook[]>('/ratings', {
        params: {
          user: user.id,
          query: debouncedQuery || undefined,
        },
      }),
  )

  const ratings = response?.data ?? []

  if (isLoading || isFetching) {
    return <ProfileRatingsLoading />
  }

  return (
    <div className="flex flex-col gap-8">
      <SearchInput
        placeholder="Buscar livro avaliado"
        value={query}
        onChange={setQuery}
      />

      <div className="flex flex-col gap-6">
        {!ratings.length && (
          <NoItemFound icon={NoteBlank} title="Nenhuma avaliação encontrada." />
        )}
        {ratings.map((rating) => (
          <ProfileRatingCard key={rating.id} rating={rating} />
        ))}
      </div>
    </div>
  )
}
