import Image from 'next/image'
import { ComponentProps } from 'react'

type AvatarProps = { size?: number } & ComponentProps<typeof Image>

export const Avatar = ({ size = 40, ...props }: AvatarProps) => {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-gradient-vertical"
      style={{
        width: size + 2,
        height: size + 2,
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...props}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
        }}
        className="rounded-full object-cover"
      />
    </div>
  )
}
