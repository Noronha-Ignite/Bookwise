'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { PropsWithChildren } from 'react'

import { Sidebar } from './Sidebar'

export const SidebarDialog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal tabIndex={10}>
        <Dialog.Overlay className="animate-overlay-show fixed bottom-0 left-0 right-0 top-0 z-10 overflow-x-hidden bg-black-a9 ">
          <Dialog.Content className="absolute left-0 top-0 h-full max-w-2xl animate-slide-in-from-left bg-transparent">
            <div className="h-full p-4">
              <Sidebar />
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
