import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/images/logo.svg'
import userIcon from '../assets/images/userIcon.svg'
import emailIcon from '../assets/images/emailIcon.svg'
import passwordIcon from '../assets/images/passwordIcon.svg'
import AuthFormGroup from '../components/Auth/FormGroup'
import ArrowButton from '../components/ArrowButton'
import Auth from '../components/Auth'
import FormFooter from '../components/Auth/FormFooter'
import Spinner from '../components/Spinner'

const Sign: React.FC = () => {
  return (
    <Auth>
      <h1 className="logo">
        <img src={logo} alt="React Chat" />
      </h1>
      <form>
        <AuthFormGroup icon={userIcon} placeholder="Name:" type="text" />
        <p className="invalid_msg"></p>
        <AuthFormGroup icon={emailIcon} placeholder="Email:" type="email" />
        <p className="invalid_msg"></p>
        <AuthFormGroup
          icon={passwordIcon}
          placeholder="Password:"
          type="password"
        />
        <p className="invalid_msg"></p>
        <FormFooter>
          <div className="action">
            <ArrowButton type="submit">Sign</ArrowButton>
          </div>
          <Link to="/login">I already have an account</Link>
        </FormFooter>
      </form>
      {/* <Spinner /> */}
    </Auth>
  )
}

export default Sign
