import styled from 'styled-components'

const FormGroup = styled.div<{ invalid?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props =>
    props.invalid ? 'var(--danger)' : 'var(--dark)'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  & + & {
    margin-top: 1rem;
  }

  > img {
    height: 2.5rem;
  }

  @media (min-width: 576px) {
    padding: 0.7rem 2rem;
    & + & {
      margin-top: 1.5rem;
    }

    > img {
      height: 2.7rem;
    }
  }

  @media (min-width: 768px) {
    padding: 0.8rem 2rem;
    & + & {
      margin-top: 2rem;
    }
  }
`

const Input = styled.input`
  color: white;
  height: 3rem;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.5rem;
  &::placeholder {
    color: white;
  }
`

export { FormGroup, Input }
