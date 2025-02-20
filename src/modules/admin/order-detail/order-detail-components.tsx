import styled, { keyframes } from 'styled-components'
import { antennaBoldFont, boldFont, primaryColor, semibold } from 'styles'
type ImageProps = {
  image?: string
}
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

export const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100vw - 72px);
  float: right;
`

export const OrderContainer = styled.div`
  margin: 0 80px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 2px solid #d7dde7;
`

export const HeaderInfo = styled.div``

export const HeaderActions = styled.div`
  display: flex;
  button {
    margin-left: 20px;
  }
`

export const Title = styled.div`
  ${antennaBoldFont}
  font-size: 2rem;
`

export const SubTitle = styled.div`
  ${antennaBoldFont}
  font-size: 1.2rem;
  text-transform: uppercase;
`

export const BreadCrumb = styled.div`
  display: flex;
  margin-bottom: 8px;
  color: #939dab;
  ${boldFont}
`

export const BreadCrumbItem = styled.div`
  cursor: default;
  &.link {
    cursor: pointer;
  }
`

export const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin: 20px -16px;
`

export const FormField = styled.div`
  width: 33.3333%;
  padding: 8px 16px;
  &.large {
    width: 66.6666%;
  }
`

export const Error = styled.div`
  position: absolute;
  margin-top: -12px;
  color: #da0909;
`

export const PreviewHistoryContainer = styled.div`
  display: flex;
  margin: 0 -16px;
`

export const PreviewContainer = styled.div`
  position: sticky;
  top: 0;
  align-self: flex-start;
  width: 66.6666%;
  padding: 16px;
`

export const PreviewSection = styled.div`
  position: relative;
  margin: 16px 0;
  border: 1px solid #e3e5e9;
  border-radius: 4px;
`

export const HistoryContainer = styled.div`
  width: 33.3333%;
  ${SubTitle} {
    position: sticky;
    top: 0;
    padding: 16px;
    background: #fff;
  }
`

export const LogItemList = styled.div`
  padding: 16px;
`

export const LogItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 8px;
  margin-bottom: 20px;
`

export const LogUserIcon = styled.div`
  grid-row: 1/4;
  width: 40px;
  height: 40px;
  margin: 0 8px 8px 0;
  border: 1px solid #e8eaed;
  border-radius: 50%;
`
export const UserImg = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ image }: ImageProps) => {
    if (image) {
      return `background-image:url(${image});`
    }
  }}
`

export const LogUserName = styled.div`
  margin-bottom: 4px;
  ${semibold}
`

export const LogInfo = styled.div`
  color: #6c7b88;
  font-size: 0.9rem;
`

export const LogHighlight = styled.span`
  ${semibold}
`
export const LogUpdateAt = styled.span`
  color: #6c7b88;
  font-size: 0.9rem;
`

export const DesignerContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #fff;
  z-index: 1;
  ${({ active }: { active: boolean }) => {
    if (active) {
      return `
        transform: translateX(0);
      `
    } else {
      return `
        transform: translateX(100%);
      `
    }
  }}
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
  z-index: 1;
`

export const OverlayMessageContainer = styled.div`
  text-align: center;
`

export const OverlayMessage = styled.div`
  margin-top: 80px;
  font-size: 21px;
  font-weight: 400;
  color: #4c4f5b;
`

export const OverlayIconContainer = styled.div``

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 16px;
  }
`

export const DuplicateOrder = styled.p`
  margin-left: 5px;
  font-size: 16px;
  ${boldFont};
  color: ${primaryColor};
  cursor: pointer;
`
export const DuplicateBodyConatiner = styled.p`
  display: flex;
`
export const DuplicateMessage = styled.p`
  font-size: 16px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`
export const ExportItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  svg {
    margin-right: 5px;
  }
  &:hover {
    color: ${primaryColor};
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
