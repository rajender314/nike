import styled from 'styled-components'
import { antennaBoldFont, screenSize } from 'styles'
type Props = {
  disabled: boolean
}

export const Welcomeui = styled.div`
  width: 100%;
  height: 100vh;
`
export const Loginui = styled.div`
  max-width: 400px;
  padding: 30px;
  margin: 0 auto;
  background: #fff;
  border-radius: 4px;
  &.mobile {
    input {
      font-size: 16px;
    }
  }
`
export const ErrorUi = styled.div`
  color: red;
  text-align: center;
  margin-top: -6px;
  margin-bottom: 10px;
`
export const Picholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url('https://nikegloverteamlogo.s3.us-east-2.amazonaws.com/team/1594196745941-bg.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`
export const Welcomeheading = styled.h1`
  ${antennaBoldFont}
  font-size: 52px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #4e515e;
  text-align: center;
  &.mobile {
    font-size: 30px;
    padding: 0 10px;
  }
`

export const Welcomesubheading = styled.h5`
  font-size: 21px;
  font-weight: 400;
  margin-top: 0px;
  color: #4c4f5b;
  margin-bottom: 6px;
  text-align: center;
  &.mobile {
    font-size: 18px;
    padding: 0 10px;
  }
`
export const Welcomelogo = styled.div`
  text-align: center;
  margin-bottom: 18px;
  &.mobile {
    svg {
      width: 100px;
      height: 38px;
    }
  }
`
export const Buttonholder = styled.div`
  margin-top: 20px;
  &.mobile {
    position: absolute;
    bottom: 36px;
    height: 60px;
    width: 90%;
    button {
      height: 60px;
      font-size: 14px;
      width: 100%;
    }
  }
`
export const PrivacyPolicy = styled.div`
  position: fixed;
  bottom: 10%;
  max-width: 800px;
  padding: 20px;
  color: #444753;
  font-size: 1.2rem;
  text-align: center;
  @media (${screenSize.mobile}) {
    bottom: 2%;
    font-size: 0.9rem;
  }
`
export const ButtonContainer = styled.div`
  margin-top: 12px;
  ${({ disabled }: Props) => {
    if (disabled) {
      return `
          button{
            background-color:#ccc;
            pointer-events:none;
          }
      `
    }
  }};
`
