import React from 'react'
import AuthForm from '../components/Auth/AuthForm'
import { ToasterContextProvider } from '../ui/toaster-context'

function AuthPage() {
  return (
    <ToasterContextProvider>
      <AuthForm />
    </ToasterContextProvider>
  )
}

export default AuthPage