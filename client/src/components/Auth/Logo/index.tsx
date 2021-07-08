import React from 'react'

import logoIcon from '../../../assets/images/logoIcon.svg'
import { Logo as LogoH1 } from './styles'

const Logo: React.FC = ({ children }) => {
  return (
    <LogoH1>
      <img src={logoIcon} alt="React Chat" />
    </LogoH1>
  )
}

export default Logo
