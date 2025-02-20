import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  max-width: 640px;
`

export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 30px 16px 30px;
  background-color: #fff;
`

export const ProductCardInfo = styled.div`
  display: flex;
`

export const ProductName = styled.div`
  margin-left: 12px;
`

export const ProductType = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  max-width: 200px;
  margin: 0 15px 0 0;
`

export const ProductFranchise = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  max-width: 200px;
  margin-right: 15px;
`

export const ProductField = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  div {
    margin-bottom: 5px;
  }
  select {
    text-transform: none;
    display: flex;
    width: 100%;
    height: 40px;
    border: 2px solid #e0e0e0;
    border-radius: 5px;
  }
`

export const Label = styled.div`
  color: #6c7b88;
  font-weight: 500;
`

export const Field = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const ProductYear = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  max-width: 120px;
  margin-right: 15px;
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

export const select = styled.div`
  text-transform: none;
  display: flex;
  width: 100%;
  height: 40px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
`
export const ToolTipContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 300px;
`
export const ToolTipArrow = styled.div`
  display: flex;
  height: 1rem;
  left: 0;
  margin-top: -0.4rem;
  top: 1px;
  width: 1rem;
  position: absolute;
  &::before {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    width: 0;
    border-color: transparent transparent silver transparent;
    border-width: 0 0.5rem 0.4rem 0.5rem;
    position: absolute;
    top: -1px;
  }
  &::after {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    position: absolute;
    width: 0;
    border-color: transparent transparent white transparent;
    border-width: 0 0.5rem 0.4rem 0.5rem;
  }
`
export const ToolTipBody = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border: 1px solid #e3e8ef;
  border-radius: 4px;
  box-shadow: 0px 0px 1px;
  .label {
    margin-bottom: 12px;
  }
`

export const ContentSection = styled.div``
