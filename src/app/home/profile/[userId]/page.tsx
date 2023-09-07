import { redirect } from 'next/navigation'
import { getUserDetails } from '@/app/api/users/getUserDetails'
import { prisma } from '@/lib/prisma'
import { RouteNames } from '../../routes'
import { ProfilePage } from '../components/ProfilePage'

export default async function Profile({
  params,
}: {
  params: { userId: string }
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  })

  if (!user) {
    return redirect(RouteNames.Home)
  }

  const userDetails = await getUserDetails(user.id)

  return <ProfilePage user={user} userDetails={userDetails} canGoBack />
}
