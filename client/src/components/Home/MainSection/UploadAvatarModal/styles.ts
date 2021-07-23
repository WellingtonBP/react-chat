import styled from 'styled-components'

const Backdrop = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`

const Overlay = styled.section`
  background-color: var(--lightGrayishBlue);
  position: absolute;
  width: 80%;
  max-width: 60rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  padding: 2rem 3rem;

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    img {
      width: 3rem;
    }
    float: right;
  }

  h1 {
    margin-top: 3rem;
    text-align: center;
    font-size: 2rem;
    font-weight: normal;
  }

  > img {
    display: block;
    margin: 1rem auto 0;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
  }

  input {
    cursor: pointer;
    display: block;
    margin: 0 auto;
    margin-top: 2rem;
    border: 2px solid var(--darkGrayishBlue);
    border-radius: 0.5rem;
    width: 100%;
    max-width: 30rem;
  }
`

export { Backdrop, Overlay }
