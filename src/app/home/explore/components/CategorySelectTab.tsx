import { api } from '@/lib/axios'
import { Category } from '@prisma/client'
import { useQuery } from 'react-query'
import { twMerge } from 'tailwind-merge'

type CategorySelectTabProps = {
  onCategorySelect: (category: string) => void
  selectedCategory: string
}

type CategoryItem = {
  label: string
  value: string
}

export const CategorySelectTab = ({
  onCategorySelect,
  selectedCategory,
}: CategorySelectTabProps) => {
  const { data: categoriesFetched } = useQuery(
    '@bookwise:books-explore-categories',
    () => api.get<{ categories: Category[] }>('/categories'),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  const categories: CategoryItem[] = [
    { label: 'Todos', value: '' },
    ...(categoriesFetched?.data.categories ?? []).map<CategoryItem>(
      (category) => ({
        label: category.name,
        value: category.name,
      }),
    ),
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategorySelect(category.value)}
          className={twMerge(
            'rounded-full border border-purple-100 px-4 py-1 text-purple-100',

            category.value === selectedCategory
              ? 'border-purple-200 bg-purple-200'
              : 'hover:border-purple-100 hover:bg-purple-200 hover:text-white',
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
