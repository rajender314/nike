import React, { useContext, useEffect, useState } from 'react'
import { useGetProducts } from 'api'
import { Icon } from 'components'
import { ProductList, ProductDetail } from 'modules/admin'
import {
  Container,
  ListContainer,
  DetailContainer,
  ListHeader,
  ListTitle,
} from './products-components'
import { UserContext } from 'providers'

export default function Product() {
  const {
    user: { sportId },
  } = useContext(UserContext)
  const { loading, data, error } = useGetProducts({ sportId: sportId })

  const [selectedProduct, setSelectedProduct] = useState({})

  useEffect(() => {
    if (!loading && data.products && data.products.products) {
      setSelectedProduct(data.products.products[0])
    }
  }, [loading, data])

  function onProductSelect(product: any) {
    setSelectedProduct(product)
  }

  if (loading) {
    return <Icon name="nikeLoading" />
  }

  if (error) {
    return <div>Error loading Styles</div>
  }

  return (
    <Container>
      <ListContainer>
        <ListHeader>
          <ListTitle>Styles</ListTitle>
        </ListHeader>
        {data && data.products && (
          <ProductList
            list={data.products.products}
            selectedItem={selectedProduct}
            onSelect={onProductSelect}
          />
        )}
      </ListContainer>

      <DetailContainer>
        {selectedProduct && <ProductDetail product={selectedProduct} />}
      </DetailContainer>
    </Container>
  )
}
