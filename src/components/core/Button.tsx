import { HTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type RedirectButtonProps = HTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  className,
  ...props
}: PropsWithChildren<RedirectButtonProps>) => {
  return (
    <button
      {...props}
      className={twMerge(
        'flex w-full items-center gap-5 rounded-md bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500 xs:gap-3',
        className,
      )}
    >
      {children}
    </button>
  )
}
