import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { Button, Dialog } from 'components'

const Container = styled.div`
  padding: 20px;
`

storiesOf('Dialog', module).add('default', () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Container>
      <Button onClick={() => setIsDialogOpen(true)}>Show Dialog</Button>
      {isDialogOpen && (
        <Dialog title="Dialog Header" onClose={() => setIsDialogOpen(false)}>
          <Dialog.Body>Dialog Body</Dialog.Body>
          <Dialog.Footer>
            <div style={{ flex: 1 }}></div>
            <Button>Save</Button>
          </Dialog.Footer>
        </Dialog>
      )}
    </Container>
  )
})
