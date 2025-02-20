import styled from 'styled-components'
import { antennaBoldFont } from 'styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 80px;
  height: 100vh;
  padding-bottom: 20px;
  overflow: hidden;
`
export const FilterHeader = styled.div`
  width: 100%;
  margin-top: 30px;
`
export const FilterBox = styled.div`
  margin-right: 30px;
  cursor: pointer;
`
export const OrderStatus = styled.span`
  padding: 3px 8px;
  font-size: 12px;
  padding-bottom: 2px;
  color: #fff;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;
  background: #ccc;
  text-transform: uppercase;
  ${({ status }: { status: any }) => {
    if (status) {
      return `
      color: rgb(94 96 99);
      background: ${status.backgroundColor};
    `
    }
  }}
`
export const PlayerCell = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  line-height: 1.4;
`
export const ProductAvatar = styled.div`
  height: 40px;
  width: 40px;
  padding: 4px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(225, 225, 225, 0.5);
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  display: flex;
  text-transform: uppercase;
  border-radius: 6px;
`
export const ImageContainer = styled.img`
  max-height: 100%;
  max-width: 100%;
  border-radius: 6px;
`
export const ProductContainer = styled.div`
  flex-direction: column;
  display: flex;
  margin: 0px;
  flex-wrap: wrap;
  justify-content: space-around;
`
export const ProductName = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #172b4d;
  letter-spacing: 0.03em;
`
export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border: 1px solid rgba(225, 225, 225, 0.5);
  border-radius: 50%;
  overflow: hidden;
  font-size: 1.2rem;
`
export const PlayerContainer = styled.div``
export const PlayerName = styled.div`
  font-weight: 500;
  color: #172b4d;
`

export const PlayerDescription = styled.div`
  color: #6b778c;
  font-size: 0.8rem;
  font-weight: 400;
`

export const StatsHeader = styled.div`
  width: 100%;
  flex-direction: row;
  display: flex;
  margin-top: 30px;
  flex-wrap: wrap;
  justify-content: space-between;
`
export const StatsBox = styled.div`
  cursor: pointer;
  position: relative;
  justify-content: space-evenly;
  display: flex;
  padding: 16px;
  min-width: 230px;
  margin: 8px 0;
  align-items: flex-start;
  flex-direction: column;
  min-height: 84px;
  border: 1px solid rgba(53, 53, 53, 0.05);
  border-radius: 4px;
  /* box-shadow: 1px 3px 3px -3px rgba(0, 0, 0, 0.5); */
  ${({ color = '#e1e1e1' }: { color: any }) => {
    if (color) {
      return `
      background-color: ${color.backgroundColor};
    `
    }
  }}
`

export const OrderStatsText = styled.div`
  text-align: left;
  text-transform: uppercase;
  color: #4d4e4f;
  font-size: 12px;
  font-weight: 500;
`
export const OrdersCount = styled.div`
  text-align: left;
  padding: 8px 0;
  font-size: 21px;
  color: #565656;
`
export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const Header = styled.div`
  display: flex;
  justify-content: center;
`
export const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Title = styled.div`
  ${antennaBoldFont}
  font-size: 2rem;
  text-transform: uppercase;
`
export const AgContainer = styled.div`
  height: calc(100% - 257px);
  width: 100%;
  margin-top: 30px;
  position: relative;
`
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
export const NoDataText = styled.span`
  border: 1px solid #ccd1d8;
  padding: 8px;
  border-radius: 4px;
  background: #fafbfc;
`

export const StatusPop = styled.span`
  position: absolute;
  right: 15px;
  top: 15px;
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
    left: -10px;
    top: 8px;
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  &::after {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    position: absolute;
    width: 0;
    border-color: transparent transparent #fffdfd transparent;
    border-width: 0 0.5rem 0.4rem 0.5rem;
    transform: rotate(270deg);
    left: -8px;
    top: 8px;
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
  height: 400px;
  overflow: auto;
  .label {
    margin-bottom: 12px;
  }
`

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0px;
`

export const StatusLabel = styled.div`
  cursor: pointer;
  display: flex;
`

export const StatusCount = styled.div`
  display: flex;
  color: #253858;
  ${antennaBoldFont}
`
