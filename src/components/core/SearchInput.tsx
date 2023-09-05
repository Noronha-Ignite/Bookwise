import { InputHTMLAttributes } from 'react'
import { MagnifyingGlass } from './Icons'

export const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="flex cursor-text items-center justify-between rounded-sm border border-gray-500 px-5 py-3 focus-within:border-green-200">
      <input
        type="text"
        placeholder="Buscar livro ou autor"
        className="flex flex-1 bg-transparent outline-none"
        {...props}
      />

      <MagnifyingGlass size={20} className="text-gray-500" />
    </label>
  )
}
