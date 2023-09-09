import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ProfilePage } from './components/ProfilePage'
import { RouteNames } from '../routes'
import { getSessionSSR } from '@/lib/auth/authOptions'
import { getUserDetails } from '@/app/api/users/getUserDetails'

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await getSessionSSR()

  const user = session?.user

  return {
    title: user?.name ?? '',
  }
}

export default async function Profile() {
  const session = await getSessionSSR()

  if (!session) {
    return redirect(RouteNames.Home)
  }

  const user = session.user
  const userDetails = await getUserDetails(user.id)

  return <ProfilePage user={user} userDetails={userDetails} />
}
