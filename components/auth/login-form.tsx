import React from 'react'
import { CardWrapper } from './card-wrapper'

export const LoginForm = () => {
  return (
    <CardWrapper 
    headerLabel='Welcome Back'
    backButtonHref='Forget password'
    backButtonLabel='/auth/forget-password'
    >
        Login From
    </CardWrapper>
  )
}

