import styled from 'styled-components'
import { screenSize } from 'styles'

type Props = {
  disabled?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e3e3e3;
  font-size: 1.1rem;
  font-weight: 500;
  > svg {
    font-size: 1.4rem;
    @media (${screenSize.tablet}) {
      display: none;
    }
  }
`

export const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid #e3e3e3;
  button:last-child {
    margin-top: 16px;
  }
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

export const List = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`

export const ListItem = styled.div`
  ${({ disabled }: Props) => {
    if (disabled) {
      return `
            background-color:#ccc;
            pointer-events:none;
      `
    }
  }}
`

export const ListItemHeader = styled.div`
  background-color: #699fd7;
  color: #fff;
  padding: 16px 12px 16px 20px;
  border-bottom: 1px solid #f0f0f0;
`

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  min-height: 58px;
  padding: 12px 12px 12px 20px;
  border-bottom: 1px solid #f0f0f0;
  color: #43425d;
  cursor: pointer;
`

export const ItemName = styled.div`
  flex: 1;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ItemColor = styled.div`
  width: 32px;
  height: 32px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`

export const ItemOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  label {
    font-size: 0.78rem;
  }
  &.logo {
    margin-left: -8px;
    margin-top: -8px;
    > div {
      width: 64px;
    }
  }
  &.logo-placement {
    > div {
      width: 50%;
    }
  }
`

export const ItemSection = styled.div`
  margin-top: 24px;
  ${ItemOptions} {
    margin-top: 12px;
  }
`

export const ItemAction = styled.div`
  padding: 16px 12px 16px 20px;
  border-bottom: 1px solid #ededed;
  ${ItemSection}:first-child {
    margin-top: 0;
  }
`

export const ItemMsg = styled.div`
  font-weight: 500;
`

export const ItemOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-bottom: 16px;
`

export const ItemSectionHeader = styled.div`
  color: #7a8894;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  cursor: pointer;
`

export const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export const NotesContainer = styled.div`
  margin: 20px;
  label {
    font-size: 16px;
  }
  ${({ disabled }: Props) => {
    if (disabled) {
      return `
      textarea{
            background-color:transparent;
            border:transparent;
            overflow:auto;
            &:hover {
              background-color: transparent;
                  }
           }
      `
    }
  }}
`

export const MobileContainer = styled.div``

export const HorizontalListContainer = styled.div`
  padding: 8px 0;
`
