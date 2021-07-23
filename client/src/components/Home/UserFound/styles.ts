import styled from 'styled-components'

const UserFoundWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--lightGrayishBlue);
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;

  & + & {
    margin-top: 1.2rem;
  }

  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  .info {
    span {
      font-size: 1.6rem;
    }
    p {
      margin-top: 0.5;
      font-size: 1.3rem;
    }
    text-align: center;
  }
`
export { UserFoundWrapper }
