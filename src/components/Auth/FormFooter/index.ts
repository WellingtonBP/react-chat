import styled from 'styled-components'

const FormFooter = styled.footer`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: var(--dark);
    text-decoration: none;
    font-size: 1.4rem;
    transition: opacity 200ms;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (min-width: 576px) {
    margin-top: 4rem;
    a {
      font-size: 1.7rem;
    }
  }

  @media (min-width: 768px) {
    margin-top: 4.5rem;
  }
`
export default FormFooter
