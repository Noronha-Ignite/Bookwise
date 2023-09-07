'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'

import { SearchInput } from '@/components/core/SearchInput'
import useDebounce from '@/hooks/useDebounce'
import { api } from '@/lib/axios'
import { ProfileRatingCard } from './ProfileRatingCard'
import { ProfileRatingsLoading } from './ProfileRatingsLoading'
import { Info, NoteBlank } from '@/components/core/Icons'
import { NoItemFound } from '@/components/core/NoItemFound'
import { ProfileDialog } from './ProfileDialog'
import { twMerge } from 'tailwind-merge'

type ProfileRatingsProps = {
  user: User
  details: UserDetails
}

export const ProfileRatings = ({ user, details }: ProfileRatingsProps) => {
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
    { refetchOnWindowFocus: false },
  )

  const ratings = response?.data ?? []

  if (isLoading || isFetching) {
    return <ProfileRatingsLoading />
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-4">
        <SearchInput
          placeholder="Buscar livro avaliado"
          value={query}
          onChange={setQuery}
        />

        <div className="flex items-center justify-center md:hidden">
          <ProfileDialog user={user} details={details}>
            <button
              className={twMerge(
                'rounded-sm text-green-100',
                'transition-colors hover:text-green-50',
              )}
            >
              <Info size={24} />
            </button>
          </ProfileDialog>
        </div>
      </div>

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
