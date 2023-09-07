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
        <div className="mb-10 mt-14 flex justify-start pl-2">
          <Link href={RouteNames.Home} leftIcon={CaretLeft} variant="white">
            Voltar
          </Link>
        </div>
      ) : (
        <Header />
      )}

      <div className="grid grid-cols-[2.25fr,1fr] gap-16">
        <ProfileRatings user={user} />
        <ProfileInfo user={user} details={userDetails} />
      </div>
    </>
  )
}
