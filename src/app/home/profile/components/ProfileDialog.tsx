'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { PropsWithChildren } from 'react'
import { ProfileInfo } from './ProfileInfo'
import { X } from '@/components/core/Icons'

type ProfileDialogProps = {
  user: User
  details: UserDetails
}

export const ProfileDialog = ({
  children,
  details,
  user,
}: PropsWithChildren<ProfileDialogProps>) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal tabIndex={10}>
        <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 z-10 overflow-x-hidden bg-black-a9">
          <Dialog.Content className="absolute right-0 top-0 h-full max-w-2xl animate-slide-in-from-right bg-gray-800">
            <div className="relative h-full py-16">
              <Dialog.Close className="absolute right-4 top-4 text-gray-400">
                <X size={24} />
              </Dialog.Close>
              <ProfileInfo user={user} details={details} />
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
