import styled from 'styled-components'
import {
  semibold,
  primaryColor,
  primaryHoverColor,
  primaryActiveColor,
} from 'styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 0px;
`

export const Header = styled.div`
  padding: 28px 30px 16px 30px;
  background-color: #fff;
  > div {
    margin-bottom: 0;
  }
`

export const LogoSection = styled.div`
  min-height: 200px;
  padding: 12px 30px;
`
export const ShowEqContainer = styled.div`
  display: flex;
`
export const TeamUrl = styled.p`
  margin-top: 4px;
  margin-left: -8px;
  a {
    color: #0059b8;
    cursor: pointer;
    border-radius: 4px;
    padding: 6px 10px;
    padding-right: 15px;
    font-weight: 500;
    text-decoration: none;
    &:hover {
      color: #0068d7;
      background: #e8eaed;
    }
    &:active {
      color: #064f9d;
    }
  }
`

export const TeamInfo = styled.div`
  margin-top: 0px;
  padding: 0 30px;
`

export const LabelText = styled.div`
  font-size: 0.8rem;
  margin-top: 4px;
  color: #6c7b88;
  font-weight: 500;
`

export const InlineEditForm = styled.div`
  display: flex;
  margin-bottom: 0px;
  flex-direction: row;
`

export const InputBox = styled.div`
  width: 54%;
`

export const IconContainer = styled.div`
  width: 32px;
  height: 32px;
  background: #d5dce2;
  margin-right: 6px;
  margin-left: 6px;
  border-radius: 4px;
  svg {
    width: 32px;
    height: 32px;
    padding: 4px;
    g {
      g {
        fill: ${primaryColor};
      }
    }
  }
`

export const ColorSection = styled.div`
  min-height: 200px;
  padding: 12px 30px;
`
export const ContentSection = styled.div`
  overflow-y: auto;
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  ${semibold}
  padding: 0 0px;
`

export const Title = styled.div`
  font-size: 1.2rem;
`

export const LogoInfo = styled.div`
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: #777777;
`

export const Link = styled.a`
  margin-left: 4px;
  color: ${primaryColor};
  cursor: pointer;
  border-radius: 4px;
  padding: 6px 10px;
  padding-right: 14px;
  margin-top: 4px;
  &:hover {
    color: ${primaryHoverColor};
    cursor: pointer;
    background: #e8eaed;
  }
  &:active {
    color: ${primaryActiveColor};
  }
`

export const LogosList = styled.div`
  display: flex;
  margin: 0 -8px;
  flex-wrap: wrap;
`

export const LogoListItem = styled.div`
  width: 50%;
  padding: 8px;
`

export const LogoCardBorder = styled.div`
  /* margin-top: 10px;
  border-bottom: 2px solid #d8dcdd; */
`

export const ColorsList = styled.div`
  display: flex;
  margin: 0 -8px;
  flex-wrap: wrap;
`

export const ColorListItem = styled.div`
  width: 50%;
  min-width: 220px;
  padding: 8px;
`
export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 16px;
  }
`

export const ArtworkSection = styled.div`
  min-height: 200px;
  padding: 12px 30px;
`

export const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  margin-bottom: 30px;
`
