import styled from 'styled-components'

const Form = styled.form`
  margin-bottom: 2rem;
  width: 100%;

  .invalid_msg {
    text-align: right;
    font-size: 1.2rem;
    margin: 0.5rem 0;
    color: var(--danger);
  }

  @media (min-width: 576px) {
    .invalid_msg {
      font-size: 1.4rem;
      margin: 1rem 0;
    }
  }
`

export default Form
