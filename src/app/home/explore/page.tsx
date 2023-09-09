import { Metadata } from 'next'
import ExploreComponent from './Explore'

export const metadata: Metadata = {
  title: 'Explorar',
}
export default function Explore() {
  return <ExploreComponent />
}
