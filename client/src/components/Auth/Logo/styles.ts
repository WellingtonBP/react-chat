import styled from 'styled-components'

const Logo = styled.h1`
  margin: 0 auto 3rem;
  width: 20rem;
  img {
    width: 100%;
  }

  @media (min-width: 576px) {
    margin-bottom: 4rem;
  }

  @media (min-width: 768px) {
    margin-bottom: 4.5rem;
  }
`

export { Logo }
