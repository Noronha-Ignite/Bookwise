'use client'

import { useQuery } from 'react-query'
import { useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import useDebounce from '@/hooks/useDebounce'
import { Header } from '../components/Header'
import { api } from '@/lib/axios'
import { CategorySelectTab } from './components/CategorySelectTab'
import { BookCard } from '../components/BookCard'

type FetchBooksQuery = {
  category?: string
  search?: string
}

type FetchBooksResponse = {
  books: BookWithRating[]
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

      <div className="no-scrollbar mt-12 grid max-h-[calc(100vh-308px)] grid-cols-3 gap-5 overflow-y-auto pb-4">
        {data?.books.map((book) => (
          <BookCard key={book.id} book={book} variant="big" />
        ))}
      </div>
    </>
  )
}
