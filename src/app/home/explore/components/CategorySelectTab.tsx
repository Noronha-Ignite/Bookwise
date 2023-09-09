import { twMerge } from 'tailwind-merge'

type CategorySelectTabProps = {
  categories: string[]
  onCategorySelect: (category: string) => void
  selectedCategories: string[]
}

export const CategorySelectTab = ({
  onCategorySelect,
  selectedCategories,
  categories,
}: CategorySelectTabProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onCategorySelect('all')}
        className={twMerge(
          'rounded-full border border-purple-100 px-4 py-1 text-purple-100',

          !selectedCategories.length
            ? 'border-purple-200 bg-purple-200'
            : 'hover:border-purple-100 hover:bg-purple-200 hover:text-white',
        )}
      >
        Todos
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={twMerge(
            'rounded-full border border-purple-100 px-4 py-1 text-purple-100',

            selectedCategories.includes(category)
              ? 'border-purple-200 bg-purple-200'
              : 'hover:border-purple-100 hover:bg-purple-200 hover:text-white',
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
