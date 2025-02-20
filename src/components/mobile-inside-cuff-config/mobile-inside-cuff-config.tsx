import React, { useState, useEffect } from 'react'
import { MobileCustomText, HorizontalList } from 'components'
import {
  TextHolder,
  Placeholder,
  HorizontalListContainer,
} from './mobile-inside-cuff-config-components'

const options = [
  {
    id: 'text',
    value: 'Custom Text',
  },
  {
    id: 'logo',
    value: 'Custom Logo',
  },
]

type Props = {
  customMessage: any
  colorList: any[]
  logoList: any[]
  onTextChange: (e: any) => void
  onColorChange: (e: any) => void
  onLogoChange: (e: any) => void
}

export default function MobileInsideCuffConfig({
  customMessage,
  colorList,
  logoList,
  onTextChange,
  onColorChange,
  onLogoChange,
}: Props) {
  const [artType, setArtType] = useState(
    customMessage.type === 'logo' ? 'Custom Logo' : 'Custom Text',
  )
  const [isTextEditing, setIsTextEditing] = useState(false)

  useEffect(() => {
    setArtType(customMessage.type === 'logo' ? 'Custom Logo' : 'Custom Text')
  }, [customMessage])

  return (
    <>
      <HorizontalListContainer>
        <HorizontalList
          type="pill"
          list={options}
          idKey="id"
          valueKey="value"
          selectedItem={{ value: artType }}
          onSelect={(item) => setArtType(item.value)}
        />
      </HorizontalListContainer>

      {artType === 'Custom Text' && (
        <>
          <TextHolder onClick={() => setIsTextEditing(true)}>
            {(customMessage.type === 'text' && customMessage.value) || (
              <Placeholder>Enter Custom Text</Placeholder>
            )}
            {isTextEditing && (
              <MobileCustomText
                value={
                  (customMessage.type === 'text' && customMessage.value) || ''
                }
                onChange={onTextChange}
                onClose={() => setIsTextEditing(false)}
              />
            )}
          </TextHolder>
          <HorizontalListContainer>
            <HorizontalList
              type="color"
              list={colorList}
              idKey="_id"
              valueKey="code"
              selectedItem={{}}
              onSelect={onColorChange}
            />
          </HorizontalListContainer>
        </>
      )}
      {artType === 'Custom Logo' && (
        <HorizontalListContainer>
          <HorizontalList
            type="logo"
            list={logoList}
            idKey="_id"
            valueKey="logo"
            selectedItem={{}}
            onSelect={onLogoChange}
          />
        </HorizontalListContainer>
      )}
    </>
  )
}
