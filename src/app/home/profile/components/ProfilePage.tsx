import { ProfileInfo } from './ProfileInfo'
import { Header } from '../../components/Header'
import { ProfileRatings } from './ProfileRatings'
import { Link } from '@/components/core/Link'
import { RouteNames } from '../../routes'
import { CaretLeft } from '@/components/core/Icons'

type ProfilePageProps = {
  user: User
  userDetails: UserDetails
  canGoBack?: boolean
}

export const ProfilePage = ({
  user,
  userDetails,
  canGoBack,
}: ProfilePageProps) => {
  return (
    <>
      {canGoBack ? (
        <div className="mb-10 flex flex-col justify-start pl-2">
          <Header />

          <div className="flex justify-start pl-2">
            <Link href={RouteNames.Home} leftIcon={CaretLeft} variant="white">
              Voltar
            </Link>
          </div>
        </div>
      ) : (
        <Header />
      )}

      <div className="grid grid-cols-1 gap-16 md:grid-cols-[2.25fr,1fr]">
        <ProfileRatings user={user} details={userDetails} />

        <div className="hidden md:block">
          <ProfileInfo user={user} details={userDetails} />
        </div>
      </div>
    </>
  )
}
