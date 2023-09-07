import { Box } from '@/components/core/Box'
import { SkeletonCard } from '@/components/core/SkeletonCard'

export const ProfileRatingCardLoading = () => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs leading-base text-gray-300">
        <SkeletonCard variant="text" size={{ width: 80 }} />
      </span>

      <Box className="flex flex-col gap-6">
        <header className="flex gap-5">
          <SkeletonCard
            size={{
              width: 98,
              height: 134,
            }}
          />

          <div className="flex flex-1 flex-col justify-between">
            <header className="flex flex-col">
              <SkeletonCard variant="text" />

              <SkeletonCard variant="text" />
            </header>
          </div>
        </header>

        <SkeletonCard variant="text" size={{ height: 160 }} />
      </Box>
    </div>
  )
}
