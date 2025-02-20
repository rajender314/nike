import React, { useState } from 'react'
import useInfiniteScroll from './infinite-scroll'
import styled from 'styled-components'
import { Icon } from 'components'
const List = styled.ul`
  list-style: none;
  font-size: 16px;
  margin: 0;
  padding: 6px;
`

const ListItem = styled.li`
  background-color: #fafafa;
  border: 1px solid #99b4c0;
  padding: 8px;
  margin: 4px;
`

const ARRAY_SIZE = 20
const RESPONSE_TIME = 1000
type Props = {
  scrollContainer?: 'window' | 'parent'
  listToRender?: any
}

function loadItems(prevArray = [], startCursor = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let newArray: any = prevArray

      for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
        const newItem = {
          key: i,
          value: `This is item ${i}`,
        }
        newArray = [...newArray, newItem]
      }

      resolve(newArray)
    }, RESPONSE_TIME)
  })
}

function InfiniteList({ scrollContainer, listToRender }: Props) {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  function handleLoadMore() {
    setLoading(true)
    loadItems(items, items.length).then((newArray: any) => {
      setLoading(false)
      setItems(newArray)
    })
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    // This value is set to "true" for this demo only. You will need to
    // get this value from the API when you request your items.
    hasNextPage: true,
    onLoadMore: handleLoadMore,
    scrollContainer,
  })

  return (
    <List ref={infiniteRef}>
      {items.map((item: any) => (
        <ListItem key={item.key}>{item.value}</ListItem>
      ))}
      {loading && (
        <ListItem>
          <Icon name="nikeLoading" />
        </ListItem>
      )}
    </List>
  )
}

export default InfiniteList
