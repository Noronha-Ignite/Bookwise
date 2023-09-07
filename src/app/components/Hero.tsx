import Image from 'next/image'

import LogoSVG from '@/assets/logo.svg'

export const Hero = () => (
  <div className="relative hidden h-full overflow-hidden rounded-md bg-gradient-hero md:block">
    <Image
      src={'/images/woman-reading.png'}
      alt="Mulher lendo"
      width={738}
      height={984}
      className="h-full object-cover object-bottom opacity-[0.18] blur-[0.5px]"
    />
    <Image
      src={LogoSVG}
      alt="Bookwise"
      width={232}
      height={58}
      className="absolute left-1/2 top-1/2 w-2/5 -translate-x-1/2 -translate-y-1/2"
    />
  </div>
)
