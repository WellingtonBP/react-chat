import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/images/logo.svg'
import emailIcon from '../assets/images/emailIcon.svg'
import passwordIcon from '../assets/images/passwordIcon.svg'
import AuthFormGroup from '../components/Auth/FormGroup'
import ArrowButton from '../components/ArrowButton'
import Auth from '../components/Auth'
import FormFooter from '../components/Auth/FormFooter'

const Login: React.FC = () => {
  return (
    <Auth>
      <h1 className="logo">
        <img src={logo} alt="React Chat" />
      </h1>
      <form>
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
      </form>
    </Auth>
  )
}

export default Login
