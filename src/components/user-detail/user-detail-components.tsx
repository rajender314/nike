import styled from 'styled-components'
import {
  mediumFont,
  primaryColor,
  primaryHoverColor,
  primaryActiveColor,
} from 'styles'

export const Container = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-height: 100%;
  padding: 0px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 0px;
  -webkit-flex: 0px;
  -ms-flex: 0px;
  flex: 0px;
`
export const DetailHeader = styled.div`
  display: flex;
  /* margin-bottom: 20px; */
  padding: 28px 30px 16px 30px;
`
export const profilePic = styled.div`
  width: 54px;
  height: 54px;
  background: red;
`
export const ShowEquContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const PlayerInfo = styled.div`
  margin-top: 0px;
  padding: 0 30px;
`
export const PlayerUrl = styled.p`
  margin-top: -6px;
  margin-left: -8px;
  a {
    color: #0059b8;
    cursor: pointer;
    border-radius: 4px;
    padding: 6px 10px;
    padding-right: 15px;
    font-weight: 500;
    &:hover {
      color: #0068d7;
      background: #e8eaed;
    }
    &:active {
      color: #064f9d;
    }
  }
`
export const InlineEditForm = styled.div`
  display: flex;
  margin-bottom: 0px;
  flex-direction: row;
`
export const InputBox = styled.div`
  max-width: 500px;
`
export const LabelText = styled.div`
  font-size: 0.8rem;
  margin-top: 4px;
  color: #6c7b88;
  font-weight: 500;
`
export const FormFieldSM = styled.div`
  width: 150px;
  margin: 0 15px 0 0;
`
export const FormFieldM = styled.div`
  width: 200px;
  margin: 0 15px 0 0;
`

export const LogoSection = styled.div`
  min-height: 120px;
  padding: 4px 30px 0 30px;
`

export const ImageContainer = styled.div`
  position: relative;
  border-radius: 6px;
`
export const PreviewImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  ${mediumFont}
`

export const Title = styled.div`
  font-size: 1.2rem;
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
  margin-top: 10px;
  border-bottom: 2px solid #d8dcdd;
`

export const ColorsList = styled.div`
  display: flex;
  margin: 0 -8px;
  flex-wrap: wrap;
`

export const ColorListItem = styled.div`
  width: 25%;
  padding: 8px;
`
export const ContentSection = styled.div`
  overflow-y: auto;
`
export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 16px;
  }
`

export const LogoInfo = styled.div`
  font-size: 0.85rem;
  margin-bottom: 10px;
  color: #777777;
`
export const ShowAllDesigns = styled.a`
  margin-left: 8px;
`
