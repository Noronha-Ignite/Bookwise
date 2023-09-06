import { usePathname } from 'next/navigation'
import { Binoculars, ChartLineUp, IconProps } from '@/components/core/Icons'

export enum RouteNames {
  Home = '/home/recent-ratings',
  Explore = '/home/explore',
}

type Route = {
  path: RouteNames
  label: string
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
}

export const routes: Route[] = [
  { path: RouteNames.Home, label: 'Início', icon: ChartLineUp },
  { path: RouteNames.Explore, label: 'Explorar', icon: Binoculars },
]

export const useGetCurrentRoute = (): Route => {
  const pathname = usePathname()

  return routes.find((route) => route.path === pathname) as Route
}
