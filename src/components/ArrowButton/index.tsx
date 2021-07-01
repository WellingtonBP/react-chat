import React, { ButtonHTMLAttributes } from 'react'

import arrowIcon from '../../assets/images/arrowIcon.svg'
import { Button } from './styles'

type ArrowButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const ArrowButton: React.FC<ArrowButtonProps> = ({ children, ...props }) => {
  return (
    <Button {...props}>
      {children} <img src={arrowIcon} alt="->" />
    </Button>
  )
}

export default ArrowButton
