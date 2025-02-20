import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faFileImage } from '@fortawesome/free-solid-svg-icons'
import {
  useGetProductItems,
  getOrdersDropdown,
  useGetProducts,
  useGetPlayers,
  useGetTeams,
  useCreateOrder,
  useGetOrder,
  useGetDeleteOrder,
  useDuplicateOrder,
  useGetOrderStatusList,
} from 'api'
import {
  objectPath,
  removeTypeName,
  remove_id,
  selectDataFormat,
  downloadPDF,
  getPng,
  generateThumbnail,
} from 'helpers'
import { UserContext } from 'providers'
import { vj6, vj7, sb6, vk4 } from 'data/football'
import { mlb, sp21 } from 'data/baseball'
import { Product as ProductType } from 'types'
import {
  Button,
  Select,
  Input,
  Icon,
  Toast,
  Dialog,
  AspectRatioContainer,
} from 'components'
import { DesignerView, DesignerCanvas } from 'modules/designer'
import OrderActivity from './order-activity'
import {
  Container,
  OrderContainer,
  Header,
  HeaderInfo,
  HeaderActions,
  Title,
  SubTitle,
  BreadCrumb,
  BreadCrumbItem,
  FormContainer,
  FormField,
  Error,
  PreviewHistoryContainer,
  PreviewContainer,
  PreviewSection,
  HistoryContainer,
  DesignerContainer,
  OverlayContainer,
  OverlayMessageContainer,
  OverlayMessage,
  OverlayIconContainer,
  DialogFooter,
  DuplicateOrder,
  DuplicateMessage,
  DuplicateBodyConatiner,
  ExportSpecContainer,
  ExportSpecTooltipContainer,
  ExportContainer,
  ExportItem,
  ButtonContainer,
} from './order-detail-components'

const productTypes: any = {
  VJ6: vj6,
  VJ7: vj7,
  SB6: sb6,
  VK4: vk4,

  MLB: mlb,
  SP21: sp21,
}

