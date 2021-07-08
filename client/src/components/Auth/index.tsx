import React from 'react'

import { Main, Container } from './styles'

const Auth: React.FC = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  )
}

export default Auth
