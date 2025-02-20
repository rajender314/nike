import React, { useState, useEffect } from 'react'
import { useUpdateProduct, getProductsDropdown } from 'api'
import { InlineEdit, Select, ImageUploader } from 'components'
import { useForm } from 'react-hook-form'
import {
  Container,
  ProductHeader,
  ProductCardInfo,
  ContentSection,
  ProductName,
  ProductInfo,
  ProductType,
  ProductFranchise,
  ProductYear,
  Label,
  Field,
} from './product-detail-components'

type Props = {
  product: any
}

export default function ProductDetail({ product }: Props) {
  const { _id, name, type, franchise, year, productProfileLogo } = product
  const [teamName, setTeamName] = useState(name)
  const [selectedType, setSelectedType] = useState({ value: type, label: type })
  const [selectedFranchise, setSelectedFranchise] = useState({
    value: franchise,
    label: franchise,
  })
  const [selectedYear, setSelectedYear] = useState({ value: year, label: year })

  const [updateProduct] = useUpdateProduct()

  useEffect(() => {
    setTeamName(name)
    setSelectedType({ value: type, label: type })
    setSelectedFranchise({ value: franchise, label: franchise })
    setSelectedYear({ value: year, label: year })
  }, [product])

  const { register } = useForm()
  const { productTypes, franchises, years } = getProductsDropdown()

  function editProduct(e: any) {
    const productName = e.target.value

    if (productName) {
      setTeamName(productName)
      updateProduct({
        variables: {
          _id: _id,
          name: productName,
          type: selectedType.value,
          franchise: selectedFranchise.value,
          year: selectedYear.value,
        },
      })
    }
  }

  function changeProductType(type: any) {
    setSelectedType(type)
    updateProduct({
      variables: {
        _id: _id,
        type: type.value,
      },
    })
  }

  function changeFranchise(franchise: any) {
    setSelectedFranchise(franchise)
    updateProduct({
      variables: {
        _id: _id,
        franchise: franchise.value,
      },
    })
  }

  function changeYear(year: any) {
    setSelectedYear(year)
    updateProduct({
      variables: {
        _id: _id,
        year: year.value,
      },
    })
  }

  function onUpload(e: any) {
    if (e) {
      const data = { _id: _id, productProfileLogo: e }
      updateProduct({ variables: data })
    }
  }

  return (
    <Container>
      <ProductHeader>
        <ProductCardInfo key={_id}>
          <ImageUploader
            url={productProfileLogo}
            location="profile"
            onUpload={onUpload}
          />
          <ProductName>
            <InlineEdit
              label="Style Name"
              value={teamName || ''}
              onChange={(e) => setTeamName(e.target.value)}
              onBlur={editProduct}
              readonly={true}
            />
          </ProductName>
        </ProductCardInfo>
      </ProductHeader>

      <ContentSection>
        <ProductInfo>
          <ProductType>
            <Label>Style Type</Label>
            <Field>
              <Select
                value={selectedType}
                name="type"
                onChange={changeProductType}
                register={register('type', { required: true })}
                options={productTypes}
              />
            </Field>
          </ProductType>
          <ProductFranchise>
            <Label>Sports Franchise</Label>
            <Field>
              <Select
                value={selectedFranchise}
                name="franchise"
                onChange={changeFranchise}
                register={register('franchise', { required: true })}
                options={franchises}
              />
            </Field>
          </ProductFranchise>
          <ProductYear>
            <Label>Year</Label>
            <Field>
              <Select
                value={selectedYear}
                name="year"
                onChange={changeYear}
                register={register('year', { required: true })}
                options={years}
              />
            </Field>
          </ProductYear>
        </ProductInfo>
      </ContentSection>
    </Container>
  )
}
