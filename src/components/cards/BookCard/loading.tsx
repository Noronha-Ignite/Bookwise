import { SkeletonCard } from '../../core/SkeletonCard'
import { Box } from '../../core/Box'
import { StarRating } from '../../core/StarRating'

type LoadingBookCardProps = {
  variant?: 'big' | 'normal'
}

export const LoadingBookCard = ({ variant }: LoadingBookCardProps) => {
  return (
    <Box variant="small">
      <div className="flex gap-5">
        <SkeletonCard
          size={{
            width: variant === 'normal' ? 64 : 108,
            height: variant === 'normal' ? 94 : 152,
          }}
        />

        <div className="flex flex-1 flex-col justify-between">
          <header className="flex flex-col justify-start">
            <SkeletonCard variant="text" />

            <SkeletonCard variant="text" />
          </header>

          <StarRating rate={0} />
        </div>
      </div>
    </Box>
  )
}
