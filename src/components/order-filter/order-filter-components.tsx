import styled from 'styled-components'
type props = {
  active?: boolean
}

export const FilterToolTipBody = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e3e8ef;
  border-radius: 3px;
  box-shadow: 0px 5px 20px rgba(23, 45, 65, 0.279584);
  height: 350px;
  overflow: hidden;
`
export const FilterTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0px 20px;
  border: 1px solid #f2f2f2;
`

export const FilterText = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #404040;
`
export const FilterKeyText = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #404040;
  cursor: pointer;
`
export const SelectedFilters = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #404040;
  margin-left: 10px;
`
export const FilterIconText = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #404040;
  cursor: pointer;
`
export const ClearText = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #006ac6;
  cursor: pointer;
  padding: 10px;
  margin-right: 10px;
`

export const FilterFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-top: 1px solid #f2f2f2;
  padding: 10px 40px;
  bottom: 0;
  right: 0;
  width: 100%;
`

export const FilterBody = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 98px);
  flex-direction: row;
  background: #fff;
  overflow: hidden;
`

export const FilterLeftContainer = styled.div`
  width: 200px;
  height: 100%;
  background: #fff;
  overflow: hidden;
  border-right: 1px solid #f2f2f2;
`
export const FilterRightContainer = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  background: #fff;
  overflow-x: hidden;
  overfow-y: auto;
`
export const ContentBox = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background: #fff;
  overflow: hidden;
  &:hover {
    background: #f2f2f2;
  }
  cursor: pointer;
  ${({ active }: props) => {
    if (active) {
      return `background: #F2F2F2;
             `
    }
  }}
`

export const FilterValueContainer = styled.div`
  padding: 12px 0px 0px 20px;
`

export const ButtonContainer = styled.div`
  width: 100px;
`
export const FilterContainer = styled.div`
  display: flex;
`
export const FilterToolTipContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 420px;
  margin-top: 20px;
`
export const FilterToolTipArrow = styled.div`
  position: absolute;
  left: 50% !important;
  right: 44.44%;
  top: -3.38%;
  bottom: 94.33%;
  background: #fff;
  box-sizing: border-box;
  border-radius: 3px 0px 0px 0px;
  transform: rotate(45deg);
`
