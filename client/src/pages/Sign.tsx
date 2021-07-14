import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store'
import { authAction } from '../store/auth/authActions'
import useForm, { UseFormProps } from '../hooks/useForm'
import userIcon from '../assets/images/userIcon.svg'
import emailIcon from '../assets/images/emailIcon.svg'
import passwordIcon from '../assets/images/passwordIcon.svg'
import Spinner from '../components/Spinner'
import ArrowButton from '../components/ArrowButton'
import Auth from '../components/Auth'
import Form from '../components/Auth/Form'
import Logo from '../components/Auth/Logo'
import AuthFormGroup from '../components/Auth/Form/FormGroup'
import FormFooter from '../components/Auth/Form/FormFooter'

const signForm: UseFormProps = {
  name: {
    value: '',
    validationFn: value => value !== '',
    nullable: false
  },
  email: {
    value: '',
    validationFn: value =>
      /([a-z0-9_-])+@([a-z0-9])+\.([a-z0-9])+(\.([a-z0-9])+)?$/i.test(value),
    nullable: false
  },
  password: {
    value: '',
    validationFn: value => value.length >= 6,
    nullable: false
  }
}

const Sign: React.FC = () => {
  const dispatch = useDispatch()
  const { isLoading, authErr } = useSelector((state: RootState) => state.auth)
  const {
    state: formState,
    blurInputHandler,
    changeInputHandler
  } = useForm(signForm)

  const { name, email, password, valid: formIsValid } = formState

  const handleSign = (evt: FormEvent) => {
    evt.preventDefault()
    if (!formIsValid) return
    dispatch(authAction(email.value, password.value, name.value))
  }

  return (
    <Auth>
      <Logo />
      <Form onSubmit={handleSign}>
        <AuthFormGroup
          icon={userIcon}
          placeholder="Name:"
          type="text"
          value={name.value}
          isInvalid={!name.valid && name.touched}
          onChange={changeInputHandler.bind(null, 'name')}
          onBlur={blurInputHandler.bind(null, 'name')}
          aria-label="Type your name"
        />
        <AuthFormGroup
          icon={emailIcon}
          placeholder="Email:"
          type="email"
          value={email.value}
          isInvalid={!email.valid && email.touched}
          onChange={changeInputHandler.bind(null, 'email')}
          onBlur={blurInputHandler.bind(null, 'email')}
          aria-label="Type your email"
        />
        <AuthFormGroup
          icon={passwordIcon}
          placeholder="Password:"
          type="password"
          value={password.value}
          isInvalid={!password.valid && password.touched}
          onChange={changeInputHandler.bind(null, 'password')}
          onBlur={blurInputHandler.bind(null, 'password')}
          aria-label="Type your password"
        />
        {authErr && (
          <p className="invalid_msg" aria-label="Error message">
            {authErr}
          </p>
        )}
        <FormFooter>
          <div className="action">
            <ArrowButton type="submit" disabled={!formIsValid}>
              Sign
            </ArrowButton>
          </div>
          <Link to="/login">I already have an account</Link>
        </FormFooter>
      </Form>
      {isLoading && <Spinner />}
    </Auth>
  )
}

export default Sign
