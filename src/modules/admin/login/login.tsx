import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginUser } from 'api'
import { Button, Input, Password, Icon } from 'components'
import {
  Loginui,
  Welcomeheading,
  Welcomelogo,
  Picholder,
  ButtonContainer,
  ErrorUi,
  InputBox,
  UserErrorUi,
} from './login-components'
import { UserContext } from 'providers'

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

export default function Login() {
  const { register, handleSubmit, errors } = useForm()
  const navigate = useNavigate()
  const [loginUser] = useLoginUser()
  const { user, setUser } = useContext(UserContext)

  const [loginProgress, setLoginProgress] = useState(false)
  const [userError, setUserError] = useState('')

  useEffect(() => {
    if (user.email) {
      navigate('/admin/orders')
    }
  }, [user])

  function login(data: any) {
    if (userError) {
      return
    }
    setLoginProgress(true)

    const { email = '', password = '' } = data
    const variables = { email, password }

    loginUser({ variables })
      .then((res: any) => {
        const {
          data: { login },
        } = res
        const { status = false, data = [], message = '' } = login

        if (status) {
          setUser(data[0])
          navigate('/admin/orders')
        } else {
          setUserError(message)
        }

        setLoginProgress(false)
      })
      .catch((err: any) => {
        setUserError('Error logging user')
        setLoginProgress(false)

        console.log(err)
      })
  }

  return (
    <>
      {!user.email && (
        <Picholder>
          <Loginui>
            <Welcomelogo>
              <Icon name="nikeLarge" />
            </Welcomelogo>
            <Welcomeheading>Login</Welcomeheading>
            <form onSubmit={handleSubmit(login)}>
              <InputBox>
                <Input
                  label="Email"
                  placeholder="Enter Email"
                  name="email"
                  onKeyUp={() => setUserError('')}
                  ref={register({
                    required: true,
                    pattern: emailPattern,
                  })}
                />
                {errors.email && errors.email.type === 'required' && (
                  <ErrorUi>Please enter Email</ErrorUi>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <ErrorUi>Please enter valid email</ErrorUi>
                )}
              </InputBox>
              <InputBox>
                <Password
                  label="Password"
                  placeholder="Enter Password"
                  name="password"
                  onKeyUp={() => {
                    setUserError('')
                  }}
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && (
                  <ErrorUi>Please enter Password</ErrorUi>
                )}
              </InputBox>
              <ButtonContainer disabled={loginProgress}>
                <Button width={'100%'} size="large" type="submit">
                  {loginProgress ? 'Logging In...' : 'Login'}
                </Button>
              </ButtonContainer>
              {userError && !errors.email && !errors.password && (
                <UserErrorUi>{userError}</UserErrorUi>
              )}
            </form>
          </Loginui>
        </Picholder>
      )}
    </>
  )
}
