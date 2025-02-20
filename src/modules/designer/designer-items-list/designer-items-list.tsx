import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  Button,
  Radio,
  Input,
  ColorSelector,
  LogoSelector,
  ImageUploaderList,
  InlineEditText,
  HorizontalList,
  MobilePalmConfig,
  MobileInsideCuffConfig,
} from 'components'
import {
  Container,
  Header,
  List,
  ListItem,
  ListItemHeader,
  ItemInfo,
  ItemName,
  ItemColor,
  Footer,
  ItemAction,
  ItemMsg,
  ItemOptions,
  ItemSection,
  ItemSectionHeader,
  NotesContainer,
  MobileContainer,
  HorizontalListContainer,
} from './designer-items-list-components'

type Props = {
  config: any
  list: any[]
  selectedItem: any
  onItemSelect: (e: any) => void
  onColorSelect: (e: any, i: number) => void
  onOptionalColorSelect: (e: any, i: number) => void
  onPrimaryColorSelect: (e: any, i: number) => void
  onSecondaryColorSelect: (e: any, i: number) => void
  onTertiaryColorSelect: (e: any, i: number) => void
  onMaterialSelect: (e: any) => void
  onPatternSelect: (e: any) => void
  onLogoSelect: (e: any, i: number) => void
  showCustomMessage: boolean
  customMessage: any
  onCustomMessageChange: (side: 'left' | 'right', e: any) => void
  onInsideCuffArtworkChange: (e: any) => void
  colorList: any[]
  logoList: any[]
  onSave: (e: any) => void
  onSubmit: (e: any) => void
  onCustomPatternSelect: (e: any, i: number) => void
  orderStatus: string
  notes: string
  onNoteChange: (e: any) => void
}

