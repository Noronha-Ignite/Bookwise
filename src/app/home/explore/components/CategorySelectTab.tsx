import { twMerge } from 'tailwind-merge'

type CategoryItem = {
  label: string
  value: string
}

type CategorySelectTabProps = {
  categories: CategoryItem[]
  onCategorySelect: (category: string) => void
  selectedCategory: string
}

export const CategorySelectTab = ({
  onCategorySelect,
  selectedCategory,
  categories,
}: CategorySelectTabProps) => {
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