export default function OrderDetail() {
  const { orderId }: any = useParams()
  const navigate = useNavigate()
  const {
    user: { _id: userId, sportId },
  } = useContext(UserContext)
  const [formData, setFormData] = useState<any>({
    playerId: '',
    teamId: '',
    season: '',
    productType: '',
    productId: '',
    gloveSize: '',
    owner: '',
    styleName: '',
    fileName: '',
    orderStatus: '',
  })
  const [loading, setLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPdfVisible, setIsPdfVisible] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showDesigner, setShowDesigner] = useState(false)
  const [overlayMessage, setOverlayMessage] = useState('')
  const [toastMessage, setToastMessage] = useState<any>({})

  const {
    seasons: seasonSelectList,
    productTypes: productTypeSelectList,
    gloveSizes: gloveSizeSelectList,
    owners: ownerSelectList,
  } = getOrdersDropdown()
  const { loading: playerLoading, data: playerData } = useGetPlayers()
  const { loading: teamLoading, data: teamData } = useGetTeams()
  const { loading: productsLoading, data: productData } = useGetProducts({
    sportId: sportId,
  })
  const [fetchProductItems, { data: productItemsData }] = useGetProductItems()
  const { loading: orderLoading, data: orderData } = useGetOrder({
    orderId: orderId,
  })
  const { loading: statusLoading, data: statusData } = useGetOrderStatusList()
  const [createOrder] = useCreateOrder()
  const [deleteOrder] = useGetDeleteOrder()
  const [duplicateOrder] = useDuplicateOrder()

  const statusListData = objectPath(
    statusData,
    ['orderStatus', 'OrderStatusList'],
    [],
  )
  const statusList = selectDataFormat(statusListData, 'name', 'name')
  const playerList = objectPath(playerData, ['players', 'players'], [])
  const playerSelectList = selectDataFormat(playerList, '_id', 'name')
  const teamList = objectPath(teamData, ['teams', 'teams'], [])
  const teamDataList = selectDataFormat(teamList, '_id', 'name')
  const [teamSelectList, setTeamSelectList] = useState<any[]>([])
  const [colorList, setColorList] = useState<any[]>([])
  const [logoList, setLogoList] = useState<any[]>([])
  const [artworkList, setArtworkList] = useState<any[]>([])
  const [, setDefaultBrand] = useState('')
  const productList = objectPath(productData, ['products', 'products'], [])
  const productSelectList = selectDataFormat(productList, '_id', 'name')
  const [statusSelectList, setStatusSelectList] = useState<any[]>([])
  const [productItemsList, setProductItemsList] = useState<any[]>([])
  const [customMessage, setCustomMessage] = useState<any>({})
  const [notes, setNotes] = useState<string>('')
  const [isExportEnabled, setIsExportEnabled] = useState<boolean>(false)
  const [dieCastItems, setDieCastItems] = useState<any>({
    _id: 'dieCast',
    item: 'Die Cast',
    itemId: 'dieCast',
    itemType: 'dieCast',
    options: [],
    primaryColors: [],
    customPattern: [],
    logos: [],
    logoColors: [],
    patternColors: [],
  })
  const [showDuplicateOrder, setShowDuplicateOrder] = useState<boolean>(false)
  const [duplicateOrderId, setDuplicateOrderId] = useState<string>('')
  const [duplicateOrderMessage, setDuplicateOrderMessage] = useState<string>('')
  const [showDeleteOrder, setShowDeleteOrder] = useState<boolean>(false)
  const [deleteMessage, setDeleteMessage] = useState<string>('')
  const [showExportTooltip, setShowExportTooltip] = useState<boolean>(false)
  const order = objectPath(orderData, ['order'])

  useEffect(() => {
    if (
      !playerLoading &&
      !teamLoading &&
      !productsLoading &&
      !orderLoading &&
      !statusLoading
    ) {
      if (orderId) {
        if (objectPath(order, ['_id'])) {
          setIsEdit(true)
        } else {
          navigate('/admin/create-order')
        }
      }
      setLoading(false)
    }
  }, [
    playerLoading,
    teamLoading,
    productsLoading,
    orderLoading,
    statusLoading,
    navigate,
    order,
    orderId,
  ])

  useEffect(() => {
    if (sportId === 'football-ncaa') {
      setTeamSelectList(teamDataList)
    }
  }, [teamLoading])

  useEffect(() => {
    if (productItemsData) {
      setProductItemsList(
        objectPath(JSON.parse(JSON.stringify(productItemsData)), [
          'productsItems',
          'products',
        ]),
      )
      setTimeout(() => setShowPreview(true), 10)
    }
  }, [productItemsData])

  useEffect(() => {
    if (productItemsList && order) {
      if (isEdit) {
        setOrderFormData()
        setProductItemsList(objectPath(order, ['productItems']))
        setDefaultColors()
        setCustomMessage(objectPath(order, ['customMessage'], {}))
        if (order.dieCast) {
          setDieCastItems(order.dieCast)
        }
        if (order.notes) {
          setNotes(order.notes)
        }
        setTimeout(() => setShowPreview(true), 10)
      } else {
        setDefaultValues()
      }
    }
    // eslint-disable-next-line
  }, [isEdit, productItemsList, order])

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  })

  function changeSelection(selectionType: string, selectedOption: any) {
    formData[selectionType] = selectedOption

    if (selectionType === 'playerId') {
      const playerDataObj = getPlayerTeamColorLogo(selectedOption.value)
      formData['teamId'] = playerDataObj.team[0]
      formData['gloveSize'] = playerDataObj.size
      setTeamSelectList(playerDataObj.team)
      setColorList(playerDataObj.colors)
      setLogoList(playerDataObj.logos)
      setArtworkList(playerDataObj.artwork)
      setDefaultValues()
    } else if (selectionType === 'teamId') {
      const teamDataObj = getTeamColorLogo(selectedOption.value)
      setColorList(teamDataObj.colors)
      setLogoList(teamDataObj.logos)
      setArtworkList(teamDataObj.artwork)
      setDefaultValues()
    }

    setFormData({ ...formData })

    if (selectionType === 'orderStatus') {
      updateVisibleStatusList()
      if (
        ['Sent to Player', 'Sent to Team'].indexOf(selectedOption.value) > -1
      ) {
        updateThumbnail()
      } else {
        updateStatus({
          productId: formData.productId.value,
          orderStatus: selectedOption.value,
        })
      }
    }

    if (selectionType === 'productId') {
      getProductItems(selectedOption.label)
    }
  }

  function changeTextInput(selectionType: string, value: string) {
    formData[selectionType] = value
    setFormData({ ...formData })
  }

  function updateSeasonSelectList() {
    if (order.season) {
      const selectedSeason = seasonSelectList.find(
        (option: any) => option.value === order.season,
      )

      if (!selectedSeason) {
        seasonSelectList.unshift({
          label: 'FA ' + order.season,
          value: order.season,
        })
      }
    }
  }

  function updateVisibleStatusList() {
    if (
      [
        'Created',
        'Pending Internal Review',
        'Ready for Player',
        'Sent to Player',
        'Ready for Team',
        'Sent to Team',
      ].indexOf(order.orderStatus) > -1
    ) {
      setStatusSelectList(statusList.slice(0, 4))
      setIsPdfVisible(false)
    } else {
      setStatusSelectList([...statusList])
      if (isEdit) {
        setIsPdfVisible(true)
      }
    }
  }

  function getPlayerTeamColorLogo(playerId: string) {
    const selectedPlayer = playerList.find(
      (player: any) => player._id === playerId,
    )
    const { size: playerSize = '' } = selectedPlayer
    const size: object = { label: playerSize, value: playerSize }
    const selectedPlayerTeam = objectPath(selectedPlayer, ['team'], [])
    const team = selectDataFormat(selectedPlayerTeam, '_id', 'name')
    let colors: any[] = [],
      logos: any[] = [],
      artwork: any[] = []

    if (selectedPlayerTeam.length) {
      const selectedTeam: any = selectedPlayerTeam[0]

      colors = selectedTeam.color.filter((color: any) => !!color.status)
      logos = [
        ...selectedTeam.logo.filter(
          (logo: any) => !!(logo.status && logo.logo),
        ),
        ...selectedPlayer.logo.filter(
          (logo: any) => !!(logo.status && logo.logo),
        ),
      ]
      artwork = selectedPlayer.artWork.filter((item: any) => !!item.status)
    }

    return {
      team,
      size,
      colors,
      logos,
      artwork,
    }
  }

  function getTeamColorLogo(teamId: string) {
    const selectedTeam = teamList.find((team: any) => team._id === teamId)

    let colors: any[] = [],
      logos: any[] = [],
      artwork: any[] = []

    if (selectedTeam) {
      colors = selectedTeam.color.filter((color: any) => !!color.status)
      logos = [
        ...selectedTeam.logo.filter(
          (logo: any) => !!(logo.status && logo.logo),
        ),
      ]
      artwork = selectedTeam.artWork.filter((item: any) => !!item.status)
    }

    return {
      colors,
      logos,
      artwork,
    }
  }

  function getProductItems(productName: ProductType) {
    setShowPreview(false)

    fetchProductItems({
      variables: { productName: productName },
    })
  }

  function setOrderFormData() {
    const dynamicFormData: any = {}
    if (sportId === 'football-ncaa') {
      const teamDataObj = getTeamColorLogo(order.teamId)
      setTeamSelectList(teamDataList)
      setColorList(teamDataObj.colors)
      setLogoList(teamDataObj.logos)
      setArtworkList(teamDataObj.artwork)

      dynamicFormData.teamId = { value: order.teamId, label: order.teamName }
    } else {
      const playerDataObj = getPlayerTeamColorLogo(order.playerId)
      setTeamSelectList(playerDataObj.team)
      setColorList(playerDataObj.colors)
      setLogoList(playerDataObj.logos)
      setArtworkList(playerDataObj.artwork)

      dynamicFormData.teamId = playerDataObj.team[0]
    }

    updateSeasonSelectList()
    updateVisibleStatusList()

    setFormData({
      ...dynamicFormData,
      playerId: playerSelectList.find(
        (option: any) => option.value === order.playerId,
      ),
      season: seasonSelectList.find(
        (option: any) => option.value === order.season,
      ),
      productType: productTypeSelectList.find(
        (option: any) => option.value === order.productType,
      ),
      productId: productSelectList.find(
        (option: any) => option.value === order.productId,
      ),
      gloveSize: gloveSizeSelectList.find(
        (option: any) => option.value === order.gloveSize,
      ),
      owner: ownerSelectList.find(
        (option: any) => option.value === order.owner,
      ),
      styleName: order.styleName,
      fileName: order.fileName,
      orderStatus: statusList.find(
        (option: any) => option.value === order.orderStatus,
      ),
    })
  }

  function setDefaultValues() {
    const { playerId, teamId } = formData
    let defaultBrand = 'Nike'

    if (playerId) {
      const selectedPlayer = playerList.find(
        (player: any) => player._id === playerId.value,
      )

      defaultBrand = (selectedPlayer && selectedPlayer.brand) || 'Nike'
    } else if (teamId) {
      const selectedTeam = teamList.find(
        (team: any) => team._id === teamId.value,
      )

      defaultBrand = (selectedTeam && selectedTeam.brand) || 'Nike'
    }

    productItemsList.forEach((item: any) => {
      if (item.itemType === 'swoosh') {
        item.brand = defaultBrand
        item.pattern = 'Solid'
      }
      if (item.itemType === 'palm') {
        item.material = 'Magnagrip Silicone'
        item.pattern = 'Solid'
        /**
         * show customArtwork in palmPattern by default
         */
        item.customPattern = []
        dieCastItems.customPattern = []
        if (artworkList.length) {
          artworkList.forEach((artItem) => {
            if (artItem.palmPattern) {
              item.customPattern.push({
                src: artItem.palmPattern,
                bohSrc: artItem.bohPattern || '',
              })
            }
            if (artItem.dieCastRightPattern) {
              dieCastItems.customPattern.push({
                src: artItem.dieCastRightPattern,
              })
            }
            if (artItem.dieCastLeftPattern) {
              dieCastItems.customPattern.push({
                src: artItem.dieCastLeftPattern,
              })
            }
          })
        }
      }
      if (item.itemType === 'silicone') {
        item.pattern = 'Clear'
      }
    })

    setFormData({
      ...formData,
      productType: productTypeSelectList[0],
      orderStatus: statusList[0],
    })
    updateVisibleStatusList()
    setDefaultBrand(defaultBrand)
  }

  function setDefaultColors() {
    productItemsList.forEach((item: any) => {
      if (item.itemType === 'swoosh' || item.itemType === 'palm') {
        if (item.primaryColors.length) {
          let selectedColor = item.primaryColors.find(
            (color: any) => color.selected === true,
          )

          if (!selectedColor && item.primaryColors.length) {
            item.primaryColors[0].selected = true
          }
        }

        if (item.secondaryColors.length) {
          let selectedColor = item.secondaryColors.find(
            (color: any) => color.selected === true,
          )

          if (!selectedColor && item.secondaryColors.length) {
            item.secondaryColors[0].selected = true
          }
        }

        if (item.tertiaryColors && item.tertiaryColors.length) {
          let selectedColor = item.tertiaryColors.find(
            (color: any) => color.selected === true,
          )

          if (!selectedColor && item.tertiaryColors.length) {
            item.tertiaryColors[0].selected = true
          }
        }
      }
    })
  }

  function onReturnFromDesigner(
    items: any[],
    customMsg: any,
    dieCastItems: any,
  ) {
    setShowDesigner(!showDesigner)
    setCustomMessage(customMsg)
    setDieCastItems(dieCastItems)
  }

  function isFormValid() {
    if (sportId === 'football-ncaa') {
      return (
        (formData.playerId || formData.teamId) &&
        formData.season &&
        formData.productId
      )
    } else {
      return (
        (formData.playerId || formData.teamId) &&
        formData.season &&
        formData.productId &&
        formData.gloveSize
      )
    }
  }

  function checkNflRules() {
    const BOHMaterial = productItemsList.find((item: any) => {
      if (formData.productId.label === 'SB6') {
        return item.itemId === 104
      } else if (formData.productId.label === 'VK4') {
        return item.itemId === 107
      }
      return item.itemId === 101
    })
    const Swoosh = productItemsList.find(
      (item: any) => item.itemType === 'swoosh',
    )
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
      setToastMessage({
        id: 'nfl-error',
        showToast: true,
        type: 'warn',
        title: 'Color not Available',
        message: `Due to NFL rules, the Swoosh/Jumpman and BOH must contrast each other. Please change the Suggested Options and retry saving`,
        onClose: onToastMessageClose,
      })
      return false
    } else {
      setToastMessage({})
      return true
    }
  }

  function onToastMessageClose() {
    setToastMessage({})
  }

  function formatOrderPostData() {
    const postData: any = {}

    Object.keys(formData).forEach((key) => {
      postData[key] = objectPath(formData[key], ['value'], formData[key])
      if (key === 'teamId') {
        postData['teamName'] = objectPath(
          formData[key],
          ['label'],
          formData[key],
        )
      }
    })

    return postData
  }

  function updateThumbnail() {
    setToastMessage({
      id: 'order-status',
      showToast: true,
      type: 'info',
      title: 'Order Status',
      message: 'Generating thumbnail. Please wait...',
      duration: 20000,
      onClose: onToastMessageClose,
    })

    const productType = formData.productId.label
    const firstView: any = productTypes[productType].config.views[0]
    const canvasId: string = firstView.name.toLowerCase().replace(/\s/g, '-')

    generateThumbnail(orderId, canvasId).then((res: any) => {
      updateStatus({
        productId: formData.productId.value,
        orderStatus: formData.orderStatus.value,
        thumbnailLogo: res.Location,
      })
    })
  }

  function generatePdf(customMessage: any) {
    setOverlayMessage('Exporting Spec...Please wait.')
    setShowExportTooltip(false)
    const data = {
      sportId,
      orderId,
      order,
      products: productItemsList,
      playerLogo: order.playerLogo,
      dieCast: dieCastItems,
      customMsg: customMessage,
    }

    downloadPDF(data).then((res: any) => {
      if (res) {
        setOverlayMessage('')
      }
    })
  }

  function generatePng() {
    setShowExportTooltip(false)
    const style: any = productSelectList.find(
      (option: any) => option.value === order.productId,
    )
    const data = {
      products: productItemsList,
      orderId: orderId,
      season: order.season,
      styleName: style.label,
    }

    getPng(data)
  }

  function updateStatus(data: any) {
    const orderData: any = {
      _id: order._id,
      ...data,
      productItems: removeTypeName(productItemsList),
      userId: userId,
    }

    setToastMessage({
      id: 'order-status',
      showToast: true,
      type: 'info',
      title: 'Order Status',
      message: 'Updating order status. Please wait...',
      onClose: onToastMessageClose,
    })

    createOrder({
      variables: orderData,
    }).then((res: any) => {
      setToastMessage({
        id: 'order-status',
        showToast: true,
        type: 'success',
        title: 'Order Status',
        message: 'Order status updated successfully',
        onClose: onToastMessageClose,
      })
    })
  }

  const createDesign = () => {
    saveOrder(productItemsList, customMessage, dieCastItems)
  }

  function saveOrder(productItems: any, customMessage: any, dieCastList: any) {
    setIsSubmitted(true)
    if (!isFormValid() || !checkNflRules()) {
      return
    }
    const orderData: any = {
      ...formatOrderPostData(),
      productItems: removeTypeName(productItems),
      customMessage: customMessage,
      dieCast: dieCastList,
      userId: userId,
      sportId: sportId,
    }
    if (isEdit) {
      orderData._id = order._id
    } else {
      orderData.productItems = remove_id(orderData.productItems)
    }

    setOverlayMessage(
      isEdit
        ? 'Updating design. Please wait...'
        : 'Creating design. Please wait...',
    )

    createOrder({
      variables: orderData,
    }).then(
      (res: any) => {
        setOverlayMessage(
          isEdit
            ? 'Design updated successfully'
            : 'Design Created successfully',
        )

        setTimeout(() => navigate('/admin/orders'), 1000)
      },
      () => {
        setOverlayMessage(
          isEdit ? 'Error in updating design' : 'Error in creating design',
        )

        setTimeout(() => setOverlayMessage(''), 1000)
      },
    )
  }

  const toggleDeleteOrder = () => {
    setDeleteMessage('Are you sure, you want to delete this order?')
    setShowDeleteOrder(!showDeleteOrder)
  }

  const onOrderDelete = () => {
    const { _id = '' } = order
    setDeleteMessage('Deleting order, please wait...')
    let deleteVariables = {
      _id: _id,
      orderId: orderId,
      sportId: sportId,
    }
    deleteOrder({ variables: deleteVariables })
      .then((res: any) => {
        const {
          data: { deleteOrder: deleteResponse },
        } = res
        const { success = false } = deleteResponse
        if (success) {
          setDeleteMessage('Order deleted successfully.')
          setTimeout(() => {
            setShowDeleteOrder(false)
            navigate('/admin/orders')
          }, 1000)
        }
      })
      .catch((err: any) => {
        console.log(err)
        setDeleteMessage('Error in deleting order, please try again.')
      })
  }

  const onDuplicateDialogToggle = () => {
    setDuplicateOrderId('')
    setShowDuplicateOrder(!showDuplicateOrder)
    setDuplicateOrderMessage('Are you sure, you want to duplicate this Order?')
  }

  const onDuplicateOrder = () => {
    const { _id = '' } = order
    setDuplicateOrderMessage('Duplicating order. Please wait...')
    const duplicateVarible = {
      _id: _id,
    }
    duplicateOrder({ variables: duplicateVarible })
      .then((res: any) => {
        const {
          orderDuplicate: { orderId = '' },
        } = res.data

        setDuplicateOrderMessage(
          'Order has been duplicated. For new order click',
        )
        setDuplicateOrderId(orderId)
      })
      .catch((err: any) => {
        console.log(err)
        setDuplicateOrderMessage(
          'Error in duplicating order, Please try again.',
        )
      })
  }

  const getorderDetails = () => {
    navigate(`/admin/orders/${duplicateOrderId}`)

    setDuplicateOrderId('')

    setShowDuplicateOrder(!showDuplicateOrder)

    setDuplicateOrderMessage('')
  }

  function onCompleteRendering(count: number, viewsCount: any[]) {
    if (count === viewsCount.length) {
      setIsExportEnabled(true)
    }
  }

  function handleDocumentClick(e: any) {
    if (!e.target.closest('.export-options')) {
      setShowExportTooltip(false)
    }
  }

  function preview() {
    const productType = formData.productId.label
    const previewTab = productTypes[productType].config.tabs[0]
    const previews: any = previewTab.views
    const previewStyles: any =
      productTypes[productType].config.tabs[0].styleProps
    let renderedCanvasCount = 0

    return (
      <AspectRatioContainer
        xRatio={previewTab.aspectRatio.x}
        yRatio={previewTab.aspectRatio.y}
        width="fixed">
        {previews.map((view: any, index: number) => {
          return (
            <DesignerCanvas
              key={view.id}
              viewId={view.id}
              viewType={view.name}
              productType={formData.productId.label}
              itemList={
                ['dieCast', 'smallDieCast'].indexOf(view.id) > -1
                  ? [dieCastItems]
                  : productItemsList
              }
              reRender={view.reRender}
              customMessage={
                view.id === 'leftCuff'
                  ? customMessage.left
                  : view.id === 'rightCuff'
                  ? customMessage.right
                  : {}
              }
              styleProps={previewStyles ? previewStyles[index] : {}}
              styleName={view.styleName || ''}
              prefix={'order-preview'}
              onComplete={() =>
                onCompleteRendering(++renderedCanvasCount, previews)
              }
            />
          )
        })}
      </AspectRatioContainer>
    )
  }

  if (loading) {
    return <Icon name="nikeLoading" />
  }

  return (
    <Container>
      <OrderContainer>
        {showDeleteOrder && (
          <Dialog title="Delete Order" onClose={toggleDeleteOrder}>
            <Dialog.Body>{deleteMessage}</Dialog.Body>
            <Dialog.Footer>
              <DialogFooter>
                <Button variant="text" onClick={toggleDeleteOrder}>
                  Cancel
                </Button>
                <Button onClick={onOrderDelete}>Delete Order</Button>
              </DialogFooter>
            </Dialog.Footer>
          </Dialog>
        )}
        {showDuplicateOrder && (
          <Dialog title="Duplicate Order" onClose={onDuplicateDialogToggle}>
            <Dialog.Body>
              <DuplicateBodyConatiner>
                <DuplicateMessage>{duplicateOrderMessage}</DuplicateMessage>
                {duplicateOrderId && (
                  <DuplicateOrder
                    onClick={
                      getorderDetails
                    }>{`${duplicateOrderId} >`}</DuplicateOrder>
                )}
              </DuplicateBodyConatiner>
            </Dialog.Body>
            <Dialog.Footer>
              <DialogFooter>
                <Button variant="text" onClick={onDuplicateDialogToggle}>
                  {duplicateOrderId ? 'Close' : 'Cancel'}
                </Button>

                {!duplicateOrderId && (
                  <Button onClick={onDuplicateOrder}>Duplicate</Button>
                )}
              </DialogFooter>
            </Dialog.Footer>
          </Dialog>
        )}

        <Header>
          <HeaderInfo>
            {isEdit && (
              <BreadCrumb>
                <BreadCrumbItem
                  className="link"
                  onClick={() => navigate('/admin/orders')}>
                  All Designs
                </BreadCrumbItem>
                <BreadCrumbItem>&nbsp;/ #{orderId}</BreadCrumbItem>
              </BreadCrumb>
            )}
            <Title>{isEdit ? 'Design Details' : 'Create Design'}</Title>
          </HeaderInfo>
          <HeaderActions>
            {isEdit && (
              <Button variant="outline" onClick={toggleDeleteOrder}>
                Delete
              </Button>
            )}
            {isEdit && !isPdfVisible && (
              <Button variant="outline" onClick={onDuplicateDialogToggle}>
                Duplicate
              </Button>
            )}
            {isPdfVisible && (
              <ExportSpecContainer className="export-options">
                <Button
                  variant="secondary"
                  isDisabled={!isExportEnabled}
                  onClick={() => setShowExportTooltip(!showExportTooltip)}>
                  Export Spec
                </Button>
                {showExportTooltip && (
                  <ExportSpecTooltipContainer>
                    <ExportContainer>
                      <ExportItem onClick={() => generatePdf(customMessage)}>
                        <FontAwesomeIcon icon={faFilePdf} size="lg" />
                        Full Spec
                      </ExportItem>
                      <ExportItem onClick={() => setShowExportTooltip(false)}>
                        <FontAwesomeIcon icon={faFilePdf} size="lg" />
                        Spec w/o Logos
                      </ExportItem>
                      <ExportItem onClick={generatePng}>
                        <FontAwesomeIcon icon={faFileImage} size="lg" />
                        Export PNGs
                      </ExportItem>
                    </ExportContainer>
                  </ExportSpecTooltipContainer>
                )}
              </ExportSpecContainer>
            )}
            <Button onClick={createDesign}>
              {isEdit ? 'Save' : 'Create Design'}
            </Button>
          </HeaderActions>
        </Header>

        <FormContainer>
          {sportId !== 'football-ncaa' && (
            <FormField>
              <Select
                label="Player"
                options={playerSelectList}
                placeholder="Select Player"
                name="playerId"
                value={formData.playerId}
                onChange={(val: any) => changeSelection('playerId', val)}
              />
              {isSubmitted && !formData.playerId && (
                <Error>Please select Player</Error>
              )}
            </FormField>
          )}

          <FormField className={sportId === 'football-ncaa' ? 'large' : ''}>
            <Select
              label="Team"
              options={teamSelectList}
              placeholder="Select Team"
              name="teamId"
              value={formData.teamId}
              isDisabled={sportId !== 'football-ncaa'}
              onChange={(val: any) => changeSelection('teamId', val)}
            />
          </FormField>

          <FormField>
            <Select
              label="Season"
              options={seasonSelectList}
              placeholder="Select Season"
              name="season"
              value={formData.season}
              onChange={(val: any) => changeSelection('season', val)}
            />
            {isSubmitted && !formData.season && (
              <Error>Please select Season</Error>
            )}
          </FormField>

          <FormField className={sportId === 'football-ncaa' ? 'large' : ''}>
            <Select
              label="Style Type"
              options={productTypeSelectList}
              placeholder="Select Style Type"
              name="productType"
              value={formData.productType}
              isDisabled={true}
              onChange={(val: any) => changeSelection('productType', val)}
            />
          </FormField>

          <FormField>
            <Select
              label="Style"
              options={productSelectList}
              placeholder="Select Style"
              name="productId"
              value={formData.productId}
              isDisabled={isEdit}
              onChange={(val: any) => changeSelection('productId', val)}
            />
            {isSubmitted && !formData.productId && (
              <Error>Please select Style</Error>
            )}
          </FormField>

          {sportId !== 'football-ncaa' && (
            <FormField>
              <Select
                label="Glove Size"
                options={gloveSizeSelectList}
                placeholder="Select Glove Size"
                name="gloveSize"
                value={formData.gloveSize}
                onChange={(val: any) => changeSelection('gloveSize', val)}
              />
              {isSubmitted && !formData.gloveSize && (
                <Error>Please select Glove Size</Error>
              )}
            </FormField>
          )}

          <FormField className="large">
            <Input
              label="Style Name"
              placeholder="Enter Style Name"
              name="styleName"
              value={formData.styleName}
              onChange={(e: any) =>
                changeTextInput('styleName', e.target.value)
              }
            />
          </FormField>

          <FormField>
            <Select
              label="Owner"
              options={ownerSelectList}
              placeholder="Select Owner"
              name="owner"
              value={formData.owner}
              onChange={(val: any) => changeSelection('owner', val)}
            />
          </FormField>

          <FormField className="large">
            <Input
              label="SKU"
              placeholder="Enter SKU"
              name="fileName"
              value={formData.fileName}
              onChange={(e: any) => changeTextInput('fileName', e.target.value)}
            />
          </FormField>

          {isEdit && (
            <FormField>
              <Select
                label="Status"
                options={statusSelectList}
                placeholder="Select Status"
                name="orderStatus"
                value={formData.orderStatus}
                onChange={(val: any) => changeSelection('orderStatus', val)}
              />
            </FormField>
          )}
        </FormContainer>

        <PreviewHistoryContainer>
          {showPreview && formData.productId && (
            <PreviewContainer>
              <SubTitle>Preview</SubTitle>
              <PreviewSection>{preview()}</PreviewSection>
              <ButtonContainer disabled={!isFormValid()}>
                <Button onClick={() => setShowDesigner(!showDesigner)}>
                  Customize Style
                </Button>
              </ButtonContainer>
            </PreviewContainer>
          )}
          {isEdit && (
            <HistoryContainer>
              <SubTitle>Design Activity</SubTitle>
              <OrderActivity orderId={orderId} />
            </HistoryContainer>
          )}
        </PreviewHistoryContainer>
      </OrderContainer>

      {showPreview && formData.productId && (
        <DesignerContainer active={showDesigner}>
          <DesignerView
            isAdmin={true}
            title="Style Configuration"
            sportId={sportId}
            productType={formData.productId.label}
            productItems={productItemsList}
            colorList={colorList}
            logoList={logoList}
            artworkList={artworkList}
            customMessage={customMessage}
            isPdfAvailable={isPdfVisible && isExportEnabled}
            generatePdf={generatePdf}
            generatePng={generatePng}
            diecastItem={dieCastItems}
            note={notes}
            onSave={() => {}}
            onSubmit={() => {}}
            onReturnClick={onReturnFromDesigner}
            createDesign={saveOrder}
          />
        </DesignerContainer>
      )}

      {!!overlayMessage && (
        <OverlayContainer>
          <OverlayMessageContainer>
            <OverlayIconContainer>
              <Icon name="nikeLoading" />
            </OverlayIconContainer>
            <OverlayMessage>{overlayMessage}</OverlayMessage>
          </OverlayMessageContainer>
        </OverlayContainer>
      )}

      <Toast {...toastMessage} />
    </Container>
  )
}
