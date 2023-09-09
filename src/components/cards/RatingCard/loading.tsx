import { SkeletonCard } from '../../core/SkeletonCard'
import { Box } from '../../core/Box'
import { StarRating } from '../../core/StarRating'

export const LoadingRatingCard = () => {
  return (
    <Box className="flex flex-col gap-8">
      <header className="flex gap-4">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gradient-vertical">
          <SkeletonCard
            size={{
              width: 40,
              height: 40,
            }}
            variant="rounded"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <SkeletonCard variant="text" />
          <SkeletonCard variant="text" />
        </div>

        <StarRating rate={0} />
      </header>

      <div className="flex gap-5">
        <SkeletonCard
          size={{
            width: 108,
            height: 152,
          }}
        />

        <div className="flex flex-1 flex-col gap-5">
          <header className="flex flex-col justify-start">
            <SkeletonCard variant="text" />
            <SkeletonCard variant="text" />
          </header>

          <SkeletonCard size={{ height: 90 }} />
        </div>
      </div>
    </Box>
  )
}
