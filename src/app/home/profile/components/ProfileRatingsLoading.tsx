import { ProfileRatingCardLoading } from './ProfileRatingCardLoading'

export const ProfileRatingsLoading = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex h-full flex-col gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProfileRatingCardLoading key={index} />
        ))}
      </div>
    </section>
  )
}
