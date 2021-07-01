import styled from 'styled-components'

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 3px solid var(--darkBlue);
  border-bottom-color: transparent;
  animation: spinner linear 800ms infinite;

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
export default Spinner
