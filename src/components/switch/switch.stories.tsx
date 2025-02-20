import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Switch from './switch'

const Container = styled.div`
  position: relative;
`

storiesOf('Switch', module).add('default', () => {
  return (
    <Container>
      <Switch label="" checked={false} onChange={action('changed')} />
    </Container>
  )
})
