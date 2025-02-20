import React, { useState, useEffect } from 'react'

import {
  Radio,
  Input,
  ColorSelector,
  LogoSelector,
  ImageUploaderList,
  Button,
  InlineEditText,
  Switch,
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
  ItemAction,
  ItemMsg,
  ItemOptions,
  ItemSection,
  ItemSectionHeader,
  ItemSectionFlexHeader,
  Footer,
  NotesContainer,
} from './designer-items-configure-components'

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
  onSiliconeSelect: (e: any) => void
  onLogoSelect: (e: any, i: number) => void
  showCustomMessage: boolean
  customMessage: any
  onCustomMessageChange: (side: 'left' | 'right', e: any) => void
  onInsideCuffArtworkChange: (e: any) => void
  colorList: any[]
  logoList: any[]
  dieCastLogos: any[]
  onCustomPatternSelect: (e: any, i: number) => void
  saveOrder: () => void
  deleteCutomPattern: (e: any, index: number) => void
  notes: string
}

export default function DesignerItemsConfigure({
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
  onSiliconeSelect,
  onLogoSelect,
  showCustomMessage = false,
  customMessage = {},
  onCustomMessageChange,
  onInsideCuffArtworkChange,
  colorList,
  logoList,
  dieCastLogos,
  onCustomPatternSelect,
  saveOrder,
  deleteCutomPattern,
  notes,
}: Props) {
  const [selectedBrand, setSelectedBrand] = useState<any>({})
  const [selectedSwooshPattern, setSelectedSwooshPattern] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState<any>({})
  const [selectedPalmPattern, setSelectedPalmPattern] = useState('')
  const [selectedSilicone, setSelectedSilicone] = useState('')
  const [, updateSelectedColorList] = useState<any[]>([])
  const [, updateSelectedLogoList] = useState<any[]>([])
  const [, updateCustomPatternList] = useState<any[]>([])
  const [, updateColorSelection] = useState<any>()
  const [, updateSymmetryChange] = useState()

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
        setSelectedSwooshPattern(swoosh.pattern)
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
        setSelectedPalmPattern(palmMaterial.pattern)
      }
    }

    if (silicone && silicone.pattern) {
      setSelectedSilicone(silicone.pattern)
    }

    if (!customMessage.left) {
      customMessage.left = {}
    }
    if (!customMessage.right) {
      customMessage.right = {}
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
      setSelectedPalmPattern(material.patterns[selectedBrand.value][0].value)
    } else {
      setSelectedPalmPattern('')
    }
    onMaterialSelect(material)
  }

  function selectSwooshPattern(pattern: string) {
    setSelectedSwooshPattern(pattern)
    onPatternSelect(pattern)
  }

  function selectPalmPattern(pattern: string) {
    setSelectedPalmPattern(pattern)
    onPatternSelect(pattern)
  }

  function selectSilicone(siliconeType: string) {
    setSelectedSilicone(siliconeType)
    onSiliconeSelect(siliconeType)
  }

  function handleColorListUpdate(selectedList: any[], key: string) {
    selectedItem[key] = selectedList
    updateSelectedColorList(selectedList)

    if (key === 'options') {
      onColorSelect(selectedList[0], 0)
    }

    //select suggested color by default
    //when no optional colors are selected
    if (
      key === 'optionalColors' &&
      !colorList.find((color) => !!color.selected)
    ) {
      onColorSelect(selectedItem.options, 0)
    }
  }

  function handleColorSelect(color: any, index: number, key: string) {
    if (key === 'optionalColors') {
      onOptionalColorSelect(color, index)
    } else if (key === 'primaryColors') {
      onPrimaryColorSelect(color, index)
    } else if (key === 'secondaryColors') {
      onSecondaryColorSelect(color, index)
    } else if (key === 'tertiaryColors') {
      onTertiaryColorSelect(color, index)
    } else {
      if (color.selected) {
        delete color.selected
      } else {
        color.selected = true
      }

      updateColorSelection({ ...color })
    }
  }

  function handleLogoListUpdate(selectedList: any[]) {
    selectedItem.logos = selectedList
    updateSelectedLogoList(selectedList)
  }

  function handleCustomPatternListUpdate(list: any[]) {
    selectedItem.customPattern = list
    updateCustomPatternList(list)
  }

  function handleSymmetryChange(item: any, type: string) {
    if (type === 'logos') {
      item.symmetricalLogos = !item.symmetricalLogos
      updateSymmetryChange(item.symmetricalLogos)
    } else if (type === 'customPattern') {
      item.symmetricalCustomPattern = !item.symmetricalCustomPattern
      updateSymmetryChange(item.symmetricalCustomPattern)
    }
  }

  function getItemName(item: any) {
    if (item.itemType === 'swoosh' && selectedBrand.value === 'Jordan') {
      return 'Jumpman'
    }

    return item.item
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

        if (!backgroundColor && parentItem.optionalColors) {
          parentItem.optionalColors.forEach((option: any) => {
            if (option.selected && option.code) {
              backgroundColor = option.code
            }
          })
        }
      }
    } else if (item.itemType === 'dieCast') {
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

  function createDesign() {
    saveOrder()
  }

  function itemSwitch(item: any) {
    switch (item.itemType) {
      case 'swoosh':
        return swooshConfig(item)
      case 'palm':
        return palmConfig(item)
      case 'silicone':
        return siliconeConfig(item)
      case 'dieCast':
        return dieCastConfig(item)
      case 'embroidery':
        return embroideryConfig(item)
      default:
        return itemConfig(item)
    }
  }

  function itemConfig(item: any) {
    if (item.item === 'Velcro' || item.item === 'Hanger Loop') {
      return (
        <ItemAction>
          <ItemOptions>
            <ColorSelector
              colorList={[]}
              selectedColorList={item.optionalColors}
              isMultiple={true}
              editable={false}
              onSelect={(color, index) =>
                handleColorSelect(color, index, 'optionalColors')
              }
            />
          </ItemOptions>
        </ItemAction>
      )
    } else {
      return (
        <ItemAction>
          <ItemMsg>Suggested Color</ItemMsg>
          <ItemOptions>
            <ColorSelector
              colorList={colorList}
              selectedColorList={item.options}
              onUpdate={(selectedList) =>
                handleColorListUpdate(selectedList, 'options')
              }
              onSelect={(color, index) =>
                handleColorSelect(color, index, 'options')
              }
            />
          </ItemOptions>
          <ItemMsg>Optional Colors</ItemMsg>
          <ItemOptions>
            <ColorSelector
              colorList={colorList}
              selectedColorList={item.optionalColors}
              isMultiple={true}
              limit={7}
              onUpdate={(selectedList) =>
                handleColorListUpdate(selectedList, 'optionalColors')
              }
              onSelect={(color, index) =>
                handleColorSelect(color, index, 'optionalColors')
              }
            />
          </ItemOptions>
        </ItemAction>
      )
    }
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
                    checked={selectedSwooshPattern === pattern.value}
                    onChange={() => selectSwooshPattern(pattern.value)}
                    value={pattern.value}>
                    {pattern.name}
                  </Radio>
                )
              })}
            </ItemOptions>
          </ItemSection>
        )}

        <ItemSection>
          <ItemSectionHeader>Base Colors</ItemSectionHeader>
          <ItemOptions>
            <ColorSelector
              colorList={colorList}
              selectedColorList={item.primaryColors}
              isMultiple={true}
              limit={7}
              onUpdate={(selectedList) =>
                handleColorListUpdate(selectedList, 'primaryColors')
              }
              onSelect={(color, index) =>
                handleColorSelect(color, index, 'primaryColors')
              }
            />
          </ItemOptions>
        </ItemSection>
        {(selectedSwooshPattern === 'Contrast' ||
          selectedSwooshPattern === 'Outline') && (
          <ItemSection>
            <ItemSectionHeader>Secondary Colors</ItemSectionHeader>
            <ItemOptions>
              <ColorSelector
                colorList={colorList}
                selectedColorList={item.secondaryColors}
                isMultiple={true}
                limit={7}
                onUpdate={(selectedList) =>
                  handleColorListUpdate(selectedList, 'secondaryColors')
                }
                onSelect={(color, index) =>
                  handleColorSelect(color, index, 'secondaryColors')
                }
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
                        checked={selectedPalmPattern === pattern.value}
                        onChange={() => selectPalmPattern(pattern.value)}
                        value={pattern.value}>
                        {pattern.name}
                      </Radio>
                    )
                  },
                )}
              </ItemOptions>
            </ItemSection>

            <ItemSection>
              <ItemSectionHeader>Base Colors</ItemSectionHeader>
              <ItemOptions>
                <ColorSelector
                  colorList={colorList}
                  selectedColorList={item.primaryColors}
                  isMultiple={true}
                  limit={7}
                  onUpdate={(selectedList) =>
                    handleColorListUpdate(selectedList, 'primaryColors')
                  }
                  onSelect={(color, index) =>
                    handleColorSelect(color, index, 'primaryColors')
                  }
                  additionalOptions={
                    selectedPalmPattern === 'Solid' ||
                    selectedPalmPattern === 'Glitter'
                  }
                />
              </ItemOptions>
            </ItemSection>

            {selectedPalmPattern === 'Paint Swirl' && (
              <>
                <ItemSection>
                  <ItemSectionHeader>Secondary Colors</ItemSectionHeader>
                  <ItemOptions>
                    <ColorSelector
                      colorList={colorList}
                      selectedColorList={item.secondaryColors}
                      isMultiple={true}
                      limit={7}
                      onUpdate={(selectedList) =>
                        handleColorListUpdate(selectedList, 'secondaryColors')
                      }
                      onSelect={(color, index) =>
                        handleColorSelect(color, index, 'secondaryColors')
                      }
                    />
                  </ItemOptions>
                </ItemSection>

                <ItemSection>
                  <ItemSectionHeader>Tertiary Colors</ItemSectionHeader>
                  <ItemOptions>
                    <ColorSelector
                      colorList={colorList}
                      selectedColorList={item.tertiaryColors}
                      isMultiple={true}
                      limit={7}
                      onUpdate={(selectedList) =>
                        handleColorListUpdate(selectedList, 'tertiaryColors')
                      }
                      onSelect={(color, index) =>
                        handleColorSelect(color, index, 'tertiaryColors')
                      }
                    />
                  </ItemOptions>
                </ItemSection>
              </>
            )}

            <ItemSection>
              <ItemSectionHeader>Logos</ItemSectionHeader>
              <ItemOptions className="logo">
                <LogoSelector
                  logoList={logoList}
                  selectedLogoList={item.logos}
                  isMultiple={true}
                  limit={7}
                  additionalOptions={true}
                  onUpdate={handleLogoListUpdate}
                  onSelect={onLogoSelect}
                />
              </ItemOptions>
            </ItemSection>

            {selectedPalmPattern === 'Solid' && (
              <ItemSection>
                <ItemSectionHeader>Custom Pattern</ItemSectionHeader>
                <ItemOptions>
                  <ImageUploaderList
                    imageList={item.customPattern}
                    onUpdate={handleCustomPatternListUpdate}
                    onSelect={onCustomPatternSelect}
                    onDelete={deleteCutomPattern}
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
                  checked={selectedSilicone === silicone.value}
                  onChange={() => selectSilicone(silicone.value)}
                  value={silicone.value}>
                  {silicone.name}
                </Radio>
              )
            })}
          </ItemOptions>
        </ItemSection>

        {selectedSilicone === 'Contrast' && (
          <ItemSection>
            <ItemSectionHeader>Colors</ItemSectionHeader>
            <ItemOptions>
              <ColorSelector
                colorList={colorList}
                selectedColorList={item.optionalColors}
                isMultiple={true}
                limit={7}
                onUpdate={(selectedList) =>
                  handleColorListUpdate(selectedList, 'optionalColors')
                }
                onSelect={(color, index) =>
                  handleColorSelect(color, index, 'optionalColors')
                }
              />
            </ItemOptions>
          </ItemSection>
        )}
      </ItemAction>
    )
  }

  function customText(side: 'left' | 'right') {
    return (
      <ListItem>
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
                  value={
                    (customMessage[side] &&
                      customMessage[side].type === 'text' &&
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
                      name: color.name,
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
      <ListItem>
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

  function dieCastConfig(item: any) {
    if (!item.logoColors || item.logoColors.length === 0) {
      item.logoColors = JSON.parse(JSON.stringify(colorList))
      if (!colorList.find((color) => color.code === '#ffffff')) {
        item.logoColors.unshift({ code: '#ffffff' })
      }
      if (!colorList.find((color) => color.code === '#000000')) {
        item.logoColors.unshift({ code: '#000000' })
      }
    }

    if (!item.patternColors || item.patternColors.length === 0) {
      item.patternColors = JSON.parse(JSON.stringify(colorList))
      if (!colorList.find((color) => color.code === '#ffffff')) {
        item.patternColors.unshift({ code: '#ffffff' })
      }
      if (!colorList.find((color) => color.code === '#000000')) {
        item.patternColors.unshift({ code: '#000000' })
      }
    }

    return (
      <ItemAction>
        <ItemSection>
          <ItemSectionHeader>Base Colors</ItemSectionHeader>
          <ItemOptions>
            <ColorSelector
              colorList={colorList}
              selectedColorList={item.primaryColors}
              isMultiple={true}
              limit={7}
              onUpdate={(selectedList) =>
                handleColorListUpdate(selectedList, 'primaryColors')
              }
              onSelect={(color, index) =>
                handleColorSelect(color, index, 'primaryColors')
              }
              additionalOptions={true}
            />
          </ItemOptions>
        </ItemSection>

        <ItemSection>
          <ItemSectionFlexHeader>
            <ItemSectionHeader>Logos</ItemSectionHeader>
            <Switch
              label="Enable Symmetry"
              checked={!!item.symmetricalLogos}
              onChange={() => handleSymmetryChange(item, 'logos')}
            />
          </ItemSectionFlexHeader>

          <ItemOptions className="logo">
            <LogoSelector
              logoList={dieCastLogos}
              selectedLogoList={item.logos}
              isMultiple={true}
              limit={7}
              additionalOptions={true}
              hideLockUp={true}
              onUpdate={handleLogoListUpdate}
              onSelect={onLogoSelect}
            />
          </ItemOptions>
        </ItemSection>

        {item.logoColors.length > 0 && (
          <ItemSection>
            <ItemSectionHeader>
              Select Colors Displayed in Logo(s)
            </ItemSectionHeader>
            <ItemOptions>
              <ColorSelector
                colorList={[]}
                selectedColorList={item.logoColors}
                isMultiple={true}
                limit={20}
                addNew={true}
                editable={false}
                onUpdate={(selectedList) =>
                  handleColorListUpdate(selectedList, 'logoColors')
                }
                onSelect={(color, index) =>
                  handleColorSelect(color, index, 'logoColors')
                }
              />
            </ItemOptions>
          </ItemSection>
        )}

        <ItemSection>
          <ItemSectionFlexHeader>
            <ItemSectionHeader>Custom Pattern</ItemSectionHeader>
            <Switch
              label="Enable Symmetry"
              checked={!!item.symmetricalCustomPattern}
              onChange={() => handleSymmetryChange(item, 'customPattern')}
            />
          </ItemSectionFlexHeader>

          <ItemOptions>
            <ImageUploaderList
              imageList={item.customPattern}
              onUpdate={handleCustomPatternListUpdate}
              onSelect={onCustomPatternSelect}
              additionalOptions={true}
              onDelete={deleteCutomPattern}
            />
          </ItemOptions>
        </ItemSection>

        {item.patternColors.length > 0 && (
          <ItemSection>
            <ItemSectionHeader>
              Select Colors Displayed in Custom Pattern
            </ItemSectionHeader>
            <ItemOptions>
              <ColorSelector
                colorList={[]}
                selectedColorList={item.patternColors}
                isMultiple={true}
                limit={10}
                addNew={true}
                editable={false}
                onUpdate={(selectedList) =>
                  handleColorListUpdate(selectedList, 'patternColors')
                }
                onSelect={(color, index) =>
                  handleColorSelect(color, index, 'patternColors')
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
        <ItemMsg>Suggested Color</ItemMsg>
        <ItemOptions>
          <ColorSelector
            colorList={colorList}
            selectedColorList={item.options}
            onUpdate={(selectedList) =>
              handleColorListUpdate(selectedList, 'options')
            }
            onSelect={(color, index) =>
              handleColorSelect(color, index, 'options')
            }
          />
        </ItemOptions>
        <ItemMsg>Optional Colors</ItemMsg>
        <ItemOptions>
          <ColorSelector
            colorList={colorList}
            selectedColorList={item.optionalColors}
            isMultiple={true}
            limit={7}
            onUpdate={(selectedList) =>
              handleColorListUpdate(selectedList, 'optionalColors')
            }
            onSelect={(color, index) =>
              handleColorSelect(color, index, 'optionalColors')
            }
          />
        </ItemOptions>
      </ItemAction>
    )
  }

  return (
    <Container>
      <Header>Items</Header>
      <List>
        {list.map((item) => {
          return (
            <ListItem
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
        {notes.length ? (
          <NotesContainer className="player-description" disabled={true}>
            <InlineEditText
              label="Notes"
              value={notes}
              placeholder="Insert note to designer here..."
              disabled={true}
            />
          </NotesContainer>
        ) : null}
      </List>
      <Footer>
        <Button
          width="100%"
          variant="primary"
          size="large"
          onClick={createDesign}>
          Save Order
        </Button>
      </Footer>
    </Container>
  )
}
