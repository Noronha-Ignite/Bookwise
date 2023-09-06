'use client'

import { useQuery } from 'react-query'
import { useState } from 'react'

import { SearchInput } from '@/components/core/SearchInput'
import { BookCard } from '@/components/BookCard'
import useDebounce from '@/hooks/useDebounce'
import { Header } from '../components/Header'
import { api } from '@/lib/axios'
import { CategorySelectTab } from './components/CategorySelectTab'
import { Scrollable } from '@/components/core/Scrollable'

type FetchBooksQuery = {
  category?: string
  search?: string
}

type FetchBooksResponse = {
  books: BookWithRatingAndCategories[]
}

const fetchBooks = async (query: FetchBooksQuery) => {
  const response = await api.get<FetchBooksResponse>('/books', {
    params: query,
  })

  return response.data
}

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [query, setQuery] = useState<string>('')

  const debouncedQuery = useDebounce(query, 650)

  const { data } = useQuery(
    [selectedCategory, debouncedQuery, '@bookwise:books-explore-fetch'],
    () => fetchBooks({ category: selectedCategory, search: debouncedQuery }),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 1 day
    },
  )

  return (
    <>
      <Header>
        <SearchInput onChange={(e) => setQuery(e.target.value)} />
      </Header>

      <CategorySelectTab
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <Scrollable className="mt-12 grid max-h-[calc(100vh-308px)] grid-cols-3 gap-5">
        {data?.books.map((book) => (
          <BookCard key={book.id} book={book} variant="big" />
        ))}
      </Scrollable>
    </>
  )
}
