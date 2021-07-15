import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, AppDispatch } from '../store'
import { authAction } from '../store/auth/authActions'
import useForm, { UseFormProps } from '../hooks/useForm'
import emailIcon from '../assets/images/emailIcon.svg'
import passwordIcon from '../assets/images/passwordIcon.svg'
import Spinner from '../components/Spinner'
import ArrowButton from '../components/ArrowButton'
import Auth from '../components/Auth'
import Form from '../components/Auth/Form'
import Logo from '../components/Auth/Logo'
import AuthFormGroup from '../components/Auth/Form/FormGroup'
import FormFooter from '../components/Auth/Form/FormFooter'

const loginForm: UseFormProps = {
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

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, authErr } = useSelector((state: RootState) => state.auth)
  const {
    state: formState,
    blurInputHandler,
    changeInputHandler
  } = useForm(loginForm)

  const { email, password, valid: formIsValid } = formState

  const handlelogin = (evt: FormEvent) => {
    evt.preventDefault()
    if (!formIsValid) return
    dispatch(authAction(email.value, password.value))
  }

  return (
    <Auth>
      <Logo />
      <Form onSubmit={handlelogin}>
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
          <ArrowButton type="submit" disabled={!formIsValid}>
            Login
          </ArrowButton>
          <Link to="/sign">I don't have an account</Link>
        </FormFooter>
      </Form>
      {isLoading && <Spinner />}
    </Auth>
  )
}

export default Login
