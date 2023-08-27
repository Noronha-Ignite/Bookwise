import Image from 'next/image'

export default function Home() {
  return (
    <div className="grid grid-cols-[min(50%,700px),1fr] p-4 md:grid-cols-1">
      <div className="relative bg-gradient-hero h-[calc(100vh-2rem)] rounded-md overflow-hidden md:hidden">
        <Image
          src="/assets/woman-reading.png"
          alt="Mulher lendo"
          width={738}
          height={984}
          className="object-cover object-bottom h-full opacity-[0.18] blur-[0.5px]"
        />
        <Image
          src="logo.svg"
          alt="Bookwise"
          width={232}
          height={58}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5"
        />
      </div>

      <div className="flex flex-1 justify-center items-center p-8 pr-4">
        <div className="flex gap-10 flex-col w-[min(100%,372px)]">
          <header>
            <h3 className="leading-short text-xl font-bold">Boas vindas!</h3>
            <p className="leading-base text-sm text-gray-200">
              Faça seu login ou acesse como visitante.
            </p>
          </header>

          <div className="w-full flex flex-col gap-4">
            <button className="flex items-center w-full bg-gray-600 px-6 py-5 rounded-md gap-5 hover:bg-gray-500 transition-colors xs:gap-3">
              <Image
                src="google.svg"
                alt="Google"
                width={32}
                height={32}
                className="xs:w-6 xs:h-6"
              />
              <span className="text-md font-bold leading-base xs:text-xs">
                Entrar com Google
              </span>
            </button>
            <button className="flex items-center w-full bg-gray-600 px-6 py-5 rounded-md gap-5 hover:bg-gray-500 transition-colors xs:gap-3">
              <Image
                src="github.svg"
                alt="Github"
                width={32}
                height={32}
                className="xs:w-6 xs:h-6"
              />
              <span className="text-md font-bold leading-base xs:text-xs">
                Entrar com GitHub
              </span>
            </button>
            <button className="flex items-center w-full bg-gray-600 px-6 py-5 rounded-md gap-5 hover:bg-gray-500 transition-colors xs:gap-3">
              <Image
                src="rocket.svg"
                alt="Rocket"
                width={32}
                height={32}
                className="xs:w-6 xs:h-6"
              />
              <span className="text-md font-bold leading-base xs:text-xs">
                Acessar como visitante
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
