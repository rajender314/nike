import React, { useState } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ImageUploader from './image-uploader'

const Container = styled.div`
  position: relative;
  width: 400px;
  max-width: 100%;
  padding: 20px;
`

storiesOf('Image Uploader', module).add('default', () => {
  function onUpload() {}

  return (
    <Container>
      <ImageUploader url={''} location="team" onUpload={onUpload} />
    </Container>
  )
})
