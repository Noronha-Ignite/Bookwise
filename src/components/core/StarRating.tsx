'use client'

import { useState } from 'react'
import { Star } from './Icons'
import { twMerge } from 'tailwind-merge'

type StarRatingProps = {
  rate: number
  onSelect?: (rate: number) => void
}

export const StarRating = ({ rate, onSelect }: StarRatingProps) => {
  const interactable = !!onSelect

  const [currentRate, setCurrentRate] = useState(rate)

  return (
    <div
      className="flex gap-1"
      onMouseLeave={interactable ? () => setCurrentRate(rate) : undefined}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={interactable ? 24 : 16}
          className={twMerge(
            'text-purple-100',
            interactable && 'cursor-pointer',
          )}
          weight={index < currentRate ? 'fill' : 'regular'}
          onMouseEnter={
            interactable ? () => setCurrentRate(index + 1) : undefined
          }
          onClick={() => onSelect?.(index + 1)}
        />
      ))}
    </div>
  )
}
