import { InputHTMLAttributes } from 'react'

import { FormGroup, Input } from './styles'

type AuthFormControlProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: string
  isInvalid?: boolean
}

const AuthFormGroup: React.FC<AuthFormControlProps> = ({
  icon,
  isInvalid = false,
  ...inputProperties
}) => {
  return (
    <FormGroup invalid={isInvalid}>
      <Input {...inputProperties} />
      {icon && <img src={icon} alt="" />}
    </FormGroup>
  )
}

export default AuthFormGroup
