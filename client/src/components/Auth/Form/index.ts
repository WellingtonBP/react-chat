import styled from 'styled-components'

const Form = styled.form`
  margin-bottom: 2rem;
  width: 100%;

  .invalid_msg {
    text-align: right;
    font-size: 1.2rem;
    margin: 0.5rem 0 1rem;
  }

  @media (min-width: 576px) {
    form .invalid_msg {
      font-size: 1.4rem;
      margin: 0.5rem 0 1.5rem;
    }
  }
`

export default Form
