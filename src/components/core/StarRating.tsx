import { Star } from './Icons'

type StarRatingProps = {
  rate: number
}

export const StarRating = ({ rate }: StarRatingProps) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className="text-purple-100"
        weight={index < rate ? 'fill' : 'regular'}
      />
    ))}
  </div>
)
