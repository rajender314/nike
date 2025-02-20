import styled from 'styled-components'
import { antennaBoldFont } from 'styles'
type Props = {
  disabled?: boolean
}
export const Loginui = styled.div`
  width: 100%;
  max-width: 422px;
  margin: 0 auto;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.195668);
  border-radius: 3px;
`
export const ErrorUi = styled.div`
  color: red;
  margin-top: -6px;
`
export const UserErrorUi = styled.div`
  color: red;
  margin-top: -6px;
  text-align: center;
`
export const InputBox = styled.div`
  label {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    color: #5e6c84;
  }
`
export const ButtonContainer = styled.div`
  margin: 30px 0px;
  ${({ disabled }: Props) => {
    if (disabled) {
      return `
          button{
            background-color:#ccc;
            pointer-events:none;
          }
      `
    }
  }}
`
export const Picholder = styled.div`
  background-image: url('https://nikegloverteamlogo.s3.us-east-2.amazonaws.com/team/1594196745941-bg.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  padding: 100px 0;
  background-attachment: fixed;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const Welcomeheading = styled.h1`
  ${antennaBoldFont}
  font-size: 40px;
  color: #43425d;
  margin-bottom: 34px;
  text-align: center;
`
export const Welcomelogo = styled.div`
  text-align: center;
  margin-top: 30px;
  svg {
    width: 100px;
    height: 38px;
  }
`
