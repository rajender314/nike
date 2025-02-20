import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import TooltipTrigger from 'react-popper-tooltip'
import { isLightColor } from 'helpers'
import { Checkbox, Input } from 'components'
import {
  ToolTipContainer,
  ToolTipArrow,
  ToolTipBody,
  ListHeader,
  ItemList,
  ListItem,
  ColorBox,
  Label,
  EmptyMessage,
  ColorOptionsContainer,
  ColorOptionsList,
  ColorOption,
  ColorInput,
} from './color-selector-components'

type Props = {
  /**
   * List of colors which will be
   * used in the popup when
   * editable is true
   */
  colorList: any[]
  /**
   * Visible color list
   */
  selectedColorList: any[]
  isMultiple?: boolean
  limit?: number
  /**
   * To be able to add new color from
   * browser color picker
   */
  addNew?: boolean
  /**
   * Ability to add/remove colors from
   * visible color list
   */
  editable?: boolean
  additionalOptions?: boolean
  onUpdate?: (e: any) => void
  onSelect: (e: any, index: number) => void
}

export default function ColorSelector({
  colorList,
  selectedColorList,
  isMultiple = false,
  limit = 999,
  addNew = false,
  editable = true,
  additionalOptions = false,
  onUpdate,
  onSelect,
}: Props) {
  const [activeColorIndex, setActiveColorIndex] = useState(-1)
  const [colorNameEditIndex, setColorNameEditIndex] = useState(-1)
  const [, setColorName] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  })

  function addColor(color: any) {
    let selectedList = [...selectedColorList],
      index = selectedList.findIndex((item) => item._id === color._id),
      updatedList: any = []

    if (index > -1 && isMultiple) {
      selectedList.splice(index, 1)
      updatedList = [...selectedList]
    } else {
      if (isMultiple) {
        if (selectedList.length < limit) {
          updatedList = [...selectedList, { ...color }]
        } else {
          updatedList = [...selectedList]
        }
      } else {
        updatedList = [{ ...color }]
      }
    }

    if (onUpdate) {
      onUpdate(updatedList)
    }
  }

  function addNewColor(color: string) {
    let updatedList = [{ code: color, addNew: true }, ...selectedColorList]

    if (onUpdate) {
      onUpdate(updatedList)
    }
  }

  function toggleColorNameEdit(index: number, color?: any) {
    if (index > -1 && !color.addNew) {
      return
    }
    setColorNameEditIndex(index)
    if (index > -1) {
      setTimeout(() => {
        if (containerRef && containerRef.current) {
          const list: any = containerRef.current
          list.querySelector('.inline-edit input').focus()
        }
      }, 100)
    }
  }

  function changeColorName(e: any, color: any) {
    color.name = e.target.value
    setColorName(color.name)
  }

  function colorNameKeyUp(e: any, color: any) {
    if (e.key === 'Enter') {
      updateColorName(e, color)
    }
  }

  function updateColorName(e: any, color: any) {
    const val = e.target.value

    if (val) {
      color.name = val
    }

    toggleColorNameEdit(-1)
  }

  function isColorSelected(color: any) {
    return !!selectedColorList.find((item) => item._id === color._id)
  }

  function onListColorSelect(color: any, index: number) {
    if (additionalOptions) {
      if (activeColorIndex !== index) {
        setActiveColorIndex(index)
      } else {
        setActiveColorIndex(-1)
      }
    } else {
      onSelect(color, index)
    }
  }

  function changeAdditionalOption(color: any, index: number, position: string) {
    if (!color.position) {
      color.position = []
    }
    const positionIndex = color.position.indexOf(position)
    if (positionIndex > -1) {
      color.position.splice(positionIndex, 1)
    } else {
      selectedColorList.forEach((colorItem) => {
        if (colorItem.position) {
          const prevPositionIndex = colorItem.position.indexOf(position)
          if (prevPositionIndex > -1) {
            colorItem.position.splice(prevPositionIndex, 1)
          }
        }
      })
      color.position.push(position)
    }
    onSelect(color, index)
  }

  function getAdditionalOptionsClassName(index: number) {
    let colIndex = index + 1
    let className = ['color-options']

    if (editable) {
      colIndex = index + 2
    }

    if (colIndex % 4 === 0) {
      className.push('right')
    } else if (colIndex % 4 === 1) {
      className.push('left')
    }

    return className.join(' ')
  }

  function handleDocumentClick(e: any) {
    if (
      !e.target.closest('.color-box') &&
      !e.target.closest('.color-options')
    ) {
      setActiveColorIndex(-1)
    }
  }

  function Trigger({ getTriggerProps, triggerRef }: any) {
    return (
      <ListItem>
        <ColorBox
          {...getTriggerProps({
            ref: triggerRef,
            className: 'trigger',
          })}
          style={{
            backgroundColor:
              isMultiple || selectedColorList.length === 0
                ? '#e0e9f9'
                : selectedColorList[0].code,
          }}>
          {!isMultiple && selectedColorList.length > 0 ? (
            selectedColorList[0].selected && (
              <FontAwesomeIcon
                style={{
                  color: isLightColor(selectedColorList[0].code)
                    ? 'rgba(0, 0, 0, 0.9)'
                    : 'rgba(255, 255, 255, 0.9)',
                }}
                icon={faCheck}
              />
            )
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </ColorBox>
        {!isMultiple && selectedColorList.length > 0 ? (
          <Label>
            {selectedColorList[0].publicName ||
              selectedColorList[0].name ||
              selectedColorList[0].code}
          </Label>
        ) : (
          ''
        )}
      </ListItem>
    )
  }

  function Tooltip({
    getTooltipProps,
    getArrowProps,
    tooltipRef,
    arrowRef,
    placement,
  }: any) {
    return (
      <ToolTipContainer
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
        })}>
        <ToolTipArrow
          {...getArrowProps({
            ref: arrowRef,
            'data-placement': placement,
            className: 'tooltip-arrow',
          })}
        />
        <>
          {colorList.length > 0 ? (
            <ToolTipBody className="tooltip-body">
              <ListHeader>Team Colors</ListHeader>
              <ItemList>
                {colorList.map((color: any) => {
                  return (
                    <ListItem
                      key={'color-' + color._id}
                      onClick={() => addColor(color)}>
                      <ColorBox style={{ backgroundColor: color.code }}>
                        {isColorSelected(color) && (
                          <FontAwesomeIcon
                            style={{
                              color: isLightColor(color.code)
                                ? 'rgba(0, 0, 0, 0.9)'
                                : 'rgba(255, 255, 255, 0.9)',
                            }}
                            icon={faCheck}
                          />
                        )}
                      </ColorBox>
                      <Label>
                        {color.publicName || color.name || color.code}
                      </Label>
                    </ListItem>
                  )
                })}
              </ItemList>
            </ToolTipBody>
          ) : (
            <EmptyMessage>No Colors to Select</EmptyMessage>
          )}
        </>
      </ToolTipContainer>
    )
  }

  return (
    <ItemList ref={containerRef}>
      {addNew && (
        <ListItem>
          <ColorBox
            style={{
              backgroundColor: '#e0e9f9',
            }}>
            <FontAwesomeIcon icon={faPlus} />
            <ColorInput
              type="color"
              onBlur={(e) => addNewColor(e.target.value)}
            />
          </ColorBox>
        </ListItem>
      )}
      {editable && (
        <TooltipTrigger placement="bottom" trigger="click" tooltip={Tooltip}>
          {Trigger}
        </TooltipTrigger>
      )}
      {isMultiple &&
        selectedColorList.map((color, index) => {
          return (
            <ListItem key={'color-' + (color._id || index)}>
              <ColorBox
                className="color-box"
                style={{ backgroundColor: color.code }}
                onClick={() => onListColorSelect(color, index)}>
                {color.selected && (
                  <FontAwesomeIcon
                    style={{
                      color: isLightColor(color.code)
                        ? 'rgba(0, 0, 0, 0.9)'
                        : 'rgba(255, 255, 255, 0.9)',
                    }}
                    icon={faCheck}
                  />
                )}
              </ColorBox>
              {addNew ? (
                colorNameEditIndex === index ? (
                  <Input
                    type="text"
                    className="inline-edit"
                    value={color.name || ''}
                    onChange={(e) => changeColorName(e, color)}
                    onKeyUp={(e) => colorNameKeyUp(e, color)}
                    onBlur={(e) => updateColorName(e, color)}
                  />
                ) : (
                  <Label onClick={() => toggleColorNameEdit(index, color)}>
                    {color.publicName || color.name || color.code}
                  </Label>
                )
              ) : (
                <Label>{color.publicName || color.name || color.code}</Label>
              )}
              {activeColorIndex === index && (
                <ColorOptionsContainer
                  className={getAdditionalOptionsClassName(index)}>
                  <ColorOptionsList>
                    <ColorOption>
                      <Checkbox
                        label="Right Palm"
                        size="small"
                        value="Right"
                        checked={
                          !!color.position &&
                          color.position.indexOf('Right') > -1
                        }
                        onChange={() =>
                          changeAdditionalOption(color, index, 'Right')
                        }
                      />
                    </ColorOption>
                    <ColorOption>
                      <Checkbox
                        label="Left Palm"
                        size="small"
                        value="Left"
                        checked={
                          !!color.position &&
                          color.position.indexOf('Left') > -1
                        }
                        onChange={() =>
                          changeAdditionalOption(color, index, 'Left')
                        }
                      />
                    </ColorOption>
                  </ColorOptionsList>
                </ColorOptionsContainer>
              )}
            </ListItem>
          )
        })}
    </ItemList>
  )
}
