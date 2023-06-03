import React, { useState } from 'react'

import { Container, Heading, SwapForm } from './Auth.styles'
import { Login, Signup } from './forms'

const Auth: React.FC = () => {
  const [isLoggingIn, setIsLogingIn] = useState(true)

  return (
    <Container>
      <Heading>Do Daily</Heading>
      {isLoggingIn ? <>
        <Login />
        <p>Haven't got an account? <SwapForm onClick={() => setIsLogingIn(false)}>Sign up</SwapForm></p>
      </> : <>
        <Signup />
        <p>Already have an account? <SwapForm onClick={() => setIsLogingIn(true)}>Log in</SwapForm></p>
      </>}
    </Container>
  )
}

export default Auth
