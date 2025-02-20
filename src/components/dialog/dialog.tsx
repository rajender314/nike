import React, { ReactNode } from 'react'
import { Portal, Icon } from 'components'
import {
  Container,
  Backdrop,
  DialogContainer,
  Header,
  Title,
  CloseIcon,
  Body,
  Footer,
} from './dialog-components'

type Props = {
  title: string
  children?: ReactNode
  onClose?: (e: any) => void
}

export default function Dialog({ title, children, onClose }: Props) {
  return (
    <Portal>
      <Container>
        <Backdrop onClick={onClose} />
        <DialogContainer>
          <Header>
            <Title>{title}</Title>
            <CloseIcon onClick={onClose}>
              <Icon name="close" />
            </CloseIcon>
          </Header>
          {children}
        </DialogContainer>
      </Container>
    </Portal>
  )
}

Dialog.Body = Body
Dialog.Footer = Footer
