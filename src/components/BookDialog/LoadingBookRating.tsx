import { SkeletonCard } from '../core/SkeletonCard'
import { Box } from '../core/Box'
import { StarRating } from '../core/StarRating'

export const LoadingBookRating = () => {
  return (
    <section className="flex h-40 flex-1 flex-col gap-4">
      <header className="flex w-full justify-between px-4 pb-0 pt-2">
        <h6 className="text-gray-200">Avaliações</h6>
      </header>

      {Array.from({ length: 3 }).map((_, index) => (
        <Box key={index} className="flex flex-col gap-8">
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

          <SkeletonCard
            size={{
              height: 120,
            }}
          />
        </Box>
      ))}
    </section>
  )
}
