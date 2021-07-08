import React from 'react'
import { Link } from 'react-router-dom'

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

const Sign: React.FC = () => {
  return (
    <Auth>
      <Logo />
      <Form>
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
      </Form>
      {/* <Spinner /> */}
    </Auth>
  )
}

export default Sign
