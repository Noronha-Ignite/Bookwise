import Image from 'next/image'

export const WelcomeActions = () => (
  <div className="flex flex-1 flex-col items-center justify-center p-8 pr-4 md:justify-normal">
    <div className="flex w-[min(100%,372px)] flex-col gap-10">
      <Image
        src="logo.svg"
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

      <div className="flex w-full flex-col gap-4">
        <button className="flex w-full items-center gap-5 rounded-md bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500 xs:gap-3">
          <Image
            src="google.svg"
            alt="Google"
            width={32}
            height={32}
            className="xs:h-6 xs:w-6"
          />
          <span className="text-md font-bold leading-base">
            Entrar com Google
          </span>
        </button>
        <button className="flex w-full items-center gap-5 rounded-md bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500 xs:gap-3">
          <Image
            src="github.svg"
            alt="Github"
            width={32}
            height={32}
            className="xs:h-6 xs:w-6"
          />
          <span className="text-md font-bold leading-base">
            Entrar com GitHub
          </span>
        </button>
        <button className="flex w-full items-center gap-5 rounded-md bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500 xs:gap-3">
          <Image
            src="rocket.svg"
            alt="Rocket"
            width={32}
            height={32}
            className="xs:h-6 xs:w-6"
          />
          <span className="text-md font-bold leading-base">
            Acessar como visitante
          </span>
        </button>
      </div>
    </div>
  </div>
)
