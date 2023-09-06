import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type RedirectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'normal' | 'small'
}

export const Button = ({
  children,
  className,
  variant = 'normal',
  ...props
}: PropsWithChildren<RedirectButtonProps>) => {
  return (
    <button
      {...props}
      className={twMerge(
        'flex w-full items-center gap-5 rounded-md bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500 xs:gap-3',
        variant === 'small' && 'p-2',
        className,
      )}
    >
      {children}
    </button>
  )
}
