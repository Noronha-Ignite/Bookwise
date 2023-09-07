import { usePathname } from 'next/navigation'
import {
  Binoculars,
  ChartLineUp,
  IconProps,
  User,
} from '@/components/core/Icons'

export enum RouteNames {
  Home = '/home/recent-ratings',
  Profile = '/home/profile',
  Explore = '/home/explore',
}

type Route = {
  path: RouteNames
  label: string
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  requireAuth?: boolean
}

export const routes: Route[] = [
  { path: RouteNames.Home, label: 'Início', icon: ChartLineUp },
  { path: RouteNames.Explore, label: 'Explorar', icon: Binoculars },
  { path: RouteNames.Profile, label: 'Perfil', icon: User, requireAuth: true },
]

export const useGetCurrentRoute = (): Route | undefined => {
  const pathname = usePathname()

  return routes.find((route) => route.path === pathname)
}
