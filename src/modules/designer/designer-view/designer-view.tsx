import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faEye,
  faFilePdf,
  faFileImage,
} from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'
import { vj6, vj7, sb6, vk4 } from 'data/football'
import { mlb, sp21 } from 'data/baseball'
import { Product as ProductType } from 'types'
import { DesignerItemsConfigure, DesignerItemsList } from 'modules/designer'
import { Icon, Button, AspectRatioContainer } from 'components'
import {
  InnerContainer,
  DesignerViewContainer,
  Header,
  LeftNav,
  RightNav,
  BackIcon,
  HeaderTitleContainer,
  HeaderTitle,
  VerticalSeperator,
  OrderStatus,
  NavItem,
  NavIcon,
  ViewInfo,
  ViewName,
  CanvasSlider,
  CanvasSlide,
  CanvasInnerSlide,
  CanvasSliderProgressBar,
  CanvasSliderThumb,
  CanvasSliderProgress,
  ExportSpecContainer,
  ExportSpecTooltipContainer,
  ExportContainer,
  ExportItem,
  SwitchBox,
  SizeBox,
  MobileNavContainer,
  MobileListContainer,
  CustomiseButtonContainer,
} from './designer-components'
import DesignerCanvas from '../designer-canvas/designer-canvas'

const productTypes: any = {
  VJ6: vj6,
  VJ7: vj7,
  SB6: sb6,
  VK4: vk4,

  MLB: mlb,
  SP21: sp21,
}

type Props = {
  isAdmin: boolean
  title?: string
  trackStatus?: string
  sportId: string
  productType: ProductType
  productItems: any[]
  colorList: any[]
  logoList: any[]
  artworkList: any[]
  customMessage: any
  isPdfAvailable: boolean
  generatePdf?: (customMessage: any) => void
  generatePng?: () => void
  diecastItem: any
  note: string
  onSave: (items: any[], customMsg: any, notes: string) => void
  onSubmit: (items: any[], customMsg: any, notes: string) => void
  onReturnClick: (items: any[], customMsg: any, dieCastItems: any) => void
  createDesign: (items: any[], customMsg: any, dieCastItems: any) => void
}

const dieCastSizes = ['XL - 4XL', 'S - L']

