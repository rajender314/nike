import styled, { keyframes } from 'styled-components'
import { whiteColor, antennaBoldFont } from 'styles'

type NavProps = {
  active?: boolean
}

type ImageProps = {
  image?: string
}

const SlideFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  width: 72px;
  height: 100%;
  background-color: black;
  color: #d0d4d7;
  ${antennaBoldFont}
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.1;
  a {
    display: block;
    color: inherit;
  }
`

export const Logo = styled.span`
  display: block;
  padding: 24px 8px 16px 8px;
  text-align: center;
  label {
    text-align: left;
  }
  svg g {
    fill: #ceff00;
  }
`

export const Nav = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  border-top: 1px solid #b5bfc8;
  &::-webkit-scrollbar {
    width: 0;
  }
`

export const NavItem = styled.div`
  position: relative;
  padding: 16px 8px;
  text-align: center;
  a {
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${whiteColor};
      svg g,
      svg path {
        fill: ${whiteColor};
      }
    }
  }
  svg g,
  svg path {
    fill: #d0d4d7;
    transition: all 0.2s ease-in-out;
  }
  &:nth-last-child(2) {
    border-top: 1px solid #b5bfc8;
  }
  ${({ active }: NavProps) => {
    if (active) {
      return `
        a {
          transition-delay: 0.25s;
          color: #ceff00;
          svg g,
          svg path {
            transition-delay: 0.25s;
            fill: #ceff00;
          }
          &:hover {
            color: #ceff00;
            svg g,
            svg path {
              fill: #ceff00;
            }
          }
        }`
    }
  }}
`

export const NavItemContainer = styled.span`
  display: block;
  overflow: hidden;
  &.animate span {
    animation: ${SlideFromTop} 0.25s ease-in-out;
  }
`

export const NavFocus = styled.div`
  position: absolute;
  left: 0;
  top: -200px;
  width: 5px;
  height: 100px;
  background-color: #ceff00;
  border-radius: 3px;
  transition: height 0.2s ease, top 0.2s ease-in-out;
`

export const UserIcon = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 8px;
`

export const IconContainer = styled.span`
  display: block;
  cursor: pointer;
`

export const ToolTipContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 150px;
  z-index: 1;
  left: 80px;
  position: absolute;
`

export const Label = styled.label`
  display: inline-block;
  margin-top: 6px;
  cursor: inherit;
  font-size: 13px;
  ${antennaBoldFont}
`

export const ToolTipBody = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 15px 15px 0px 20px;
  border: 1px solid #e3e8ef;
  border-radius: 4px;
  box-shadow: 0px 0px 1px;
  height: 50px;
  overflow: auto;
  .label {
    margin-bottom: 12px;
  }
`
export const LogoutText = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #404040;
  cursor: pointer;
`
export const LogoutBox = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
`
export const UserImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #e8eaed;
  background-color: #e8eaed;
  font-size: 18px;
  color: black;
  cursor: pointer;
`
export const PreviewImg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  ${({ image }: ImageProps) => {
    if (image) {
      return `background-image:url(${image});`
    }
  }}
`
