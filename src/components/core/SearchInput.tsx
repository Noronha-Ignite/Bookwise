import { InputHTMLAttributes } from 'react'
import { MagnifyingGlass } from './Icons'

type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (text: string) => void
}

export const SearchInput = ({ onChange, ...props }: SearchInputProps) => {
  return (
    <label className="flex flex-1 cursor-text items-center justify-between rounded-sm border border-gray-500 px-5 py-3 focus-within:border-green-200">
      <input
        type="text"
        className="flex flex-1 bg-transparent outline-none"
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />

      <MagnifyingGlass size={20} className="text-gray-500" />
    </label>
  )
}
