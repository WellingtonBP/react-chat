import styled from 'styled-components'

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: var(--darkBlue);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  color: white;
  transition: filter 300ms;
  &:hover {
    filter: brightness(1.3);
  }

  img {
    margin-left: 1rem;
    width: 2rem;
  }

  @media (min-width: 576px) {
    padding: 0.6rem 1.5rem;
    font-size: 1.8rem;

    img {
      margin-left: 1.2rem;
    }
  }
`

export { Button }
