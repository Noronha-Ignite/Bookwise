import { InputHTMLAttributes } from 'react'

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  limit?: number
}

export const TextArea = ({ limit, ...props }: TextAreaProps) => {
  return (
    <label className="flex cursor-text flex-col justify-between rounded-sm border border-gray-500 bg-gray-800 px-5 py-3.5 focus-within:border-green-200">
      <textarea
        {...props}
        placeholder="Escreva sua avaliação"
        className="flex flex-1 resize-none bg-transparent outline-none"
        maxLength={limit}
      />

      {limit && (
        <div className="flex w-full justify-end">
          <span className="text-xxs text-gray-400">
            {props.value?.toString().length}/{limit}
          </span>
        </div>
      )}
    </label>
  )
}
