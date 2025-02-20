import React from 'react'
import moment from 'moment'
import { Link as NavLink } from 'react-router-dom'
import { useGetTeamOrders } from 'api'
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
} from './team-orders-components'
import { useMediaQuery } from 'react-responsive'

export default function TeamOrders() {
  const isMobile = useMediaQuery({ maxWidth: 991 })
  const playerData = sessionStorage.getItem('playerData')
  const player: any = playerData ? JSON.parse(playerData) : null
  const { loading, data } = useGetTeamOrders({
    teamId: player._id,
  })

  if (loading) {
    return <Icon name="nikeLoading" />
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
        data.teamOrders.map((team: any) => {
          return (
            <PlayerCard className="player-card" key={team.name}>
              <PlayerInfo>
                <CardItem className="player-name">{team.name}</CardItem>
              </PlayerInfo>
            </PlayerCard>
          )
        })}
      <OrdersHeader>Pick a style to review & customize</OrdersHeader>
      {data.teamOrders.length === 0 && <NoConfig>No Designs Found.</NoConfig>}
      <OrdersContainer>
        <CardsList>
          {!isMobile &&
            data.teamOrders.map((team: any) => {
              return (
                <Card className="player-card" key={team.name}>
                  <CardItem className="player-name">{team.name}</CardItem>
                  <CardItem className="player-number"> </CardItem>
                  <CardItem className="order-date">
                    {team.orders.length +
                      (team.orders.length === 1 ? ' Design' : ' Designs')}
                  </CardItem>
                </Card>
              )
            })}

          {data.teamOrders.length > 0 &&
            data.teamOrders[0].orders.map((order: any) => {
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
