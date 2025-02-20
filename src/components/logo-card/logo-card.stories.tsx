import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import LogoCard from './logo-card'

const Container = styled.div`
  width: 300px;
  padding: 20px;
`

storiesOf('Logo Card', module).add('default', () => {
  function updateLogo(e: any) {
    console.log(e)
  }

  function updateName(name: string) {
    console.log(name)
  }
  function deleteLogo(id: string) {
    console.log(id)
  }

  return (
    <Container>
      <LogoCard
        url=""
        name=""
        onDelete={deleteLogo}
        updateLogo={updateLogo}
        updateName={updateName}
      />
    </Container>
  )
})
