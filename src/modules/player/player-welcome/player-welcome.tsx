import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { usePlayerLogin } from 'api'
import { Button, Input } from 'components'
import {
  Welcomeui,
  Loginui,
  Welcomeheading,
  Welcomesubheading,
  Welcomelogo,
  Buttonholder,
  Picholder,
  ErrorUi,
  PrivacyPolicy,
  ButtonContainer,
} from './player-welcome-components'
import { useMediaQuery } from 'react-responsive'

export default function Welcome() {
  const isMobile = useMediaQuery({ maxWidth: 991 })
  const navigate = useNavigate()
  const [getLoginUser] = usePlayerLogin()
  const [loginData, setLoginData] = useState<any>({})
  const [invalidError, setInvalidError] = useState('')
  const [disabled, setDisabled] = useState<boolean>(false)
  const { register, handleSubmit, errors } = useForm()

  function login(data: any) {
    if (data.name) {
      setDisabled(true)
      let loginVariable = {
        accessCode: data.name,
      }
      getLoginUser({ variables: loginVariable }).then((res: any) => {
        const {
          accessCodeLogin: {
            status = false,
            message = '',
            isPlayer,
            isTeam,
            data,
          },
        } = res.data

        if (status) {
          sessionStorage.setItem(
            'playerData',
            JSON.stringify({ ...data, isPlayer, isTeam }),
          )
          setLoginData({ ...data, isPlayer, isTeam })
          setDisabled(false)
        } else {
          setInvalidError(message)
          setDisabled(false)
        }
      })
    }
  }

  const getFirstName = (name: string) => {
    if (name) {
      return name.split(' ')[0]
    }

    return ''
  }

  if (!loginData.name) {
    return (
      <Picholder>
        <Loginui className={isMobile ? 'mobile' : ''}>
          <Welcomelogo>
            <svg width="100px" height="38px" viewBox="0 0 180 65" version="1.1">
              <g
                id="NIKE_LOGO"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd">
                <path
                  d="M19.8553469,64.4870508 C14.4920898,64.2727866 10.1041373,62.79695 6.67312217,60.0558462 C6.01832724,59.5321919 4.45802352,57.9621527 3.93455493,57.2999657 C2.54323052,55.5405981 1.5973136,53.8283319 0.966396199,51.9285844 C-0.975029403,46.0806503 0.0241527421,38.4068527 3.82435102,29.9849779 C7.07812156,22.7748038 12.0988282,15.6237371 20.8582025,5.71956043 C22.1485067,4.26219463 25.9909498,0 26.0157457,0 C26.0249293,0 25.8155419,0.364803223 25.5519708,0.80903196 C23.2744233,4.64546891 21.3256508,9.16441112 20.2640198,13.0765793 C18.5586142,19.3539654 18.7643282,24.741047 20.8664678,28.9182748 C22.3165676,31.7960643 24.8025842,34.2887323 27.5980902,35.6666727 C32.4920623,38.0780682 39.6571534,38.2775555 48.407344,36.2503579 C49.0097921,36.1099777 78.8621954,28.1406436 114.746426,18.5403157 C150.630657,8.93906432 179.995408,1.08979191 180,1.09625678 C180.010102,1.10456875 96.6307398,36.9845821 53.3472344,55.5987819 C46.4925512,58.5458379 44.6594926,59.2902213 41.4369465,60.4280378 C33.199204,63.337228 25.8201337,64.7253275 19.8553469,64.4870508 Z"
                  id="Nike"
                  fill="#282A34"
                  fillRule="nonzero"></path>
              </g>
            </svg>
          </Welcomelogo>
          <Welcomeheading>Login</Welcomeheading>
          <form onSubmit={handleSubmit(login)}>
            <Input
              label="Access Code"
              placeholder="Enter Access Code"
              name="name"
              ref={register({ required: true })}
              onKeyUp={() => setInvalidError('')}
            />
            {errors.name && <ErrorUi>Please Enter Access Code</ErrorUi>}
            {invalidError && <ErrorUi>{invalidError}</ErrorUi>}
            <ButtonContainer disabled={disabled}>
              <Button width={'100%'} type="submit">
                {disabled ? 'Logging In...' : 'Login'}
              </Button>
            </ButtonContainer>
          </form>
        </Loginui>
        <PrivacyPolicy>
          By entering the website, you acknowledge that these designs are
          confidential JR286 designs. Any use or reproduction of these materials
          is strictly prohibited. Do not post these designs on social media.
          Keep it tight.
        </PrivacyPolicy>
      </Picholder>
    )
  } else {
    return (
      <Welcomeui>
        <Picholder>
          <Welcomelogo className={isMobile ? 'mobile' : ''}>
            <svg width="180px" height="65px" viewBox="0 0 180 65" version="1.1">
              <g
                id="NIKE_LOGO"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd">
                <path
                  d="M19.8553469,64.4870508 C14.4920898,64.2727866 10.1041373,62.79695 6.67312217,60.0558462 C6.01832724,59.5321919 4.45802352,57.9621527 3.93455493,57.2999657 C2.54323052,55.5405981 1.5973136,53.8283319 0.966396199,51.9285844 C-0.975029403,46.0806503 0.0241527421,38.4068527 3.82435102,29.9849779 C7.07812156,22.7748038 12.0988282,15.6237371 20.8582025,5.71956043 C22.1485067,4.26219463 25.9909498,0 26.0157457,0 C26.0249293,0 25.8155419,0.364803223 25.5519708,0.80903196 C23.2744233,4.64546891 21.3256508,9.16441112 20.2640198,13.0765793 C18.5586142,19.3539654 18.7643282,24.741047 20.8664678,28.9182748 C22.3165676,31.7960643 24.8025842,34.2887323 27.5980902,35.6666727 C32.4920623,38.0780682 39.6571534,38.2775555 48.407344,36.2503579 C49.0097921,36.1099777 78.8621954,28.1406436 114.746426,18.5403157 C150.630657,8.93906432 179.995408,1.08979191 180,1.09625678 C180.010102,1.10456875 96.6307398,36.9845821 53.3472344,55.5987819 C46.4925512,58.5458379 44.6594926,59.2902213 41.4369465,60.4280378 C33.199204,63.337228 25.8201337,64.7253275 19.8553469,64.4870508 Z"
                  id="Nike"
                  fill="#282A34"
                  fillRule="nonzero"></path>
              </g>
            </svg>
          </Welcomelogo>
          <Welcomeheading className={isMobile ? 'mobile' : ''}>
            {loginData.isPlayer
              ? 'Hi ' + getFirstName(loginData.name)
              : loginData.name}
            ,
          </Welcomeheading>
          <Welcomeheading className={isMobile ? 'mobile' : ''}>
            Welcome to your custom editor.
          </Welcomeheading>
          <Welcomesubheading className={isMobile ? 'mobile' : ''}>
            Here you will have an opportunity to edit your gloves personally.
          </Welcomesubheading>
          <Welcomesubheading className={isMobile ? 'mobile' : ''}>
            Click the button below to get started.
          </Welcomesubheading>
          <Buttonholder className={isMobile ? 'mobile' : ''}>
            <Button onClick={() => navigate('/orders')}>
              Continue your Configuration
            </Button>
          </Buttonholder>
        </Picholder>
      </Welcomeui>
    )
  }
}
