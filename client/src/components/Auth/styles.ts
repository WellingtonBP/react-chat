import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--lightGrayishBlue);
`

const Main = styled.main`
  width: 75%;
  max-width: 40rem;
`
export { Main, Container }
