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

  .logo {
    margin: 0 auto 3rem;
    width: 20rem;
    img {
      width: 100%;
    }
  }

  form {
    margin-bottom: 2rem;
    width: 100%;

    .invalid_msg {
      text-align: right;
      font-size: 1.2rem;
      margin: 0.5rem 0 1rem;
    }
  }

  @media (min-width: 576px) {
    .logo {
      margin-bottom: 4rem;
    }

    form .invalid_msg {
      font-size: 1.4rem;
      margin: 0.5rem 0 1.5rem;
    }
  }

  @media (min-width: 768px) {
    .logo {
      margin-bottom: 4.5rem;
    }
  }
`
export { Main, Container }
