import React from 'react'
import moment from 'moment'
import { Link as NavLink } from 'react-router-dom'
import { useGetPlayerOrders } from 'api'
import { Icon } from 'components'
import {
  Container,
  OrdersHeader,
  OrdersContainer,
  CardsList,
  Card,
  PageHeader,
  IconContainer,
  ProductLogo,
  ProductInfo,
  Label,
  CardItem,
  Overlay,
  NoConfig,
  ProductStatus,
  PlayerCard,
  PlayerInfo,
} from './player-orders-components'
import { useMediaQuery } from 'react-responsive'

export default function PlayerOrders() {
  const isMobile = useMediaQuery({ maxWidth: 991 })
  const playerData = sessionStorage.getItem('playerData')
  const player: any = playerData ? JSON.parse(playerData) : null
  const { loading, data } = useGetPlayerOrders({
    playerCode: player.playerCode,
  })

  if (loading) {
    return <Icon name="nikeLoading" />
  }

  function getPosition(player: any) {
    const { position = '', number = '' } = player
    let text: string[] = []

    if (position) {
      text.push(position)
    }
    if (number) {
      text.push('#' + number)
    }

    return text.join(', ')
  }

  function getOrderCode(order: any) {
    const { orderCode, orderColorNumber } = order
    const name: string[] = []

    name.push(orderCode)
    if (orderColorNumber) {
      name.push(orderColorNumber)
    }

    return name.join(' ')
  }

  return (
    <Container className={isMobile ? 'mobile' : ''}>
      <PageHeader className={isMobile ? 'mobile' : ''}>
        <IconContainer>
          <Icon name="nike" />
        </IconContainer>
        <Label className={isMobile ? 'mobile' : ''}>Equipment Builder</Label>
      </PageHeader>
      {isMobile &&
        data.playerOrders.map((player: any) => {
          return (
            <PlayerCard className="player-card" key={player.playerCode}>
              <PlayerInfo>
                <CardItem className="player-name">{player.name}</CardItem>
                <CardItem className="player-team">{player.teamName}</CardItem>
                <CardItem className="player-name">
                  {getPosition(player)}
                </CardItem>
              </PlayerInfo>
              {/* <IconContainer>
                <Icon name="avatar" />
              </IconContainer> */}
            </PlayerCard>
          )
        })}
      <OrdersHeader>Pick a style to review & customize</OrdersHeader>
      {data.playerOrders.length === 0 && <NoConfig>No Designs Found.</NoConfig>}
      <OrdersContainer>
        <CardsList>
          {!isMobile &&
            data.playerOrders.map((player: any) => {
              return (
                <Card className="player-card" key={player.playerCode}>
                  <CardItem className="player-name">{player.name}</CardItem>
                  <CardItem className="player-team">{player.teamName}</CardItem>
                  <CardItem className="player-number ">
                    {getPosition(player)}
                  </CardItem>
                  <CardItem className="order-date">
                    {player.orders.length +
                      (player.orders.length === 1 ? ' Design' : ' Designs')}
                  </CardItem>
                </Card>
              )
            })}

          {data.playerOrders.length > 0 &&
            data.playerOrders[0].orders.map((order: any) => {
              return (
                <Card className="product-card" key={order.orderId}>
                  {order && order.trackStatus && (
                    <ProductStatus className={order.trackStatus.toLowerCase()}>
                      {order.trackStatus}
                    </ProductStatus>
                  )}

                  <ProductLogo
                    className="product-image"
                    order={order}></ProductLogo>
                  <ProductInfo className="product-info">
                    <CardItem className="product-name">
                      {getOrderCode(order)}
                    </CardItem>
                    <CardItem className="modified-date">
                      {order.updatedAt &&
                        'Last modified: ' +
                          moment(order.updatedAt).format('ll')}
                    </CardItem>
                    <NavLink to={`/designer/${order.orderId}`}>
                      <Overlay className="overlay"></Overlay>
                    </NavLink>
                  </ProductInfo>
                </Card>
              )
            })}
        </CardsList>
      </OrdersContainer>
    </Container>
  )
}
