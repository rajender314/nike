import styled from 'styled-components'
import { boldFont, antennaBoldFont } from 'styles'

export const OrdersHeader = styled.div`
  ${antennaBoldFont}
  display: flex;
  justify-content: center;
  font-size: 32px;
  letter-spacing: 0.7px;
  padding: 30px 0px;
  color: #43425c;
`
export const OrdersContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 860px;
  margin: 0 auto;
  padding: 10px;
`

export const CardsList = styled.div`
  display: flex;
  margin: -20px;
  flex-wrap: wrap;
`

export const PlayerCard = styled.div`
  display: flex;
  justify-content: space-between;
  background: #75757a;
  margin: 0px -20px;
  padding: 10px 20px;
  align-items: center;
`

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`

export const Card = styled.div`
  width: 200px;
  height: 240px;
  margin: 10px;
  border: 0.5px solid #dfe1e6;
  &.player-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #404040;
    background-color: #475663;
    padding: 18px 16px;
    .player-name {
      color: rgba(255, 255, 255, 1);
      font-size: 1.6rem;
    }
    .player-team {
      margin-top: 6px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.1rem;
    }
    .player-number {
      flex: 1;
      margin-top: 8px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.1rem;
    }
    .order-date {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.1rem;
    }
  }
  &.product-card {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    .product-info {
      .product-name {
        font-size: 16px;
        color: #323447;
      }
      .modified-date {
        font-size: 0.7rem;
        color: #91929e;
        margin-top: 5px;
      }
    }
    &:hover {
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1),
        0 1px 3px 0 rgba(0, 0, 0, 0.08);
      border: 1px solid #bfc8d7;
      cursor: pointer;
      .overlay {
        opacity: 0.1;
      }
      .product-image {
        height: 240px;
      }
    }
  }
`

export const CardItem = styled.div``
export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background: rgb(123, 163, 224, 0.6);
  transition: opacity 0.3s ease;
`

export const ProductLogo = styled.div`
  height: 185px;
  background-color: #f5f5f5;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  transition: height 0.3s ease;
  ${({ order }: { order: any }) => {
    return `background-image:url(${
      order.thumbnailLogo ? order.thumbnailLogo : order.productProfileLogo
    });
    `
  }}
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55px;
`

export const ProductStatus = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  height: 22px;
  padding: 4px 8px;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1.2;
  &.new {
    background-color: rgba(240, 79, 100, 0.8);
  }
  &.in-progress {
    background-color: rgba(34, 105, 210, 0.8);
  }
  &.submitted {
    background-color: rgba(82, 178, 127, 0.8);
  }
`

export const PageHeader = styled.div`
  ${antennaBoldFont}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  cursor: default;
  svg {
    width: 64px;
    height: 24px;
  }
  #Artboard {
    fill: #000000;
  }
`
export const IconContainer = styled.span`
  display: block;
`
export const Label = styled.label`
  display: inline-block;
  margin-left: 6px;
  cursor: inherit;
  color: #43425c;
  font-size: 2rem;
  ${antennaBoldFont}
  letter-spacing: 1px;
  text-transform: uppercase;
`
export const PreviewImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`
export const ProductImage = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border: 1px solid #e8eaed;
  border-radius: 6px;
  flex: 0 0 64px;
  background-color: #e8eaed;
`
export const NoConfig = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #97a5ae;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // height: 100vh;
  overflow: hidden;
  user-select: none;
  flex: 1;
  &.mobile {
    padding: 0px 20px;
    ${PageHeader} {
      padding: 28px 0px;
      justify-content: flex-start;
    }
    ${OrdersHeader} {
      justify-content: flex-start;
      font-size: 26px;
    }
    ${OrdersContainer} {
      width: auto;
      ${Card} {
        width: 100%;
        // min-width: 330px;
        height: 370px;
      }
    }
    ${ProductLogo} {
      height: 300px;
    }
    ${ProductStatus} {
      height: 30px;
      padding: 5px 16px;
      font-size: 18px;
    }
    ${ProductInfo} {
      height: 68px;
      align-items: flex-start;
      padding: 0px 20px;
      .product-name {
        font-size: 18px;
      }
      .modified-date {
        font-size: 1rem;
      }
    }
    ${ProductStatus} {
      left: 20px;
      top: 20px;
    }
    .player-team {
      ${boldFont}
      font-size: 18px;
    }
  }
`

export const UserIcon = styled.div`
  padding: 16px 8px;
  text-align: center;
`
