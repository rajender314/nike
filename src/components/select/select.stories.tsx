import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Select from './select'

const Container = styled.div`
  position: relative;
  width: 400px;
  max-width: 100%;
  padding: 20px;
`

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
]

storiesOf('Select', module).add('default', () => {
  return (
    <Container>
      <Select
        label="Select Option"
        options={options}
        name="select"
        onChange={action('changed')}
      />
    </Container>
  )
})
