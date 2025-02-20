import React, { useState, useEffect } from 'react'
import {
  HorizontalList,
  MobileColorAdditionalOptions,
  MobileLogoAdditionalOptions,
  MobileOptionSlider,
} from 'components'
import { HorizontalListContainer } from 'modules/designer/designer-items-list/designer-items-list-components'

type Props = {
  config: any
  item: any
  selectedBrand: any
  selectedMaterial: any
  selectedPattern: string
  onSelectMaterial: (e: any) => void
  onSelectPattern: (e: any) => void
  onPrimaryColorSelect: (e: any, i: number) => void
  onSecondaryColorSelect: (e: any, i: number) => void
  onTertiaryColorSelect: (e: any, i: number) => void
  onLogoSelect: (e: any, i: number) => void
  onCustomPatternSelect: (e: any, i: number) => void
}

export default function MobilePalmConfig({
  config,
  item,
  selectedBrand,
  selectedMaterial,
  selectedPattern,
  onSelectMaterial,
  onSelectPattern,
  onPrimaryColorSelect,
  onSecondaryColorSelect,
  onTertiaryColorSelect,
  onLogoSelect,
  onCustomPatternSelect,
}: Props) {
  const [options, setOptions] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<any>()
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(-1)
  const [showColorOptions, setShowColorOptions] = useState(false)
  const [selectedLogo, setSelectedLogo] = useState<any>()
  const [selectedLogoIndex, setSelectedLogoIndex] = useState<number>(-1)
  const [showLogoOptions, setShowLogoOptions] = useState(false)

  useEffect(() => {
    const newOptions = getColorOptions()
    const newIndex = newOptions.indexOf(options[selectedIndex])
    if (newIndex > -1) {
      setSelectedIndex(newIndex)
    } else {
      setSelectedIndex(0)
    }
    setOptions(newOptions)
    // eslint-disable-next-line
  }, [selectedPattern])

  function getColorOptions() {
    let options = []

    if (item.primaryColors && item.primaryColors.length) {
      options.push('Base Colors')
    }
    if (selectedPattern === 'Paint Swirl') {
      if (item.secondaryColors && item.secondaryColors.length) {
        options.push('Secondary Colors')
      }
      if (item.tertiaryColors && item.tertiaryColors.length) {
        options.push('Tertiary Colors')
      }
    }

    if (item.logos && item.logos.length) {
      options.push('Logos')
    }
    if (
      selectedPattern === 'Solid' &&
      item.customPattern &&
      item.customPattern.length
    ) {
      options.push('Custom Pattern')
    }

    return options
  }

  function selectPrimaryColor(color: any, index: number) {
    if (selectedPattern === 'Solid' || selectedPattern === 'Glitter') {
      setSelectedColor(color)
      setSelectedColorIndex(index)
      setShowColorOptions(true)
    } else {
      onPrimaryColorSelect(color, index)
    }
  }

  function selectLogo(logo: any, index: number) {
    setSelectedLogo(logo)
    setSelectedLogoIndex(index)
    setShowLogoOptions(true)
  }

  return (
    <>
      <HorizontalListContainer>
        <HorizontalList
          type="button"
          list={config.palmMaterials}
          idKey="name"
          valueKey="value"
          selectedItem={selectedMaterial}
          onSelect={(material) => onSelectMaterial(material)}
        />
      </HorizontalListContainer>

      {selectedMaterial.patterns && (
        <>
          <HorizontalListContainer>
            <HorizontalList
              type="pill"
              list={selectedMaterial.patterns[selectedBrand.value]}
              idKey="name"
              valueKey="value"
              selectedItem={{ value: selectedPattern }}
              onSelect={(pattern) => onSelectPattern(pattern.value)}
            />
          </HorizontalListContainer>

          <MobileOptionSlider
            options={options}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          />

          {options[selectedIndex] === 'Base Colors' && (
            <HorizontalListContainer>
              <HorizontalList
                type="color"
                list={item.primaryColors}
                idKey="_id"
                valueKey="code"
                selectedItem={{}}
                onSelect={selectPrimaryColor}
              />
            </HorizontalListContainer>
          )}

          {options[selectedIndex] === 'Secondary Colors' && (
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

          {options[selectedIndex] === 'Tertiary Colors' && (
            <HorizontalListContainer>
              <HorizontalList
                type="color"
                list={item.tertiaryColors}
                idKey="_id"
                valueKey="code"
                selectedItem={{}}
                onSelect={onTertiaryColorSelect}
              />
            </HorizontalListContainer>
          )}

          {showColorOptions && (
            <MobileColorAdditionalOptions
              colorList={item.primaryColors}
              selectedColor={selectedColor}
              selectedColorIndex={selectedColorIndex}
              onSelect={onPrimaryColorSelect}
              onClose={() => setShowColorOptions(false)}
            />
          )}

          {options[selectedIndex] === 'Logos' && (
            <HorizontalListContainer>
              <HorizontalList
                type="logo"
                list={item.logos}
                idKey="_id"
                valueKey="logo"
                selectedItem={{}}
                onSelect={selectLogo}
              />
            </HorizontalListContainer>
          )}

          {showLogoOptions && (
            <MobileLogoAdditionalOptions
              logoList={item.logos}
              selectedLogo={selectedLogo}
              selectedLogoIndex={selectedLogoIndex}
              onSelect={onLogoSelect}
              onClose={() => setShowLogoOptions(false)}
            />
          )}

          {options[selectedIndex] === 'Custom Pattern' && (
            <HorizontalListContainer>
              <HorizontalList
                type="logo"
                list={item.customPattern}
                idKey="src"
                valueKey="src"
                selectedItem={{}}
                onSelect={onCustomPatternSelect}
              />
            </HorizontalListContainer>
          )}
        </>
      )}
    </>
  )
}
