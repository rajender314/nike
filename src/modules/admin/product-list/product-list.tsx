import React from 'react'
import {
  ProductListContainer,
  ProductListItem,
  Logo,
  PreviewImg,
  ProductName,
} from './product-list-components'

type Props = {
  list: any[]
  selectedItem: any
  onSelect: (e: any) => void
}

export default function ProductList({ list, selectedItem, onSelect }: Props) {
  return (
    <ProductListContainer>
      {list.map((product: any, index: number) => {
        return (
          <ProductListItem
            key={index}
            active={selectedItem._id === product._id}
            onClick={() => onSelect(product)}>
            <Logo>
              <PreviewImg src={product.productProfileLogo}></PreviewImg>
            </Logo>
            <ProductName>{product.name}</ProductName>
          </ProductListItem>
        )
      })}
    </ProductListContainer>
  )
}
