'use client'

import { useQuery, useQueryClient } from 'react-query'
import { useState } from 'react'

import { SearchInput } from '@/components/core/SearchInput'
import { BookCard } from '@/components/cards/BookCard'
import { Books } from '@/components/core/Icons'
import useDebounce from '@/hooks/useDebounce'
import { Header } from '../components/Header'
import { api } from '@/lib/axios'
import { CategorySelectTab } from './components/CategorySelectTab'
import LoadingExplore from './loading'
import { NoItemFound } from '@/components/core/NoItemFound'

type FetchBooksQuery = {
  categories?: string[]
  search?: string
}

type FetchBooksResponse = {
  books: BookWithRatingAndCategories[]
}

const fetchBooks = async (query: FetchBooksQuery) => {
  const response = await api.get<FetchBooksResponse>('/books', {
    params: {
      categories: JSON.stringify(query.categories),
      search: query.search,
    },
  })

  return response.data
}

export default function Explore() {
  const queryClient = useQueryClient()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [query, setQuery] = useState<string>('')

  const debouncedQuery = useDebounce(query, 650)

  const {
    data,
    isLoading: isLoadingBooks,
    isFetching: isFetchingBooks,
  } = useQuery(
    [selectedCategories, debouncedQuery, '@bookwise:books-explore-fetch'],
    () =>
      fetchBooks({
        categories: selectedCategories,
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

  const handleBookRated = (bookRated: BookWithRatingAndCategories) => {
    const key = [
      selectedCategories,
      debouncedQuery,
      '@bookwise:books-explore-fetch',
    ]

    queryClient.setQueryData<FetchBooksResponse>(key, (previous) => {
      const updatedBooks = (previous?.books ?? []).map((book) => {
        if (book.id !== bookRated.id) return book

        return bookRated
      })

      return {
        ...previous,
        books: updatedBooks,
      }
    })
  }

  const handleSelectCategory = (category: string) => {
    if (category === 'all') {
      return setSelectedCategories([])
    }

    return setSelectedCategories((previous) => {
      let alreadyHasCategory = false

      const filteredCategories = previous.filter((prevCategory) => {
        if (prevCategory === category) {
          alreadyHasCategory = true
        }

        return !alreadyHasCategory
      })

      if (!alreadyHasCategory) {
        filteredCategories.push(category)
      }

      return filteredCategories
    })
  }

  const categories =
    categoriesFetched?.data.categories.map((category) => category.name) ?? []

  const isPageReady =
    !isLoadingBooks &&
    !isLoadingCategories &&
    !isFetchingBooks &&
    !isFetchingCategories

  if (!isPageReady) {
    return (
      <LoadingExplore
        categories={areCategoriesLoaded ? categories : undefined}
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
          autoFocus
        />
      </Header>

      <CategorySelectTab
        categories={categories}
        onCategorySelect={handleSelectCategory}
        selectedCategories={selectedCategories}
      />

      {!data?.books.length && (
        <NoItemFound
          icon={Books}
          title="Nenhuma livro encontrado."
          subtitle="Verifique o filtro acima"
        />
      )}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data?.books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            variant="big"
            onBookRated={handleBookRated}
          />
        ))}
      </div>
    </>
  )
}
