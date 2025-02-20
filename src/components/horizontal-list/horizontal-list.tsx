import React, { useRef, useEffect } from 'react'
import { ImageLoad } from 'components'
import {
  Container,
  ListContainer,
  List,
  ListItem,
  ListCaption,
  Label,
} from './horizontal-list-components'

type Props = {
  type: 'text' | 'color' | 'button' | 'pill' | 'logo'
  list: any[]
  idKey: string
  valueKey: string
  selectedItem: any
  autoSelect?: boolean
  onSelect: (e: any, i: number) => void
}

export default function HorizontalList({
  type,
  list,
  idKey,
  valueKey,
  selectedItem,
  autoSelect = false,
  onSelect,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (list && list.length) {
      const obj = getSelectedObj()
      if (autoSelect) {
        handleClick(obj.item, obj.index)
      } else {
        scrollToChild(obj.index)
      }
    }
    // eslint-disable-next-line
  }, [list])

  function handleClick(listItem: any, index: number) {
    scrollToChild(index)
    onSelect(listItem, index)
  }

  function scrollToChild(index: number) {
    const elem: any = containerRef.current?.children[index]
    const correction: number = type === 'color' ? 4 : 0

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(
        elem.offsetLeft +
          elem.clientWidth * 0.5 -
          scrollContainerRef.current.clientWidth * 0.5 +
          correction,
        0,
      )
    }
  }

  function getSelectedObj() {
    const index = list.findIndex((item: any) => {
      return item[valueKey] === selectedItem[valueKey] || item.selected
    })

    return {
      item: list[index > -1 ? index : 0],
      index: index > -1 ? index : 0,
    }
  }

  function getSelectedColor() {
    const selectedColor: any = list.find((listItem: any) => listItem.selected)

    return (
      <ListCaption>
        <Label>{selectedColor && selectedColor.name}</Label>
      </ListCaption>
    )
  }

  return (
    <Container>
      <ListContainer ref={scrollContainerRef}>
        <List type={type} ref={containerRef}>
          {list &&
            list.map((listItem: any, index: number) => {
              return (
                <ListItem
                  key={listItem[idKey] + '-' + index}
                  type={type}
                  active={
                    listItem[valueKey] === selectedItem[valueKey] ||
                    listItem.selected
                  }
                  background={type === 'color' ? listItem.code : 'none'}
                  onClick={() => handleClick(listItem, index)}>
                  {type === 'logo' ? (
                    <ImageLoad src={listItem[valueKey]} />
                  ) : type !== 'color' ? (
                    <Label>{listItem[valueKey]}</Label>
                  ) : (
                    ''
                  )}
                </ListItem>
              )
            })}
        </List>
      </ListContainer>
      {type === 'color' && getSelectedColor()}
    </Container>
  )
}
