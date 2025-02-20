import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { vj6, vj7, sb6, vk4 } from 'data/football'
import { mlb, sp21 } from 'data/baseball'
import { objectPath, generateThumbnail } from 'helpers'
import { useGetOrder, useUpdateOrder } from 'api'
import { GET_PLAYER_ORDERS, GET_TEAM_ORDERS } from 'api/queries/player-orders'
import { Button, Icon, Toast } from 'components'
import {
  Container,
  OverlayContainer,
  OverlayMessageContainer,
  OverlayIconContainer,
  OverlayTitle,
  OverlayMessage,
  OverlayActions,
  OverlayButtonContainer,
} from './designer-components'
import DesignerView from './designer-view'
import SuccessMessage from './success-message'

const productTypes: any = {
  VJ6: vj6,
  VJ7: vj7,
  SB6: sb6,
  VK4: vk4,

  MLB: mlb,
  SP21: sp21,
}

export default function Designer() {
  const { orderId }: any = useParams()
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 991 })
  const { loading, data, error } = useGetOrder({ orderId: orderId })
  const order = objectPath(data, ['order'], {})
  const sportId = objectPath(data, ['order', 'sportId'], 'football')
  const playerId = objectPath(data, ['order', 'player', '_id'], '')
  const playerCode = objectPath(data, ['order', 'player', 'playerCode'], '')
  const teamId = objectPath(data, ['order', 'teamId'], '')
  const productId = objectPath(data, ['order', 'product', '_id'], '')
  const productType = objectPath(data, ['order', 'product', 'name'], 'VJ6')
  const productItems = objectPath(data, ['order', 'productItems'], [])
  const customMessage = objectPath(data, ['order', 'customMessage'], {})
  const diecastItem = objectPath(data, ['order', 'dieCast'], {})
  const notes = objectPath(data, ['order', 'notes'], '')
  const [orderTitle, setOrderTitle] = useState('')
  const [colorList, setColorList] = useState<any[]>([])
  const [logoList, setLogoList] = useState<any[]>([])
  const [artworkList, setArtworkList] = useState<any[]>([])
  const [overlayMessage, setOverlayMessage] = useState<any>({
    type: '',
    status: '',
    title: '',
    message: '',
  })
  const [toastMessage, setToastMessage] = useState<any>({
    type: '',
    message: '',
    title: '',
  })
  const [updateOrder] = useUpdateOrder({
    playerCode: playerCode,
  })
  const [showToast, setShowToast] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    if (!loading && order) {
      updateOrderTitle()
      updateColorsAndLogos()
    }
    // eslint-disable-next-line
  }, [loading, order])

  if (loading) {
    return <Icon name="nikeLoading" />
  }
  if (error) {
    return <div>Error</div>
  }

  function updateOrderTitle() {
    let title = [order.orderCode]

    if (order.orderColorNumber) {
      title.push(order.orderColorNumber)
    }

    setOrderTitle(title.join(' '))
  }

  function updateColorsAndLogos() {
    const {
      playerLogo = [],
      teamColor = [],
      teamLogo = [],
      playerArtWork = [],
    } = order

    setColorList(teamColor.filter((color: any) => !!color.status))
    setLogoList([
      ...teamLogo.filter((logo: any) => !!(logo.status && logo.logo)),
      ...playerLogo.filter((logo: any) => !!(logo.status && logo.logo)),
    ])
    setArtworkList(playerArtWork.filter((item: any) => !!item.status))
  }

  function checkNflRules(items: any) {
    const BOHMaterial = items.find((item: any) => {
      if (productType === 'SB6') {
        return item.itemId === 104
      } else if (productType === 'VK4') {
        return item.itemId === 107
      }
      return item.itemId === 101
    })
    const Swoosh = items.find((item: any) => item.itemType === 'swoosh')
    const BOHMaterialColor =
      BOHMaterial.options.find((color: any) => !!color.selected) ||
      BOHMaterial.optionalColors.find((color: any) => !!color.selected)
    const SwooshColor = Swoosh
      ? Swoosh.primaryColors.find((color: any) => !!color.selected)
      : null
    if (
      BOHMaterialColor &&
      SwooshColor &&
      BOHMaterialColor.code &&
      SwooshColor.code &&
      BOHMaterialColor.code === SwooshColor.code
    ) {
      setShowToast(true)
      setToastMessage({
        type: 'warn',
        title: 'Color not Available',
        message: `Due to NFL rules, the Swoosh/Jumpman and BOH must contrast each other. Please change the Suggested Options and retry saving`,
      })
      return false
    } else {
      setShowToast(false)
      setToastMessage({})
      return true
    }
  }

  function save(items: any[], customMsg: any, notes: string) {
    if (!checkNflRules(items)) {
      return
    }

    setOverlayMessage({
      type: 'save',
      status: 'inprogress',
      title: 'Saving design Changes.',
      message: 'Please wait...',
    })
    const firstView: any = productTypes[productType].config.views[0]
    const canvasId: string = firstView.name.toLowerCase().replace(/\s/g, '-')

    generateThumbnail(order._id, canvasId).then((res: any) => {
      const updatedItems = items.map((item: any) => {
        let itemCopy = { ...item }
        delete itemCopy.__typename
        return itemCopy
      })

      updateOrder({
        variables: {
          _id: order._id,
          playerId: playerId,
          teamId: teamId,
          productId: productId,
          trackStatus:
            order.trackStatus && order.trackStatus === 'Submitted'
              ? 'Submitted'
              : 'In-progress',
          thumbnailLogo: res.Location,
          productItems: updatedItems,
          customMessage: customMsg,
          notes: notes,
        },
        refetchQueries: playerId
          ? [{ query: GET_PLAYER_ORDERS, variables: { playerCode } }]
          : [{ query: GET_TEAM_ORDERS, variables: { teamId } }],
      }).then(() => {
        setOverlayMessage({
          type: 'save',
          status: 'success',
          title: 'Design changes have been saved successfully.',
          message:
            'Click “Submit Order” to complete your design and send back to Nike.',
        })

        if (!isMobile) {
          setTimeout(() => setOverlayMessage({ type: '' }), 4000)
        }
      })

      order.trackStatus =
        order.trackStatus && order.trackStatus === 'Submitted'
          ? 'Submitted'
          : 'In-progress'
      order.customMessage = customMsg
    })
  }

  function submitOrder(items: any[], customMsg: any, notes: string) {
    if (!checkNflRules(items)) {
      return
    }

    setOverlayMessage({
      type: 'submit',
      status: 'inprogress',
      title: 'Submitting design.',
      message: 'Please wait...',
    })

    const firstView: any = productTypes[productType].config.views[0]
    const canvasId: string = firstView.name.toLowerCase().replace(/\s/g, '-')

    generateThumbnail(order._id, canvasId).then((res: any) => {
      const updatedItems = items.map((item: any) => {
        let itemCopy = { ...item }
        delete itemCopy.__typename
        return itemCopy
      })

      updateOrder({
        variables: {
          _id: order._id,
          playerId: playerId,
          teamId: teamId,
          productId: productId,
          trackStatus: 'Submitted',
          orderStatus:
            sportId === 'football-ncaa' ? 'Team Approved' : 'Player Approved',
          thumbnailLogo: res.Location,
          productItems: updatedItems,
          customMessage: customMsg,
          notes: notes,
        },
        refetchQueries: playerId
          ? [{ query: GET_PLAYER_ORDERS, variables: { playerCode } }]
          : [{ query: GET_TEAM_ORDERS, variables: { teamId } }],
      }).then(() => {
        setOverlayMessage({
          type: '',
        })
        setShowSuccessMessage(true)
      })
      order.trackStatus = 'Submitted'
      order.customMessage = customMsg
    })
  }

  return (
    <>
      <Toast
        message={toastMessage.message}
        showToast={showToast}
        type={toastMessage.type}
        title={toastMessage.title}
        onClose={() => setShowToast(false)}
      />

      <Container blur={showSuccessMessage}>
        {productItems && productItems.length && (
          <DesignerView
            isAdmin={false}
            title={orderTitle}
            trackStatus={order.trackStatus}
            sportId={sportId}
            productType={productType}
            productItems={productItems}
            colorList={colorList}
            logoList={logoList}
            artworkList={artworkList}
            customMessage={customMessage}
            isPdfAvailable={false}
            diecastItem={diecastItem}
            note={notes}
            onSave={save}
            onSubmit={submitOrder}
            onReturnClick={() => navigate(`/orders`)}
            createDesign={() => {}}
          />
        )}
      </Container>

      {!!overlayMessage.type && (
        <OverlayContainer>
          <OverlayMessageContainer>
            <OverlayIconContainer>
              <Icon name="nikeLoading" />
            </OverlayIconContainer>
            {overlayMessage.title && (
              <OverlayTitle>{overlayMessage.title}</OverlayTitle>
            )}
            {overlayMessage.message && (
              <OverlayMessage>{overlayMessage.message}</OverlayMessage>
            )}
            {isMobile &&
              overlayMessage.type === 'save' &&
              overlayMessage.status === 'success' && (
                <OverlayActions>
                  <OverlayButtonContainer>
                    <Button
                      variant="secondary"
                      rounded={true}
                      onClick={() =>
                        submitOrder(productItems, customMessage, notes)
                      }>
                      Submit Order
                    </Button>
                  </OverlayButtonContainer>
                  <OverlayButtonContainer>
                    <Button
                      variant="outline"
                      rounded={true}
                      width="100%"
                      onClick={() =>
                        setOverlayMessage({
                          type: '',
                        })
                      }>
                      Close
                    </Button>
                  </OverlayButtonContainer>
                </OverlayActions>
              )}
          </OverlayMessageContainer>
        </OverlayContainer>
      )}

      {showSuccessMessage && <SuccessMessage orderId={orderId} />}
    </>
  )
}
