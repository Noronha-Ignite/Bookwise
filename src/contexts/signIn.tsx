'use client'

import { SignInDialog } from '@/components/dialogs/SignInDialog'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

type SignInContextProps = {
  openSignInModal: () => void
}

const SignInContext = createContext({} as SignInContextProps)

export const SignInModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpen = () => {
    setIsOpenModal(true)
  }

  return (
    <SignInContext.Provider value={{ openSignInModal: handleOpen }}>
      <SignInDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        {children}
      </SignInDialog>
    </SignInContext.Provider>
  )
}

export const useSignInModal = () => useContext(SignInContext)
