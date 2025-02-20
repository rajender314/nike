import styled, { css, keyframes } from 'styled-components'
import { antennaBoldFont, screenSize, primaryColor, boldFont } from 'styles'

type Props = {
  disabled?: boolean
}

const AnimateTooltip = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const SlideInLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`

const SlideInRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`

const SlideOutLeft = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`

const SlideOutRight = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
`

export const Container = styled.div`
  flex: 1;
  height: 100vh;
  overflow: hidden;
  ${({ blur }: { blur?: boolean }) => {
    if (blur) {
      return `filter: blur(4px)`
    }
  }}
`

export const InnerContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`

export const DesignerViewContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
  @media (${screenSize.tablet}) {
    width: calc(100vw - 360px);
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  padding: 16px 20px;
  @media (${screenSize.tablet}) {
    padding: 24px;
  }
`

export const LeftNav = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 24px;
  top: 80px;
  width: 48px;
  z-index: 2;
  @media (${screenSize.tablet}) {
    top: 100px;
    bottom: 100px;
    width: 150px;
    button {
      margin: 0 16px;
    }
  }
`

export const RightNav = styled.div`
  width: 100%;
  z-index: 2;
  @media (${screenSize.mobile}) {
    position: absolute;
    bottom: 0;
  }
  @media (${screenSize.tablet}) {
    width: 360px;
    background-color: #fff;
    border-left: 1px solid #e3e3e3;
  }
`

export const BackIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-size: 2.4rem;
  color: #404040;
  cursor: pointer;
  > svg {
    position: relative;
    left: 0px;
    transition: left 0.3s ease;
  }
  &:hover {
    > svg {
      left: -4px;
    }
  }
`

export const HeaderTitleContainer = styled.div`
  flex: 1;
  position: relative;
  margin-left: 16px;
  @media (${screenSize.tablet}) {
    display: flex;
    align-items: center;
  }
`

export const HeaderTitle = styled.div`
  color: #404040;
  font-size: 1.6rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const VerticalSeperator = styled.div`
  width: 2px;
  height: 32px;
  margin: 0 16px;
  ${({ isAdmin }: { isAdmin: boolean }) => {
    if (isAdmin) {
      return `
        flex: 1;
      `
    } else {
      return `
        border: 1px solid #808080;
        border-radius: 50%;
      `
    }
  }}
  @media (${screenSize.mobile}) {
    display: none;
  }
`

export const OrderStatus = styled.div`
  width: fit-content;
  min-height: 22px;
  padding: 4px 0;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  @media (${screenSize.mobile}) {
    position: absolute;
    &.new {
      color: rgba(240, 79, 100, 0.8);
    }
    &.in-progress {
      color: rgba(34, 105, 210, 0.8);
    }
    &.submitted {
      color: rgba(82, 178, 127, 0.8);
    }
  }
  @media (${screenSize.tablet}) {
    padding: 4px 8px;
    color: rgba(255, 255, 255, 0.9);
    &.new {
      background-color: rgba(240, 79, 100, 0.8);
    }
    &.in-progress {
      background-color: rgba(34, 105, 210, 0.8);
    }
    &.submitted {
      background-color: rgba(82, 178, 127, 0.8);
    }
  }
`

export const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transform: scale(1, 1);
  transition: transform 0.15s ease-in-out;
  ${({ iconStyles }: { iconStyles?: string }) => {
    return `
      > svg {
        ${iconStyles}
      }
    `
  }}
  @media (${screenSize.tablet}) {
    width: 40px;
    height: 40px;
  }
  > svg {
    font-size: 2.4rem;
  }
  &.preview {
    > svg {
      font-size: 1.5rem;
    }
  }
`

export const ViewInfo = styled.div`
  width: 100px;
  overflow: hidden;
  margin-left: 6px;
`

export const ViewName = styled.div`
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
`

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  @media (${screenSize.mobile}) {
    justify-content: center;
    height: 48px;
    margin: 8px 0;
    background-color: rgba(238, 238, 241, 0.8);
    border-radius: 6px;
  }
  @media (${screenSize.tablet}) {
    margin: 30px 0;
  }
  ${({ active }: { active: boolean }) => {
    if (active) {
      return `
        @media (${screenSize.mobile}) {
          background-color: rgba(117, 117, 122, 0.8);
          color: #fff;
          ${NavIcon} {
            svg path,
            svg polygon {
              fill: #fff;
            }
          }
        }
        @media (${screenSize.tablet}) {
          color: #FF3366;
          ${NavIcon} {
            transform: scale(1.1, 1.1);
            svg path,
            svg polygon {
              fill: #ff3366;
            }
          }
          ${ViewName} {
            transform: translateX(0%);
          }
        }
      `
    } else {
      return `
        color: #3A404A;
      `
    }
  }}
  &:hover {
    ${NavIcon} {
      transform: scale(1.1, 1.1);
    }
    ${ViewName} {
      transform: translateX(0%);
    }
  }
  &:active {
    color: #ff3366;
    svg path,
    svg polygon {
      fill: #ff3366;
    }
  }
`

export const CanvasSlider = styled.div`
  position: absolute;
  @media (${screenSize.mobile}) {
    transition: bottom 0.25s ease;
    top: 80px;
    width: 100%;
    ${({ editMode, height }: { editMode: boolean; height: number }) => {
      if (editMode) {
        return `bottom: ${height}px;`
      } else {
        return `bottom: 100px;`
      }
    }}
  }
  @media (${screenSize.tablet}) {
    top: 100px;
    bottom: 80px;
    left: 80px;
    right: 80px;
  }
