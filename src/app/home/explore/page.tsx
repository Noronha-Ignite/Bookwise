'use client'

import { useQuery } from 'react-query'
import { useState } from 'react'

import { SearchInput } from '@/components/core/SearchInput'
import { BookCard } from '@/components/BookCard'
import { Books } from '@/components/core/Icons'
import useDebounce from '@/hooks/useDebounce'
import { Header } from '../components/Header'
import { api } from '@/lib/axios'
import { CategorySelectTab } from './components/CategorySelectTab'
import LoadingExplore from './loading'
import { NoItemFound } from '@/components/core/NoItemFound'

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

  const {
    data,
    isLoading: isLoadingBooks,
    isFetching: isFetchingBooks,
  } = useQuery(
    [selectedCategory, debouncedQuery, '@bookwise:books-explore-fetch'],
    () =>
      fetchBooks({
        category: selectedCategory || undefined,
        search: debouncedQuery || undefined,
      }),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30, // 30 min
    },
  )

  const {
    data: categoriesFetched,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
    isSuccess: areCategoriesLoaded,
  } = useQuery(
    '@bookwise:books-explore-categories',
    () => api.get<{ categories: Category[] }>('/categories'),
    {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30, // 30 min
    },
  )

  const categories = [
    { label: 'Todos', value: '' },
    ...(categoriesFetched?.data.categories ?? []).map((category) => ({
      label: category.name,
      value: category.name,
    })),
  ]

  const isPageReady =
    !isLoadingBooks &&
    !isLoadingCategories &&
    !isFetchingBooks &&
    !isFetchingCategories &&
    !!categories.length &&
    !!data?.books

  if (!isPageReady) {
    return (
      <LoadingExplore
        categories={areCategoriesLoaded ? categories : undefined}
        selectedCategory={areCategoriesLoaded ? selectedCategory : undefined}
      />
    )
  }

  return (
    <>
      <Header>
        <SearchInput
          placeholder="Buscar livro ou autor"
          onChange={setQuery}
          value={query}
        />
      </Header>

      <CategorySelectTab
        categories={categories}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {!data?.books.length && (
        <NoItemFound
          icon={Books}
          title="Nenhuma livro encontrado."
          subtitle="Verifique o filtro acima"
        />
      )}
      <div className="mt-12 grid grid-cols-3 gap-5">
        {data?.books.map((book) => (
          <BookCard key={book.id} book={book} variant="big" />
        ))}
      </div>
    </>
  )
}
