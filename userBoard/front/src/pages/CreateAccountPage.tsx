import React from 'react'
import CreateAccountForm from '../components/Auth/CreateAccountForm'
import { ToasterContextProvider } from '../ui/toaster-context'

function CreateAccountPage() {
  return (
    <ToasterContextProvider>
      <CreateAccountForm />
    </ToasterContextProvider>
  )
}

export default CreateAccountPage