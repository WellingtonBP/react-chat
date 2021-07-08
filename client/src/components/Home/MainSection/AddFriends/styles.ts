import styled from 'styled-components'

const SearchForm = styled.form`
  background-color: var(--darkBlue);
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;

  input {
    background-color: transparent;
    width: 100%;
    border: none;
    outline: none;
    color: white;
    padding: 1rem 0;
    font-size: 1.5rem;
    &::placeholder {
      color: white;
    }
  }
`

export { SearchForm }
