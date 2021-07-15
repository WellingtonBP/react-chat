import styled from 'styled-components'

const Container = styled.div`
  @media (min-width: 768px) {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--darkBlue);
  }
`

const Main = styled.main`
  height: 100vh;

  @media (min-width: 768px) {
    display: flex;
    height: 80%;
    width: 80%;
    max-width: 100rem;
    max-height: 100rem;
    position: relative;
    margin-top: 6rem;
  }
`

export { Container, Main }