`

export const CanvasSlide = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  ${({
    active,
    inactive,
    left,
    right,
  }: {
    active: boolean
    inactive: boolean
    left: boolean
    right: boolean
  }) => {
    if (active) {
      if (left) {
        return css`
          animation: 0.3s ${SlideInRight} ease-in-out;
          z-index: 2;
        `
      } else if (right) {
        return css`
          animation: 0.3s ${SlideInLeft} ease-in-out;
          z-index: 2;
        `
      } else {
        return `
          z-index: 2;
        `
      }
    } else if (inactive) {
      if (left) {
        return css`
          animation: 0.3s ${SlideOutLeft} ease-in-out;
          z-index: 1;
        `
      } else if (right) {
        return css`
          animation: 0.3s ${SlideOutRight} ease-in-out;
          z-index: 1;
        `
      }
    }
  }}
  @media (${screenSize.tablet}) {
    background-color: #f5f5f5;
  }
`

export const CanvasInnerSlide = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
`

export const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  float: left;
`

export const CanvasInnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .canvas-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100% !important;
    height: 100% !important;
    .lower-canvas,
    .upper-canvas {
      width: auto !important;
      height: auto !important;
      left: auto !important;
      top: auto !important;
    }
  }
`

export const CanvasSliderProgressBar = styled.div`
  display: flex;
  position: absolute;
  bottom: 50px;
  height: 4px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  border-radius: 2px;
`

export const CanvasSliderThumb = styled.div`
  width: 60px;
  height: 100%;
  margin: 0 8px;
  background-color: #dfdfdf;
  cursor: pointer;
  border-radius: 2px;
`

export const CanvasSliderProgress = styled.div`
  width: 60px;
  height: 100%;
  margin: 0 8px;
  position: absolute;
  left: 0;
  transition: left 0.3s ease-in-out;
  background-color: #f53366;
  border-radius: 2px;
`

export const OverlayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.96);
  z-index: 3;
`

export const OverlayMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const OverlayTitle = styled.div`
  margin: 8px 16px;
  color: #4c4f5b;
  font-size: 1.2rem;
  font-weight: 500;
  white-space: pre-line;
`

export const OverlayMessage = styled.div`
  margin: 8px 16px;
  color: #4c4f5b;
  font-size: 1.1rem;
  white-space: pre-line;
`

export const OverlayIconContainer = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
`

export const OverlayActions = styled.div`
  margin-top: 16px;
`

export const OverlayButtonContainer = styled.div`
  margin: 16px 0;
`

export const SuccessMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.96);
`

export const SuccessLogo = styled.div`
  margin-bottom: 24px;
`

export const SuccessMsg = styled.div`
  margin-bottom: 24px;
  text-align: center;
  color: #4e515e;
  ${antennaBoldFont}
  font-size: 1.8rem;
  @media (${screenSize.tablet}) {
    font-size: 3rem;
  }
`

export const ExportSpecContainer = styled.div`
  position: relative;
  margin-left: 20px;
  button {
    margin-left: 0;
  }
`

export const ExportSpecTooltipContainer = styled.div`
  width: 180px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 55px;
  margin-left: -90px;
  transform-origin: 50% 0%;
  animation: 0.3s ${AnimateTooltip} ease;
  background: #fff;
  box-shadow: 0 1px 8px rgb(0 0 0 / 15%), 0 0 1px rgb(0 0 0 / 25%);
  border-radius: 6px;
  z-index: 1;
  &::before,
  &::after {
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-12px);
    width: 0;
    height: 0;
    content: '';
    margin: auto;
    border-style: solid;
    border-width: 0 12px 10px 12px;
  }
  &::before {
    border-color: transparent transparent rgba(0, 0, 0, 0.15) transparent;
    top: -11px;
  }
  &::after {
    border-color: transparent transparent white transparent;
    top: -10px;
  }
`

export const ExportContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ExportItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 15px 0px;
  padding: 0 10px;
  cursor: pointer;
  svg {
    margin-right: 5px;
  }
  &:hover {
    color: ${primaryColor};
  }
`
export const SwitchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ active }: { active?: boolean }) => {
    if (active) {
      return `
        button{
               border:2px solid ${primaryColor};
                color: ${primaryColor};
                &:hover {
                    border:2px solid black;
                    
                   
                }
                &:active {
                    border:2px solid ${primaryColor};
                    color: ${primaryColor};
                     
                }
              }
            `
    }
  }}
  }
`
export const SizeBox = styled.button`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border: 2px solid #d3d3d3;
  border-radius: 5px;
  margin-right: 20px;
  ${boldFont};
  &:hover {
    color: black;
    border: 2px solid black;
  }
`
export const SavingIndicator = styled.div`
  margin-left: 10px;
`

export const ButtonContainer = styled.div`
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

export const MobileNavContainer = styled.div``

export const CustomiseButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
`

export const MobileListContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 160px;
  padding: 8px 0;
  overflow: hidden;
  background-color: #fff;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.05);
  z-index: 2;
  transform: translateY(150%);
  transition: transform, height 0.3s ease;
  ${({ active, height }: { active: boolean; height: number }) => {
    if (active) {
      return `
        height: ${height}px;
        transform: translateY(0%);
      `
    }
  }}
`
