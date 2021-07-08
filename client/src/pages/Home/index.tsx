import React, { useState } from 'react'

import Chat from '../../components/Home/Chat'
import MainSection from '../../components/Home/MainSection'
import { Container, Main } from './styles'

const Home: React.FC = () => {
  const [isChatting, setIsChatting] = useState(false)

  return (
    <Container>
      <Main>
        <MainSection isChatting={isChatting} />
        <Chat isChatting={isChatting} />
      </Main>
    </Container>
  )
}

export default Home
