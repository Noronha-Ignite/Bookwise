'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { PropsWithChildren, createContext } from 'react'

import { X } from '../../core/Icons'
import { BookDetails } from './BookDetails'
import { BookRatings } from './BookRatings'

type BookDialogProps = {
  book: BookWithRatingAndCategories
  onBookRated?: (bookRated: BookWithRatingAndCategories) => void
}

export const BookDialogContext = createContext({} as BookDialogProps)

export const BookDialog = ({
  children,
  book,
  onBookRated,
}: PropsWithChildren<BookDialogProps>) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal tabIndex={10}>
        <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 z-10 animate-overlay-show overflow-x-hidden bg-black-a9 ">
          <Dialog.Content className="absolute right-0 top-0 h-full w-full max-w-[min(42rem,100vw)] animate-slide-in-from-right overflow-y-auto bg-gray-800">
            <div className="flex h-full flex-col gap-12 px-12 py-16">
              <Dialog.Close className="fixed right-4 top-4 text-gray-400">
                <X size={24} />
              </Dialog.Close>

              <BookDialogContext.Provider value={{ book, onBookRated }}>
                <BookDetails />
                <BookRatings />
              </BookDialogContext.Provider>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
