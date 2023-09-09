'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { PropsWithChildren, useState } from 'react'

import { SignOut, X } from '../../core/Icons'
import { signOut, useSession } from 'next-auth/react'
import { Box } from '../../core/Box'
import { twMerge } from 'tailwind-merge'

export const SignOutDialog = ({ children }: PropsWithChildren) => {
  const session = useSession()

  const [isLoading, setIsLoading] = useState(false)

  if (session.status !== 'authenticated') {
    return <>{children}</>
  }

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-20 animate-overlay-show bg-black-a9" />
        <Dialog.Content>
          <Box
            className={twMerge(
              'relative flex h-full w-full animate-pop-up items-center justify-center rounded-none px-18 py-14',
              'xs:h-fit xs:w-fit xs:min-w-[216px] xs:rounded-sm',
              'fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2',
            )}
          >
            <Dialog.Close className="absolute right-4 top-4 text-gray-400">
              <X size={24} />
            </Dialog.Close>

            <div className="flex flex-col items-center gap-8">
              <h4 className="text-md font-bold">
                Tem certeza que deseja sair?
              </h4>

              <div className="flex gap-4">
                <Dialog.Close className="grid h-32 w-32 grid-cols-1 place-items-center gap-2 rounded-sm border border-gray-400 px-4 py-8 text-xs text-gray-400 hover:brightness-125">
                  <X size={32} />
                  Nop! quero continuar
                </Dialog.Close>
                <button
                  className="grid h-32 w-32 grid-cols-1 place-items-center gap-2 rounded-sm bg-danger px-4 py-8 text-xs hover:brightness-110"
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  <SignOut size={32} />
                  Sim, quero sair
                </button>
              </div>
            </div>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
