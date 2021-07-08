import React from 'react'
import { Link } from 'react-router-dom'

import emailIcon from '../assets/images/emailIcon.svg'
import passwordIcon from '../assets/images/passwordIcon.svg'
import Spinner from '../components/Spinner'
import ArrowButton from '../components/ArrowButton'
import Auth from '../components/Auth'
import Form from '../components/Auth/Form'
import Logo from '../components/Auth/Logo'
import AuthFormGroup from '../components/Auth/Form/FormGroup'
import FormFooter from '../components/Auth/Form/FormFooter'

const Login: React.FC = () => {
  return (
    <Auth>
      <Logo />
      <Form>
        <AuthFormGroup icon={emailIcon} placeholder="Email:" type="email" />
        <AuthFormGroup
          icon={passwordIcon}
          placeholder="Password:"
          type="password"
        />
        <FormFooter>
          <ArrowButton type="submit">Login</ArrowButton>
          <Link to="/sign">I don't have an account</Link>
        </FormFooter>
      </Form>
      {/* <Spinner/> */}
    </Auth>
  )
}

export default Login
