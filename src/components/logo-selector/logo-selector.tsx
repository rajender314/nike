import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Checkbox, ImageLoad } from 'components'
import {
  ToolTipContainer,
  ToolTipArrow,
  ToolTipBody,
  ListHeader,
  ItemList,
  ListItem,
  ImageBox,
  Overlay,
  EmptyMessage,
  ImageOptionsContainer,
  ImageOptionsList,
  ImageOptionsListItem,
  OptionsListHeader,
  ImageOption,
} from './logo-selector-components'
import TooltipTrigger from 'react-popper-tooltip'

type Props = {
  logoList: any[]
  selectedLogoList: any[]
  isMultiple?: boolean
  limit?: number
  editable?: boolean
  additionalOptions?: boolean
  onUpdate?: (e: any) => void
  onSelect: (e: any, index: number) => void
  hideLockUp?: boolean
}

export default function LogoSelector({
  logoList,
  selectedLogoList,
  isMultiple = false,
  limit = 999,
  editable = true,
  additionalOptions = false,
  onUpdate,
  onSelect,
  hideLockUp = false,
}: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(-1)

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  })

  function addLogo(logo: any) {
    let selectedList = [...selectedLogoList],
      index = selectedList.findIndex((item) => item._id === logo._id),
      updatedList: any = []

    if (index > -1 && isMultiple) {
      selectedList.splice(index, 1)
      updatedList = [...selectedList]
    } else {
      if (isMultiple) {
        if (selectedList.length < limit) {
          updatedList = [...selectedList, { ...logo }]
        } else {
          updatedList = [...selectedList]
        }
      } else {
        updatedList = [{ ...logo }]
      }
    }

    if (onUpdate) {
      onUpdate(updatedList)
    }
  }

  function isLogoSelected(logo: any) {
    return !!selectedLogoList.find((item) => item._id === logo._id)
  }

  function onListImageSelect(logo: any, index: number) {
    if (additionalOptions) {
      if (activeImageIndex !== index) {
        setActiveImageIndex(index)
      } else {
        setActiveImageIndex(-1)
      }
    } else {
      onSelect(logo, index)
    }
  }

  function getPositionIndex(logo: any, position: string) {
    if (!logo.position) {
      return -1
    }

    return logo.position.findIndex((obj: any) => obj.name === position)
  }

  function changeAdditionalOption(logo: any, index: number, position: string) {
    if (!logo.position) {
      logo.position = []
    }

    const positionIndex = getPositionIndex(logo, position)

    if (positionIndex > -1) {
      logo.position.splice(positionIndex, 1)
    } else {
      if (position === 'LockUp') {
        selectedLogoList.forEach((logoItem) => {
          if (logoItem.position) {
            let prevPositionIndex = getPositionIndex(
              logoItem,
              'Right Middle Palm',
            )
            if (prevPositionIndex > -1) {
              logoItem.position.splice(prevPositionIndex, 1)
            }
            prevPositionIndex = getPositionIndex(logoItem, 'Left Middle Palm')
            if (prevPositionIndex > -1) {
              logoItem.position.splice(prevPositionIndex, 1)
            }
          }
        })
      } else if (
        position === 'Right Middle Palm' ||
        position === 'Left Middle Palm'
      ) {
        selectedLogoList.forEach((logoItem) => {
          if (logoItem.position) {
            const prevPositionIndex = getPositionIndex(logoItem, 'LockUp')
            if (prevPositionIndex > -1) {
              logoItem.position.splice(prevPositionIndex, 1)
            }
          }
        })
      }

      selectedLogoList.forEach((logoItem) => {
        if (logoItem.position) {
          const prevPositionIndex = getPositionIndex(logoItem, position)
          if (prevPositionIndex > -1) {
            logoItem.position.splice(prevPositionIndex, 1)
          }
        }
      })

      logo.position.push({ name: position })
    }
    onSelect(logo, index)
  }

  function getAdditionalOptionsClassName(index: number) {
    let colIndex = index + 1
    let className = ['image-options']

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
      !e.target.closest('.image-box') &&
      !e.target.closest('.image-options')
    ) {
      setActiveImageIndex(-1)
    }
  }

  function Trigger({ getTriggerProps, triggerRef }: any) {
    return (
      <ListItem>
        <ImageBox
          {...getTriggerProps({
            ref: triggerRef,
            className: 'trigger',
          })}
          style={{
            backgroundColor:
              isMultiple || selectedLogoList.length === 0 ? '#e0e9f9' : '',
          }}>
          {!isMultiple && selectedLogoList.length > 0 ? (
            selectedLogoList[0].selected && (
              <>
                <ImageLoad src={selectedLogoList[0].logo} />
                <Overlay>
                  <FontAwesomeIcon icon={faCheck} />
                </Overlay>
              </>
            )
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </ImageBox>
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
          {logoList.length > 0 ? (
            <ToolTipBody className="tooltip-body">
              <ListHeader>Team & Player Logos</ListHeader>
              <ItemList>
                {logoList.map((logo: any) => {
                  return (
                    <ListItem
                      key={'logo-' + logo._id}
                      onClick={() => addLogo(logo)}>
                      <ImageBox>
                        <ImageLoad src={logo.logo} />
                        {isLogoSelected(logo) && (
                          <Overlay>
                            <FontAwesomeIcon icon={faCheck} />
                          </Overlay>
                        )}
                      </ImageBox>
                    </ListItem>
                  )
                })}
              </ItemList>
            </ToolTipBody>
          ) : (
            <EmptyMessage>No Logos to Select</EmptyMessage>
          )}
        </>
      </ToolTipContainer>
    )
  }

  return (
    <ItemList>
      {editable && (
        <TooltipTrigger placement="bottom" trigger="click" tooltip={Tooltip}>
          {Trigger}
        </TooltipTrigger>
      )}
      {isMultiple &&
        selectedLogoList.map((logo, index) => {
          return (
            <ListItem key={'logo-' + logo._id}>
              <ImageBox
                className="image-box"
                onClick={() => onListImageSelect(logo, index)}>
                <ImageLoad src={logo.logo} />
                {logo.selected && (
                  <Overlay>
                    <FontAwesomeIcon icon={faCheck} />
                  </Overlay>
                )}
              </ImageBox>
              {activeImageIndex === index && (
                <ImageOptionsContainer
                  className={getAdditionalOptionsClassName(index)}>
                  <ImageOptionsList>
                    <ImageOptionsListItem>
                      <OptionsListHeader>Right Palm</OptionsListHeader>
                      <OptionsListHeader>Left Palm</OptionsListHeader>
                    </ImageOptionsListItem>

                    {hideLockUp ? null : (
                      <ImageOptionsListItem>
                        <ImageOption>
                          <Checkbox
                            label="LockUp"
                            size="small"
                            value="LockUp"
                            checked={getPositionIndex(logo, 'LockUp') > -1}
                            onChange={() =>
                              changeAdditionalOption(logo, index, 'LockUp')
                            }
                          />
                        </ImageOption>
                      </ImageOptionsListItem>
                    )}

                    <ImageOptionsListItem>
                      <ImageOption>
                        <Checkbox
                          label="Middle Palm"
                          size="small"
                          value="Right Middle Palm"
                          checked={
                            getPositionIndex(logo, 'Right Middle Palm') > -1
                          }
                          onChange={() =>
                            changeAdditionalOption(
                              logo,
                              index,
                              'Right Middle Palm',
                            )
                          }
                        />
                      </ImageOption>
                      <ImageOption>
                        <Checkbox
                          label="Middle Palm"
                          size="small"
                          value="Left Middle Palm"
                          checked={
                            getPositionIndex(logo, 'Left Middle Palm') > -1
                          }
                          onChange={() =>
                            changeAdditionalOption(
                              logo,
                              index,
                              'Left Middle Palm',
                            )
                          }
                        />
                      </ImageOption>
                    </ImageOptionsListItem>

                    <ImageOptionsListItem>
                      <ImageOption>
                        <Checkbox
                          label="Small Cuff"
                          size="small"
                          value="Right Small Cuff"
                          checked={
                            getPositionIndex(logo, 'Right Small Cuff') > -1
                          }
                          onChange={() =>
                            changeAdditionalOption(
                              logo,
                              index,
                              'Right Small Cuff',
                            )
                          }
                        />
                      </ImageOption>
                      <ImageOption>
                        <Checkbox
                          label="Small Cuff"
                          size="small"
                          value="Left Small Cuff"
                          checked={
                            getPositionIndex(logo, 'Left Small Cuff') > -1
                          }
                          onChange={() =>
                            changeAdditionalOption(
                              logo,
                              index,
                              'Left Small Cuff',
                            )
                          }
                        />
                      </ImageOption>
                    </ImageOptionsListItem>
                  </ImageOptionsList>
                </ImageOptionsContainer>
              )}
            </ListItem>
          )
        })}
    </ItemList>
  )
}
