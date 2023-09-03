import Image from 'next/image'

import LogoSVG from '@/assets/logo.svg'

import { Actions } from './Actions'

export const Welcome = () => (
  <div className="flex flex-1 flex-col items-center justify-center p-8 pr-4 md:justify-normal">
    <div className="flex w-[min(100%,372px)] flex-col gap-10">
      <Image
        src={LogoSVG}
        alt="BookWise"
        width={180}
        height={64}
        className="hidden md:block"
      />

      <header>
        <h3 className="text-xl font-bold leading-short">Boas vindas!</h3>
        <p className="text-sm leading-base text-gray-200">
          Faça seu login ou acesse como visitante.
        </p>
      </header>

      <Actions />
    </div>
  </div>
)