export default function DesignerItemsList({
  config,
  list,
  selectedItem,
  onItemSelect,
  onColorSelect,
  onOptionalColorSelect,
  onPrimaryColorSelect,
  onSecondaryColorSelect,
  onTertiaryColorSelect,
  onMaterialSelect,
  onPatternSelect,
  onLogoSelect,
  showCustomMessage = false,
  customMessage = {},
  onCustomMessageChange,
  onInsideCuffArtworkChange,
  colorList = [],
  logoList = [],
  onSave,
  onSubmit,
  onCustomPatternSelect,
  orderStatus,
  notes,
  onNoteChange,
}: Props) {
  const isMobile = useMediaQuery({ maxWidth: 991 })
  const [mobileList, setMobileList] = useState<any[]>([])
  const [selectedBrand, setSelectedBrand] = useState<any>({})
  const [selectedMaterial, setSelectedMaterial] = useState<any>({})
  const [selectedPattern, setSelectedPattern] = useState('')
  const [, updateCustomPatternList] = useState<any[]>([])
  const listItemRefs: any = {}

  useEffect(() => {
    const swoosh = list.find((item: any) => item.itemType === 'swoosh')
    const palmMaterial = list.find((item: any) => item.itemType === 'palm')
    const silicone = list.find((item: any) => item.itemType === 'silicone')

    if (swoosh) {
      if (swoosh.brand) {
        setSelectedBrand(
          config.brands.find((brand: any) => brand.value === swoosh.brand),
        )
      }
      if (swoosh.pattern) {
        setSelectedPattern(swoosh.pattern)
      }
    }

    if (palmMaterial) {
      if (palmMaterial.material) {
        setSelectedMaterial(
          config.palmMaterials.find(
            (material: any) => material.value === palmMaterial.material,
          ),
        )
      }
      if (palmMaterial.pattern) {
        setSelectedPattern(palmMaterial.pattern)
      }
    }

    if (silicone) {
      if (silicone.pattern) {
        setSelectedPattern(silicone.pattern)
      }
    }

    if (!customMessage.left) {
      customMessage.left = {}
    }
    if (!customMessage.right) {
      customMessage.right = {}
    }

    if (isMobile) {
      if (showCustomMessage) {
        setMobileList([
          ...list,
          {
            side: 'left',
            itemType: 'insideCuff',
            item: 'Left Inside Cuff',
            _id: 'left-inside-cuff',
          },
          {
            side: 'right',
            itemType: 'insideCuff',
            item: 'Right Inside Cuff',
            _id: 'right-inside-cuff',
          },
        ])
      } else {
        setMobileList(list)
      }
    }
    // eslint-disable-next-line
  }, [list])

  useEffect(() => {
    if (
      selectedItem &&
      selectedItem.itemId &&
      listItemRefs[selectedItem.itemId]
    ) {
      listItemRefs[selectedItem.itemId].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    // eslint-disable-next-line
  }, [selectedItem])

  function selectMaterial(material: any) {
    setSelectedMaterial(material)
    if (material.patterns) {
      setSelectedPattern(material.patterns[selectedBrand.value][0].value)
    } else {
      setSelectedPattern('')
    }
    onMaterialSelect(material)
  }

  function selectPattern(pattern: string) {
    setSelectedPattern(pattern)
    onPatternSelect(pattern)
  }

  function selectItemColor(color: any, index: number, type: string) {
    if (type === 'color') {
      let colorIndex = selectedItem.options.indexOf(color)
      if (colorIndex > -1) {
        onColorSelect(color, colorIndex)
      } else {
        colorIndex = selectedItem.optionalColors.indexOf(color)
        if (colorIndex > -1) {
          onOptionalColorSelect(color, colorIndex)
        }
      }
    }
  }

  function getItemName(item: any) {
    if (item.itemType === 'swoosh' && selectedBrand.value === 'Jordan') {
      return 'Jumpman'
    }

    return item.playerItem || item.item
  }

  function renderSelectedColor(item: any, itemList: any[]) {
    let backgroundColor = ''

    if (item.itemType === 'swoosh') {
      item.primaryColors.forEach((option: any) => {
        if (option.selected && option.code) {
          backgroundColor = option.code
        }
      })
    } else if (item.itemType === 'palm') {
      if (item.material === 'Leather') {
        backgroundColor = '#bfc7c5'
      } else if (item.material === 'Hydragrip') {
        backgroundColor = '#121519'
      } else {
        item.primaryColors.forEach((option: any) => {
          if (
            option.selected &&
            option.code &&
            option.position &&
            option.position.indexOf('Right') > -1
          ) {
            backgroundColor = option.code
          }
        })
      }
    } else if (
      item.itemType === 'silicone' &&
      (item.pattern === 'Clear' || item.pattern === 'Solid')
    ) {
      if (item.pattern === 'Clear') {
        backgroundColor = '#ffffff'
      } else if (item.pattern === 'Solid') {
        const index = itemList.indexOf(item)
        const parentItem = itemList[index - 1]

        parentItem.options.forEach((option: any) => {
          if (option.selected && option.code) {
            backgroundColor = option.code
          }
        })

        parentItem.options.forEach((option: any) => {
          if (option.selected && option.code) {
            backgroundColor = option.code
          }
        })

        if (!backgroundColor && parentItem.optionalColors) {
          parentItem.optionalColors.forEach((option: any) => {
            if (option.selected && option.code) {
              backgroundColor = option.code
            }
          })
        }
      }
    } else {
      item.options.forEach((option: any) => {
        if (option.selected && option.code) {
          backgroundColor = option.code
        }
      })

      if (!backgroundColor && item.optionalColors) {
        item.optionalColors.forEach((option: any) => {
          if (option.selected && option.code) {
            backgroundColor = option.code
          }
        })
      }
    }

    return (
      <ItemColor
        style={{
          backgroundColor: backgroundColor || '#fff',
        }}
      />
    )
  }

  function handleCustomPatternListUpdate(list: any[]) {
    selectedItem.customPattern = list
    updateCustomPatternList(list)
  }

  function itemSwitch(item: any) {
    switch (item.itemType) {
      case 'swoosh':
        return swooshConfig(item)
      case 'palm':
        return palmConfig(item)
      case 'silicone':
        return siliconeConfig(item)
      case 'embroidery':
        return embroideryConfig(item)
      default:
        return itemConfig(item)
    }
  }

  function itemConfig(item: any) {
    return (
      <ItemAction>
        <ItemMsg>
          {item.options.length > 0 || item.optionalColors.length > 0
            ? 'Choose a color to see how it looks before you decide'
            : 'No Options Found'}
        </ItemMsg>
        <ItemOptions>
          <ColorSelector
            colorList={[]}
            selectedColorList={[...item.options, ...item.optionalColors]}
            isMultiple={true}
            editable={false}
            onSelect={(color, index) => selectItemColor(color, index, 'color')}
          />
        </ItemOptions>
      </ItemAction>
    )
  }

  function swooshConfig(item: any) {
    return (
      <ItemAction>
        {selectedBrand.patterns && (
          <ItemSection>
            <ItemSectionHeader>Pattern</ItemSectionHeader>
            <ItemOptions>
              {selectedBrand.patterns.map((pattern: any) => {
                return (
                  <Radio
                    key={pattern.value}
                    label="Pattern"
                    name="pattern"
                    checked={selectedPattern === pattern.value}
                    onChange={() => selectPattern(pattern.value)}
                    value={pattern.value}>
                    {pattern.name}
                  </Radio>
                )
              })}
            </ItemOptions>
          </ItemSection>
        )}

        {item.primaryColors && item.primaryColors.length > 0 && (
          <ItemSection>
            <ItemSectionHeader>Base Colors</ItemSectionHeader>
            <ItemOptions>
              <ColorSelector
                colorList={[]}
                selectedColorList={item.primaryColors}
                isMultiple={true}
                editable={false}
                onSelect={onPrimaryColorSelect}
              />
            </ItemOptions>
          </ItemSection>
        )}

        {(selectedPattern === 'Contrast' || selectedPattern === 'Outline') &&
          item.secondaryColors &&
          item.secondaryColors.length > 0 && (
            <ItemSection>
              <ItemSectionHeader>Secondary Colors</ItemSectionHeader>
              <ItemOptions>
                <ColorSelector
                  colorList={[]}
                  selectedColorList={item.secondaryColors}
                  isMultiple={true}
                  editable={false}
                  onSelect={onSecondaryColorSelect}
                />
              </ItemOptions>
            </ItemSection>
          )}
      </ItemAction>
    )
  }

  function palmConfig(item: any) {
    return (
      <ItemAction>
        <ItemSection>
          <ItemSectionHeader>Material</ItemSectionHeader>
          <ItemOptions>
            {config.palmMaterials.map((material: any) => {
              return (
                <Radio
                  key={material.value}
                  label="Palm Material"
                  name="palm-material"
                  checked={selectedMaterial.value === material.value}
                  onChange={() => selectMaterial(material)}
                  value={material.value}>
                  {material.name}
                </Radio>
              )
            })}
          </ItemOptions>
        </ItemSection>

        {selectedMaterial.patterns && (
          <>
            <ItemSection>
              <ItemSectionHeader>Pattern</ItemSectionHeader>
              <ItemOptions>
                {selectedMaterial.patterns[selectedBrand.value].map(
                  (pattern: any) => {
                    return (
                      <Radio
                        key={pattern.value}
                        label="Pattern"
                        name="pattern"
                        checked={selectedPattern === pattern.value}
                        onChange={() => selectPattern(pattern.value)}
                        value={pattern.value}>
                        {pattern.name}
                      </Radio>
                    )
                  },
                )}
              </ItemOptions>
            </ItemSection>

            {item.primaryColors && item.primaryColors.length > 0 && (
              <ItemSection>
                <ItemSectionHeader>Base Colors</ItemSectionHeader>
                <ItemOptions>
                  <ColorSelector
                    colorList={[]}
                    selectedColorList={item.primaryColors}
                    isMultiple={true}
                    editable={false}
                    onSelect={onPrimaryColorSelect}
                    additionalOptions={
                      selectedPattern === 'Solid' ||
                      selectedPattern === 'Glitter'
                    }
                  />
                </ItemOptions>
              </ItemSection>
            )}

            {selectedPattern === 'Paint Swirl' &&
              item.secondaryColors &&
              item.secondaryColors.length > 0 && (
                <ItemSection>
                  <ItemSectionHeader>Secondary Colors</ItemSectionHeader>
                  <ItemOptions>
                    <ColorSelector
                      colorList={[]}
                      selectedColorList={item.secondaryColors}
                      isMultiple={true}
                      editable={false}
                      onSelect={onSecondaryColorSelect}
                    />
                  </ItemOptions>
                </ItemSection>
              )}

            {selectedPattern === 'Paint Swirl' &&
              item.tertiaryColors &&
              item.tertiaryColors.length > 0 && (
                <ItemSection>
                  <ItemSectionHeader>Tertiary Colors</ItemSectionHeader>
                  <ItemOptions>
                    <ColorSelector
                      colorList={[]}
                      selectedColorList={item.tertiaryColors}
                      isMultiple={true}
                      editable={false}
                      onSelect={onTertiaryColorSelect}
                    />
                  </ItemOptions>
                </ItemSection>
              )}

            {item.logos && item.logos.length > 0 && (
              <ItemSection>
                <ItemSectionHeader>Logos</ItemSectionHeader>
                <ItemOptions className="logo">
                  <LogoSelector
                    logoList={[]}
                    selectedLogoList={item.logos}
                    isMultiple={true}
                    editable={false}
                    additionalOptions={true}
                    onSelect={onLogoSelect}
                  />
                </ItemOptions>
              </ItemSection>
            )}
            {selectedPattern === 'Solid' &&
              item.customPattern &&
              item.customPattern.length > 0 && (
                <ItemSection>
                  <ItemSectionHeader>Custom Pattern</ItemSectionHeader>
                  <ItemOptions>
                    <ImageUploaderList
                      imageList={item.customPattern}
                      onUpdate={handleCustomPatternListUpdate}
                      onSelect={onCustomPatternSelect}
                      hideUploader={true}
                    />
                  </ItemOptions>
                </ItemSection>
              )}
          </>
        )}
      </ItemAction>
    )
  }

  function siliconeConfig(item: any) {
    return (
      <ItemAction>
        <ItemSection>
          <ItemSectionHeader>Silicone Type</ItemSectionHeader>
          <ItemOptions>
            {config.siliconeTypes.map((silicone: any) => {
              return (
                <Radio
                  key={silicone.value}
                  label="Silicone Type"
                  name="silicone-type"
                  checked={selectedPattern === silicone.value}
                  onChange={() => selectPattern(silicone.value)}
                  value={silicone.value}>
                  {silicone.name}
                </Radio>
              )
            })}
          </ItemOptions>
        </ItemSection>

        {selectedPattern === 'Contrast' && (
          <ItemSection>
            <ItemMsg>
              {item.options.length > 0 || item.optionalColors.length > 0
                ? 'Choose a color to see how it looks before you decide'
                : 'No Options Found'}
            </ItemMsg>
            <ItemOptions>
              <ColorSelector
                colorList={[]}
                selectedColorList={[...item.options, ...item.optionalColors]}
                isMultiple={true}
                editable={false}
                onSelect={(color, index) =>
                  selectItemColor(color, index, 'color')
                }
              />
            </ItemOptions>
          </ItemSection>
        )}
      </ItemAction>
    )
  }

  function embroideryConfig(item: any) {
    return (
      <ItemAction>
        <ItemSection>
          <ItemMsg>Enter custom text less than 25 characters</ItemMsg>
          <ItemOptions>
            <Input
              type="text"
              value={item.value || ''}
              maxLength={25}
              onChange={(e) => onInsideCuffArtworkChange(e.target.value)}
            />
          </ItemOptions>
        </ItemSection>
        {item.options.length > 0 || item.optionalColors.length > 0 ? (
          <>
            <ItemMsg>'Text Color'</ItemMsg>
            <ItemOptions>
              <ColorSelector
                colorList={[]}
                selectedColorList={[...item.options, ...item.optionalColors]}
                isMultiple={true}
                editable={false}
                onSelect={(color, index) =>
                  selectItemColor(color, index, 'color')
                }
              />
            </ItemOptions>
          </>
        ) : (
          ''
        )}
      </ItemAction>
    )
  }

  function customText(side: 'left' | 'right') {
    return (
      <ListItem disabled={orderStatus === 'Submitted'}>
        <ItemInfo
          onClick={() => onItemSelect({ _id: `${side}-custom-text` })}
          style={{
            backgroundColor:
              selectedItem._id === `${side}-custom-text` ? '#eff7ff' : '#fff',
          }}>
          <ItemName>Custom Text</ItemName>
        </ItemInfo>
        {selectedItem._id === `${side}-custom-text` && (
          <ItemAction>
            <ItemSection>
              <ItemMsg>Enter custom text less than 22 characters</ItemMsg>
              <ItemOptions>
                <Input
                  type="text"
                  placeholder="Enter Custom Text"
                  value={
                    (customMessage[side].type === 'text' &&
                      customMessage[side].value) ||
                    ''
                  }
                  maxLength={22}
                  onChange={(e) =>
                    onCustomMessageChange(side, {
                      ...customMessage[side],
                      ...{ type: 'text', value: e.target.value.toUpperCase() },
                    })
                  }
                />
              </ItemOptions>
            </ItemSection>

            <ItemSection>
              <ItemSectionHeader>Text Color</ItemSectionHeader>
              <ItemOptions>
                <ColorSelector
                  colorList={[]}
                  selectedColorList={colorList}
                  isMultiple={true}
                  editable={false}
                  onSelect={(color) =>
                    onCustomMessageChange(side, {
                      type: 'text',
                      value:
                        (customMessage[side] &&
                          customMessage[side].type === 'text' &&
                          customMessage[side].value) ||
                        '',
                      color: color.code,
                    })
                  }
                />
              </ItemOptions>
            </ItemSection>
          </ItemAction>
        )}
      </ListItem>
    )
  }

  function customLogo(side: 'left' | 'right') {
    return (
      <ListItem disabled={orderStatus === 'Submitted'}>
        <ItemInfo
          onClick={() => onItemSelect({ _id: `${side}-custom-logo` })}
          style={{
            backgroundColor:
              selectedItem._id === `${side}-custom-logo` ? '#eff7ff' : '#fff',
          }}>
          <ItemName>Custom Logo</ItemName>
        </ItemInfo>
        {selectedItem._id === `${side}-custom-logo` && (
          <ItemAction>
            <ItemSection>
              <ItemSectionHeader>Logo</ItemSectionHeader>
              <ItemOptions className="logo">
                <LogoSelector
                  logoList={[]}
                  selectedLogoList={logoList}
                  isMultiple={true}
                  editable={false}
                  onSelect={(logo) =>
                    onCustomMessageChange(side, {
                      type: 'logo',
                      value: logo.logo,
                    })
                  }
                />
              </ItemOptions>
            </ItemSection>
          </ItemAction>
        )}
      </ListItem>
    )
  }

  function hasMultipleColors(item: any) {
    let count = 0

    if (
      item.itemType === 'swoosh' ||
      item.itemType === 'palm' ||
      item.itemType === 'silicone'
    ) {
      return true
    } else {
      count = item.options.length + item.optionalColors.length
    }

    return count > 1
  }

  function mobileItemSwitch(item: any) {
    switch (item.itemType) {
      case 'swoosh':
        return mobileSwooshConfig(item)
      case 'palm':
        return (
          <MobilePalmConfig
            config={config}
            item={item}
            selectedBrand={selectedBrand}
            selectedMaterial={selectedMaterial}
            selectedPattern={selectedPattern}
            onSelectMaterial={selectMaterial}
            onSelectPattern={selectPattern}
            onPrimaryColorSelect={onPrimaryColorSelect}
            onSecondaryColorSelect={onSecondaryColorSelect}
            onTertiaryColorSelect={onTertiaryColorSelect}
            onLogoSelect={onLogoSelect}
            onCustomPatternSelect={onCustomPatternSelect}
          />
        )
      case 'insideCuff':
        return (
          <MobileInsideCuffConfig
            customMessage={customMessage[item.side]}
            colorList={colorList}
            logoList={logoList}
            onTextChange={(e) =>
              onCustomMessageChange(item.side, {
                ...customMessage[item.side],
                ...{ type: 'text', value: e.target.value.toUpperCase() },
              })
            }
            onColorChange={(color) =>
              onCustomMessageChange(item.side, {
                type: 'text',
                value:
                  (customMessage[item.side] &&
                    customMessage[item.side].type === 'text' &&
                    customMessage[item.side].value) ||
                  '',
                color: color.code,
              })
            }
            onLogoChange={(logo) =>
              onCustomMessageChange(item.side, {
                type: 'logo',
                value: logo.logo,
              })
            }
          />
        )
      default:
        return mobileItemConfig(item)
    }
  }

  function mobileItemConfig(item: any) {
    return (
      <HorizontalListContainer>
        <HorizontalList
          type="color"
          list={[...item.options, ...item.optionalColors]}
          idKey="_id"
          valueKey="code"
          selectedItem={{}}
          onSelect={(color, index) => selectItemColor(color, index, 'color')}
        />
      </HorizontalListContainer>
    )
  }

  function mobileSwooshConfig(item: any) {
    return (
      <>
        {selectedBrand.patterns && (
          <HorizontalListContainer>
            <HorizontalList
              type="pill"
              list={selectedBrand.patterns}
              idKey="name"
              valueKey="value"
              selectedItem={{ value: selectedPattern }}
              onSelect={(pattern) => selectPattern(pattern.value)}
            />
          </HorizontalListContainer>
        )}

        {item.primaryColors && item.primaryColors.length > 0 && (
          <HorizontalListContainer>
            <HorizontalList
              type="color"
              list={item.primaryColors}
              idKey="_id"
              valueKey="code"
              selectedItem={{}}
              onSelect={onPrimaryColorSelect}
            />
          </HorizontalListContainer>
        )}

        {(selectedPattern === 'Contrast' || selectedPattern === 'Outline') &&
          item.secondaryColors &&
          item.secondaryColors.length > 0 && (
            <HorizontalListContainer>
              <HorizontalList
                type="color"
                list={item.secondaryColors}
                idKey="_id"
                valueKey="code"
                selectedItem={{}}
                onSelect={onSecondaryColorSelect}
              />
            </HorizontalListContainer>
          )}
      </>
    )
  }

  if (isMobile) {
    return (
      <MobileContainer>
        <HorizontalListContainer>
          <HorizontalList
            type="text"
            list={mobileList}
            idKey="_id"
            valueKey="item"
            selectedItem={selectedItem}
            autoSelect={true}
            onSelect={(item) => onItemSelect(item)}
          />
        </HorizontalListContainer>
        {selectedItem && selectedItem._id && mobileItemSwitch(selectedItem)}
      </MobileContainer>
    )
  } else {
    return (
      <Container>
        <Header>Items</Header>
        <List>
          {list.map((item) => {
            return (
              hasMultipleColors(item) && (
                <ListItem
                  disabled={orderStatus === 'Submitted'}
                  key={item._id}
                  ref={(el) => (listItemRefs[item.itemId] = el)}>
                  <ItemInfo
                    onClick={() => onItemSelect(item)}
                    style={{
                      backgroundColor:
                        item._id === selectedItem._id ? '#eff7ff' : '#fff',
                    }}>
                    <ItemName>{getItemName(item)}</ItemName>{' '}
                    {renderSelectedColor(item, list)}
                  </ItemInfo>
                  {item._id === selectedItem._id && itemSwitch(item)}
                </ListItem>
              )
            )
          })}
          {showCustomMessage && (
            <>
              <ListItemHeader>Left Inside Cuff</ListItemHeader>
              {customText('left')}
              {customLogo('left')}
              <ListItemHeader>Right Inside Cuff</ListItemHeader>
              {customText('right')}
              {customLogo('right')}
            </>
          )}
          <NotesContainer
            className="player-description"
            disabled={orderStatus === 'Submitted'}>
            <InlineEditText
              label="Notes"
              value={notes}
              placeholder="Insert note to designer here..."
              onChange={(e) => onNoteChange(e)}
              disabled={orderStatus === 'Submitted'}
            />
          </NotesContainer>
        </List>
        <Footer disabled={orderStatus === 'Submitted'}>
          <Button width="100%" size="large" onClick={onSave}>
            Save Selection
          </Button>
          <Button
            width="100%"
            variant="secondary"
            size="large"
            onClick={onSubmit}>
            Submit Order
          </Button>
        </Footer>
      </Container>
    )
  }
}
