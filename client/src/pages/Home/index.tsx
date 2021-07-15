import React from 'react'

import Chat from '../../components/Home/Chat'
import MainSection from '../../components/Home/MainSection'
import { Container, Main } from './styles'

const Home: React.FC = () => {
  return (
    <Container>
      <Main>
        <MainSection />
        <Chat />
      </Main>
    </Container>
  )
}

export default Home
