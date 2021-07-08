import styled from 'styled-components'

const ActionButton = styled.button<{ background: string }>`
  background-color: ${props => props.background};
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: white;
`

export default ActionButton
