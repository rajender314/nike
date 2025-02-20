import styled from 'styled-components'
import { mediumFont } from 'styles'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
`

export const Backdrop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

export const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 480px;
  max-width: 90%;
  min-height: 260px;
  max-height: 90%;
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.25);
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`

export const Title = styled.div`
  font-size: 1.1rem;
  ${mediumFont}
`

export const CloseIcon = styled.div`
  position: absolute;
  right: 12px;
  cursor: pointer;
`

export const Body = styled.div`
  flex: 1;
  padding: 24px;
`

export const Footer = styled.div`
  padding: 12px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
`