export default function DesignerView({
  isAdmin,
  title = '',
  trackStatus = '',
  sportId,
  productType,
  productItems,
  colorList,
  logoList,
  artworkList,
  customMessage,
  isPdfAvailable,
  generatePdf,
  generatePng,
  diecastItem,
  note,
  onSave,
  onSubmit,
  onReturnClick,
  createDesign,
}: Props) {
  const Views: any[] = productTypes[productType].config.views
  const Tabs: any[] = productTypes[productType].config.tabs
  const isMobile = useMediaQuery({ maxWidth: 991 })
  const [editMode, setEditMode] = useState(false)
  const [visibleTabs, setVisibleTabs] = useState<any>([])
  const [selectedTab, setSelectedTab] = useState<any>({})
  const [previousTab, setPreviousTab] = useState<any>({})
  const [itemList, setItemList] = useState<any>([])
  const [selectedItem, setSelectedItem] = useState<any>({})
  const [selectedBrand, setSelectedBrand] = useState('Nike')
  const [activeSize, setActiveSize] = useState(dieCastSizes[0])
  const [, setSelectedColor] = useState<any>({})
  const [, setSelectedMaterial] = useState('')
  const [, setSelectedPattern] = useState('')
  const [, setSelectedSilicone] = useState('')
  const [, setSelectedCustomPattern] = useState<any>({})
  const [, setSelectedLogo] = useState<any>({})
  const [, setArtwork] = useState<any>({})
  const [customMsg, setCustomMsg] = useState<any>({})
  const [notes, setNotes] = useState<string>('')
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
  const [showExportTooltip, setShowExportTooltip] = useState<boolean>(false)
  const showCustomMessage =
    sportId.indexOf('football') > -1 &&
    (selectedTab.id === 1 || selectedTab.id === 4)

  useEffect(() => {
    updateTabs()
    // eslint-disable-next-line
  }, [isMobile, isAdmin])

  useEffect(() => {
    if (visibleTabs.length && !selectedTab.id) {
      setDefaultColors()
      setBrand()
      setCustomMsg(customMessage || {})
      setDieCastItems(diecastItem)
      selectTab(visibleTabs[0])
      setNotes(note)
    }
    // eslint-disable-next-line
  }, [visibleTabs])

  function updateTabs() {
    if (isMobile) {
      setVisibleTabs(
        Tabs.filter(
          (tab) => ['Preview All', 'Die Cast'].indexOf(tab.name) === -1,
        ),
      )
    } else {
      if (isAdmin) {
        setVisibleTabs(Tabs)
      } else {
        setVisibleTabs(
          Tabs.filter((tab) => ['Die Cast'].indexOf(tab.name) === -1),
        )
      }
    }
  }

  function setDefaultColors() {
    productItems.forEach((item: any) => {
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

  function setBrand() {
    const swoosh = productItems.find((item: any) => item.itemType === 'swoosh')

    if (swoosh && swoosh.brand) {
      setSelectedBrand(swoosh.brand)
    }
  }

  function selectTab(tab: any) {
    //to prevent tab selection while animating
    if (previousTab.id) {
      return
    }
    if (selectedTab.id) {
      setPreviousTab(selectedTab)
    }

    setSelectedTab(tab)

    setTimeout(() => {
      let visibleItemsList: any[] = []

      if (tab.name === 'Preview All') {
        visibleItemsList = productItems.filter((item) => !!item.status)
      } else if (tab.name === 'Die Cast') {
        visibleItemsList = [dieCastItems]
      } else {
        const view = tab.views[0]

        visibleItemsList = productItems.filter((item: any) => {
          if (view.name === 'Top of Hand') {
            if (item.itemType === 'swoosh') {
              return true
            } else if (item.itemType === 'palm') {
              return false
            }
          }

          return (
            !!item.status &&
            view.productAssets.assets.find(
              (asset: any) => asset.itemId === item.itemId,
            )
          )
        })
      }

      setItemList(visibleItemsList)
    }, 0)

    setTimeout(() => {
      setPreviousTab({})
    }, 320)
  }

  function selectItem(item: any) {
    if (selectedItem._id === item._id) {
      setSelectedItem({})
    } else {
      setSelectedItem(item)
    }
  }

  function selectColor(color: any, colorIndex: number) {
    setSelectedColor({ ...color })

    if (selectedItem.optionalColors) {
      selectedItem.optionalColors.forEach(
        (option: any) => delete option.selected,
      )
    }
    selectedItem.options.forEach((option: any, index: number) => {
      if (index === colorIndex) {
        option.selected = true
      } else {
        delete option.selected
      }
    })

    Views.forEach((view) => {
      if (
        view.productAssets.assets.filter(
          (asset: any) => asset.itemId === selectedItem.itemId,
        ).length
      ) {
        view.reRender++
      }
    })
  }

  function selectOptionalColor(color: any, colorIndex: number) {
    setSelectedColor({ ...color })
    selectedItem.options.forEach((option: any) => delete option.selected)

    selectedItem.optionalColors.forEach((option: any, index: number) => {
      if (index === colorIndex) {
        option.selected = true
      } else {
        delete option.selected
      }
    })

    Views.forEach((view) => {
      if (
        view.productAssets.assets.filter(
          (asset: any) => asset.itemId === selectedItem.itemId,
        ).length
      ) {
        view.reRender++
      }
    })
  }

  function selectPrimaryColor(color: any, colorIndex: number) {
    setSelectedColor({ ...color })

    if (color.position) {
      selectedItem.primaryColors.forEach((option: any, index: number) => {
        if (option.position && option.position.length) {
          option.selected = true
        } else {
          delete option.selected
        }
      })
    } else {
      selectedItem.primaryColors.forEach((option: any, index: number) => {
        if (index === colorIndex) {
          option.selected = true
        } else {
          delete option.selected
        }
      })
    }

    Views.forEach((view) => {
      if (
        view.productAssets.assets.filter(
          (asset: any) => asset.itemId === selectedItem.itemId,
        ).length ||
        (view.name === 'Top of Hand' && selectedItem.itemType === 'swoosh')
      ) {
        view.reRender++
      }
    })
  }

  function selectSecondaryColor(color: any, colorIndex: number) {
    setSelectedColor({ ...color })
    selectedItem.secondaryColors.forEach((option: any, index: number) => {
      if (index === colorIndex) {
        option.selected = true
      } else {
        delete option.selected
      }
    })

    Views.forEach((view) => {
      if (
        view.productAssets.assets.filter(
          (asset: any) => asset.itemId === selectedItem.itemId,
        ).length ||
        (view.name === 'Top of Hand' && selectedItem.itemType === 'swoosh')
      ) {
        view.reRender++
      }
    })
  }

  function selectTertiaryColor(color: any, colorIndex: number) {
    setSelectedColor({ ...color })
    selectedItem.tertiaryColors.forEach((option: any, index: number) => {
      if (index === colorIndex) {
        option.selected = true
      } else {
        delete option.selected
      }
    })

    Views.forEach((view) => {
      if (
        view.productAssets.assets.filter(
          (asset: any) => asset.itemId === selectedItem.itemId,
        ).length ||
        (view.name === 'Top of Hand' && selectedItem.itemType === 'swoosh')
      ) {
        view.reRender++
      }
    })
  }

  function selectMaterial(material: any) {
    selectedItem.material = material.value
    if (material.patterns) {
      selectedItem.pattern = material.patterns[selectedBrand][0].value
    } else {
      selectedItem.pattern = ''
    }
    setSelectedMaterial(selectedItem.material)

    Views.forEach((view) => {
      if (
        selectedItem.itemType === 'palm' &&
        (view.name === 'Top of Hand' || view.name === 'Palm of Hand')
      ) {
        view.reRender++
      }
    })
  }

  function selectPattern(pattern: string) {
    selectedItem.pattern = pattern
    setSelectedPattern(selectedItem.brand + '-' + selectedItem.pattern)

    if (selectedItem.itemType === 'palm') {
      // update left/right position while switching between patterns
      if (pattern === 'Solid' || pattern === 'Glitter') {
        selectedItem.primaryColors.forEach((color: any) => {
          if (color.selected && !color.position) {
            color.position = ['Right', 'Left']
          }
        })
      } else {
        selectedItem.primaryColors.forEach((color: any) => {
          if (color.selected && color.position) {
            if (color.position.length === 2) {
              delete color.position
            } else {
              if (color.position.indexOf('Left') > -1) {
                delete color.selected
              }
              delete color.position
            }
          }
        })
      }
    }

    Views.forEach((view) => {
      if (
        (view.name === 'Top of Hand' && selectedItem.itemType === 'swoosh') ||
        (view.name === 'Palm of Hand' && selectedItem.itemType === 'palm') ||
        (view.name === 'Top of Hand' && selectedItem.itemType === 'silicone')
      ) {
        view.reRender++
      }
    })
  }

  function selectSilicone(siliconeType: string) {
    selectedItem.pattern = siliconeType
    setSelectedSilicone(siliconeType)

    Views.forEach((view) => {
      if (view.name === 'Top of Hand' && selectedItem.itemType === 'silicone') {
        view.reRender++
      }
    })
  }

  function selectLogo(logo: any, logoIndex: number) {
    setSelectedLogo({ ...logo })

    if (logo.position) {
      selectedItem.logos.forEach((logo: any, index: number) => {
        if (logo.position && logo.position.length) {
          logo.selected = true
        } else {
          delete logo.selected
        }
      })
    } else {
      selectedItem.logos.forEach((logo: any, index: number) => {
        if (index === logoIndex) {
          logo.selected = true
        } else {
          delete logo.selected
        }
      })
    }

    Views.forEach((view) => {
      if (
        view.productAssets.assets.filter(
          (asset: any) => asset.itemId === selectedItem.itemId,
        ).length
      ) {
        view.reRender++
      }
    })
  }

  function changeCustomMessage(side: 'left' | 'right', msgObj: any) {
    if (side === 'left') {
      setCustomMsg({ ...customMsg, left: msgObj })
    } else if (side === 'right') {
      setCustomMsg({ ...customMsg, right: msgObj })
    }

    selectedTab.views.forEach((view: any) => {
      if (side === 'left' && view.id === 'leftCuff') {
        view.reRender++
      } else if (side === 'right' && view.id === 'rightCuff') {
        view.reRender++
      }
    })
  }

  function selectCustomPattern(pattern: any, patternIndex: number) {
    setSelectedCustomPattern({ ...pattern })

    if (pattern.position) {
      selectedItem.customPattern.forEach((pattern: any, index: number) => {
        if (pattern.position && pattern.position.length) {
          pattern.selected = true
        } else {
          delete pattern.selected
        }
      })
    } else {
      selectedItem.customPattern.forEach((pattern: any, index: number) => {
        if (index === patternIndex && !pattern.selected) {
          pattern.selected = true

          if (selectedItem.itemType === 'palm') {
            artworkList.forEach((artItem) => {
              if (artItem.palmPattern === pattern.src) {
                if (artItem.dieCastRightPattern && artItem.dieCastLeftPattern) {
                  const relatedRightPattern = dieCastItems.customPattern.find(
                    (item: any) => item.src === artItem.dieCastRightPattern,
                  )
                  const relatedLeftPattern = dieCastItems.customPattern.find(
                    (item: any) => item.src === artItem.dieCastLeftPattern,
                  )

                  if (relatedRightPattern || relatedLeftPattern) {
                    dieCastItems.customPattern.forEach((item: any) => {
                      if (item.selected) {
                        delete item.selected
                        delete item.position
                      }
                    })
                  }

                  if (relatedRightPattern) {
                    if (!relatedRightPattern.position) {
                      relatedRightPattern.position = []
                    }
                    relatedRightPattern.selected = true
                    relatedRightPattern.position.push({ name: 'Right' })
                  }

                  if (relatedLeftPattern) {
                    if (!relatedLeftPattern.position) {
                      relatedLeftPattern.position = []
                    }
                    relatedLeftPattern.selected = true
                    relatedLeftPattern.position.push({ name: 'Left' })
                  }
                }
              }
            })
          }
        } else {
          delete pattern.selected
        }
      })
    }

    Views.forEach((view) => {
      if (
        view.id === 'dieCast' ||
        view.id === 'smallDieCast' ||
        view.productAssets.assets.filter(
          (asset: any) => asset.itemId === selectedItem.itemId,
        ).length
      ) {
        view.reRender++
      }
    })
  }

  function onInsideCuffArtworkChange(value: string) {
    selectedItem.value = value
    setArtwork({ ...selectedItem })

    Views.forEach((view) => {
      if (view.id !== 'palm') {
        view.reRender++
      }
    })
  }

  function createOrder() {
    createDesign(productItems, customMsg, dieCastItems)
  }

  function exportSpec() {
    setShowExportTooltip(false)
    if (generatePdf) generatePdf(customMsg)
  }

  function exportPng() {
    setShowExportTooltip(false)
    if (generatePng) generatePng()
  }

  function getDieCastLogos() {
    let dieCastLogos: any[] = []
    const palmItems: any = productItems.find(
      (item: any) => item.itemType === 'palm',
    )
    if (palmItems) {
      const selectedPalmLogos = palmItems.logos.filter(
        (logo: any) => logo.selected === true,
      )
      dieCastLogos = logoList.filter((logos: any) => {
        return selectedPalmLogos.find((logo: any) => {
          return logo._id === logos._id
        })
      })
    }

    return dieCastLogos
  }

  function onCustomPatternDelete(pattern: any, PatternIndex: number) {
    setSelectedCustomPattern({ ...pattern })
    selectedItem.customPattern.splice(PatternIndex, 1)
    Views.forEach((view) => {
      if (
        view.productAssets.assets.filter(
          (asset: any) => asset.itemId === selectedItem.itemId,
        ).length
      ) {
        view.reRender++
      }
    })
  }

  function onCanvasUpdate() {
    setSelectedItem({ ...selectedItem })
  }

  function changeNotes(note: any) {
    setNotes(note.target.value)
  }

  function onViewUpdate(viewName: string) {
    Views.forEach((view) => {
      if (view.name === viewName) {
        view.reRender++
      }
    })
  }

  function renderDesignerCanvas(tab: any) {
    return tab.views.map((view: any, index: number) => {
      return (
        view.productAssets &&
        view.productAssets.assets && (
          <DesignerCanvas
            key={view.id}
            viewId={view.id}
            viewType={view.name}
            productType={productType}
            itemList={tab.name === 'Die Cast' ? [dieCastItems] : productItems}
            reRender={view.reRender}
            customMessage={
              view.id === 'leftCuff'
                ? customMsg.left
                : view.id === 'rightCuff'
                ? customMsg.right
                : {}
            }
            styleProps={tab.styleProps && tab.styleProps[index]}
            styleName={view.styleName || ''}
            prefix={tab.prefix || ''}
            isAdmin={isAdmin}
            isInteractive={true}
            onItemSelect={selectItem}
            onViewUpdate={() => onViewUpdate(view.name)}
            onUpdate={onCanvasUpdate}
          />
        )
      )
    })
  }

  function toggleDieCastSize(size: string) {
    if (size === 'XL - 4XL') {
      selectedTab.styleProps = [{}, { display: 'none' }]
    } else {
      selectedTab.styleProps = [{ display: 'none' }, {}]
    }

    setActiveSize(size)
  }

  function mobileSave() {
    onSave(productItems, customMsg, notes)
    setEditMode(false)
  }

  function getMobileListHeight() {
    let height = 160

    if (selectedItem.itemType === 'swoosh') {
      height = height + 60
      if (
        (selectedItem.pattern === 'Contrast' ||
          selectedItem.pattern === 'Outline') &&
        selectedItem.secondaryColors &&
        selectedItem.secondaryColors.length > 0
      ) {
        height = height + 86
      }
    } else if (selectedItem.itemType === 'palm') {
      if (selectedItem.material === 'Magnagrip Silicone') {
        height = height + 150
      } else {
        height = height - 20
      }
    } else if (selectedItem.itemType === 'insideCuff') {
      height = 230
    }

    return height
  }

  return (
    <InnerContainer>
      <DesignerViewContainer>
        <CanvasSlider editMode={editMode} height={getMobileListHeight()}>
          {visibleTabs.map((tab: any) => {
            return (
              <CanvasSlide
                active={selectedTab.id === tab.id}
                inactive={previousTab.id === tab.id}
                left={previousTab && selectedTab.id > previousTab.id}
                right={previousTab && selectedTab.id < previousTab.id}
                key={tab.id}>
                <CanvasInnerSlide>
                  {tab.aspectRatio ? (
                    <AspectRatioContainer
                      xRatio={tab.aspectRatio.x}
                      yRatio={tab.aspectRatio.y}>
                      {renderDesignerCanvas(tab)}
                    </AspectRatioContainer>
                  ) : (
                    renderDesignerCanvas(tab)
                  )}
                </CanvasInnerSlide>
              </CanvasSlide>
            )
          })}
        </CanvasSlider>

        {!isMobile && (
          <CanvasSliderProgressBar>
            {visibleTabs.map((tab: any) => {
              return (
                <CanvasSliderThumb
                  key={tab.id}
                  onClick={() => selectTab(tab)}
                />
              )
            })}
            <CanvasSliderProgress
              style={{ left: (selectedTab.id - 1) * 76 + 'px' }}
            />
          </CanvasSliderProgressBar>
        )}

        <Header>
          <BackIcon
            onClick={() =>
              onReturnClick(productItems, customMsg, dieCastItems)
            }>
            <FontAwesomeIcon icon={faAngleLeft} />
          </BackIcon>
          <HeaderTitleContainer>
            <HeaderTitle>{title}</HeaderTitle>
            <VerticalSeperator isAdmin={isAdmin} />
            {!isAdmin && trackStatus && (
              <OrderStatus className={trackStatus.toLowerCase()}>
                {trackStatus}
              </OrderStatus>
            )}
          </HeaderTitleContainer>

          {isAdmin && (
            <>
              {selectedTab.name === 'Die Cast' &&
                dieCastSizes.map((size, index) => {
                  return (
                    <SwitchBox key={index} active={activeSize === size}>
                      <SizeBox
                        onClick={() => {
                          toggleDieCastSize(size)
                        }}>{`${size}`}</SizeBox>
                    </SwitchBox>
                  )
                })}
              {isPdfAvailable && (
                <ExportSpecContainer className="export-options">
                  <Button
                    variant="secondary"
                    onClick={() => setShowExportTooltip(!showExportTooltip)}>
                    Export Spec
                  </Button>
                  {showExportTooltip && (
                    <ExportSpecTooltipContainer>
                      <ExportContainer>
                        <ExportItem onClick={exportSpec}>
                          <FontAwesomeIcon icon={faFilePdf} size="lg" />
                          Full Spec
                        </ExportItem>
                        <ExportItem onClick={() => setShowExportTooltip(false)}>
                          <FontAwesomeIcon icon={faFilePdf} size="lg" />
                          Spec w/o Logos
                        </ExportItem>
                        <ExportItem onClick={exportPng}>
                          <FontAwesomeIcon icon={faFileImage} size="lg" />
                          Export PNGs
                        </ExportItem>
                      </ExportContainer>
                    </ExportSpecTooltipContainer>
                  )}
                </ExportSpecContainer>
              )}
            </>
          )}
          {isMobile && editMode && (
            <Button rounded={true} onClick={mobileSave}>
              Save
            </Button>
          )}
        </Header>

        <LeftNav>
          {visibleTabs.map((tab: any, index: number) => {
            return (
              <NavItem
                active={selectedTab.id === tab.id}
                key={index}
                onClick={() => selectTab(tab)}>
                {tab.id === 1 ? (
                  <NavIcon className="preview">
                    <FontAwesomeIcon icon={faEye} />
                  </NavIcon>
                ) : (
                  <NavIcon iconStyles={tab.iconStyles}>
                    <Icon name={tab.iconName} />
                  </NavIcon>
                )}

                {!isMobile && (
                  <ViewInfo>
                    <ViewName>{tab.name}</ViewName>
                  </ViewInfo>
                )}
              </NavItem>
            )
          })}
        </LeftNav>
      </DesignerViewContainer>
      <RightNav>
        {isAdmin ? (
          <DesignerItemsConfigure
            config={productTypes[productType]['config']}
            list={itemList}
            selectedItem={selectedItem}
            onItemSelect={selectItem}
            onColorSelect={selectColor}
            onOptionalColorSelect={selectOptionalColor}
            onPrimaryColorSelect={selectPrimaryColor}
            onSecondaryColorSelect={selectSecondaryColor}
            onTertiaryColorSelect={selectTertiaryColor}
            onMaterialSelect={selectMaterial}
            onPatternSelect={selectPattern}
            onSiliconeSelect={selectSilicone}
            onLogoSelect={selectLogo}
            showCustomMessage={showCustomMessage}
            customMessage={showCustomMessage ? customMsg : {}}
            onCustomMessageChange={changeCustomMessage}
            onInsideCuffArtworkChange={onInsideCuffArtworkChange}
            colorList={colorList}
            logoList={logoList}
            saveOrder={createOrder}
            onCustomPatternSelect={selectCustomPattern}
            deleteCutomPattern={onCustomPatternDelete}
            dieCastLogos={getDieCastLogos()}
            notes={selectedTab.name !== 'Die Cast' ? notes : ''}
          />
        ) : isMobile ? (
          trackStatus !== 'Submitted' && (
            <MobileNavContainer>
              <CustomiseButtonContainer>
                <Button
                  rounded={true}
                  background="#09BAA6"
                  onClick={() => setEditMode(true)}>
                  Customize
                </Button>
              </CustomiseButtonContainer>
              <MobileListContainer
                active={editMode}
                height={getMobileListHeight()}>
                {editMode && (
                  <DesignerItemsList
                    config={productTypes[productType]['config']}
                    list={itemList}
                    selectedItem={selectedItem}
                    onItemSelect={selectItem}
                    onColorSelect={selectColor}
                    onOptionalColorSelect={selectOptionalColor}
                    onPrimaryColorSelect={selectPrimaryColor}
                    onSecondaryColorSelect={selectSecondaryColor}
                    onTertiaryColorSelect={selectTertiaryColor}
                    onMaterialSelect={selectMaterial}
                    onPatternSelect={selectPattern}
                    onLogoSelect={selectLogo}
                    showCustomMessage={showCustomMessage}
                    customMessage={showCustomMessage ? customMsg : {}}
                    onCustomMessageChange={changeCustomMessage}
                    onInsideCuffArtworkChange={onInsideCuffArtworkChange}
                    colorList={colorList}
                    logoList={logoList}
                    onCustomPatternSelect={selectCustomPattern}
                    onSave={() => onSave(productItems, customMsg, notes)}
                    onSubmit={() => onSubmit(productItems, customMsg, notes)}
                    orderStatus={trackStatus}
                    notes={notes}
                    onNoteChange={changeNotes}
                  />
                )}
              </MobileListContainer>
              )
            </MobileNavContainer>
          )
        ) : (
          <DesignerItemsList
            config={productTypes[productType]['config']}
            list={itemList}
            selectedItem={selectedItem}
            onItemSelect={selectItem}
            onColorSelect={selectColor}
            onOptionalColorSelect={selectOptionalColor}
            onPrimaryColorSelect={selectPrimaryColor}
            onSecondaryColorSelect={selectSecondaryColor}
            onTertiaryColorSelect={selectTertiaryColor}
            onMaterialSelect={selectMaterial}
            onPatternSelect={selectPattern}
            onLogoSelect={selectLogo}
            showCustomMessage={showCustomMessage}
            customMessage={showCustomMessage ? customMsg : {}}
            onCustomMessageChange={changeCustomMessage}
            onInsideCuffArtworkChange={onInsideCuffArtworkChange}
            colorList={colorList}
            logoList={logoList}
            onCustomPatternSelect={selectCustomPattern}
            onSave={() => onSave(productItems, customMsg, notes)}
            onSubmit={() => onSubmit(productItems, customMsg, notes)}
            orderStatus={trackStatus}
            notes={notes}
            onNoteChange={changeNotes}
          />
        )}
      </RightNav>
    </InnerContainer>
  )
}
