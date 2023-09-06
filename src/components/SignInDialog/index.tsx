'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { PropsWithChildren, useRef } from 'react'

import GoogleSVG from '@/assets/google.svg'
import GithubSVG from '@/assets/github.svg'

import { X } from '../core/Icons'
import { signIn, useSession } from 'next-auth/react'
import { Box } from '../core/Box'
import { Button } from '../core/Button'
import Image from 'next/image'

type SignInDialogProps = {
  onOpenChange(open: boolean): void
  open: boolean
}

export const SignInDialog = ({
  children,
  open,
  onOpenChange,
}: PropsWithChildren<SignInDialogProps>) => {
  const session = useSession()
  const ref = useRef(null)

  if (session.status === 'authenticated') {
    return children
  }

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      await signIn(provider)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Dialog.Root onOpenChange={onOpenChange} open={open}>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-20 bg-black-a9" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <Box className="relative px-18 py-14">
              <Dialog.Close className="absolute right-4 top-4 text-gray-400">
                <X size={24} />
              </Dialog.Close>

              <div className="flex flex-1 flex-col gap-10">
                <h4 className="px-12 text-sm font-bold leading-short text-gray-200">
                  Faça login para deixar sua avaliação
                </h4>

                <div className="flex flex-col gap-4">
                  <Button onClick={() => handleSignIn('google')}>
                    <Image
                      src={GoogleSVG}
                      alt="Google"
                      width={32}
                      height={32}
                      className="xs:h-6 xs:w-6"
                    />
                    <span className="text-md font-bold leading-base">
                      Entrar com Google
                    </span>
                  </Button>
                  <Button onClick={() => handleSignIn('github')}>
                    <Image
                      src={GithubSVG}
                      alt="Github"
                      width={32}
                      height={32}
                      className="xs:h-6 xs:w-6"
                    />
                    <span className="text-md font-bold leading-base">
                      Entrar com GitHub
                    </span>
                  </Button>
                </div>
              </div>
            </Box>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div ref={ref}></div>
    </>
  )
}
