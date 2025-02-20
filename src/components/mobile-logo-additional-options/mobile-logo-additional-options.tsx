import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Portal, Checkbox, ImageLoad } from 'components'
import {
  Container,
  Dialog,
  Header,
  Logo,
  Title,
  CloseIcon,
  OptionsTable,
  TableHeader,
  Row,
  Col,
  Lockup,
} from './mobile-logo-additional-options-components'

type Props = {
  logoList: any[]
  selectedLogo: any
  selectedLogoIndex: number
  onSelect: (e: any, i: number) => void
  onClose: () => void
}

export default function MobileLogoAdditionalOptions({
  logoList,
  selectedLogo,
  selectedLogoIndex,
  onSelect,
  onClose,
}: Props) {
  function getPositionIndex(logo: any, position: string) {
    if (!logo.position) {
      return -1
    }

    return logo.position.findIndex((obj: any) => obj.name === position)
  }

  function changeAdditionalOption(logo: any, index: number, position: string) {
    if (!logo.position) {
      logo.position = []
    }

    const positionIndex = getPositionIndex(logo, position)

    if (positionIndex > -1) {
      logo.position.splice(positionIndex, 1)
    } else {
      if (position === 'LockUp') {
        logoList.forEach((logoItem: any) => {
          if (logoItem.position) {
            let prevPositionIndex = getPositionIndex(
              logoItem,
              'Right Middle Palm',
            )
            if (prevPositionIndex > -1) {
              logoItem.position.splice(prevPositionIndex, 1)
            }
            prevPositionIndex = getPositionIndex(logoItem, 'Left Middle Palm')
            if (prevPositionIndex > -1) {
              logoItem.position.splice(prevPositionIndex, 1)
            }
          }
        })
      } else if (
        position === 'Right Middle Palm' ||
        position === 'Left Middle Palm'
      ) {
        logoList.forEach((logoItem: any) => {
          if (logoItem.position) {
            const prevPositionIndex = getPositionIndex(logoItem, 'LockUp')
            if (prevPositionIndex > -1) {
              logoItem.position.splice(prevPositionIndex, 1)
            }
          }
        })
      }

      logoList.forEach((logoItem) => {
        if (logoItem.position) {
          const prevPositionIndex = getPositionIndex(logoItem, position)
          if (prevPositionIndex > -1) {
            logoItem.position.splice(prevPositionIndex, 1)
          }
        }
      })

      logo.position.push({ name: position })
    }
    onSelect(logo, index)
  }

  return (
    <Portal>
      <Container>
        <Dialog>
          <Header>
            <Logo>
              <ImageLoad src={selectedLogo.logo} />
            </Logo>
            <Title>Select Placement</Title>
            <CloseIcon onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseIcon>
          </Header>
          <OptionsTable>
            <TableHeader>
              <Col>Right Palm</Col>
              <Col>Left Palm</Col>
            </TableHeader>
            <Lockup>
              <Col>
                <Checkbox
                  variant="secondary"
                  label="LockUp"
                  value="LockUp"
                  checked={getPositionIndex(selectedLogo, 'LockUp') > -1}
                  onChange={() =>
                    changeAdditionalOption(
                      selectedLogo,
                      selectedLogoIndex,
                      'LockUp',
                    )
                  }
                />
              </Col>
            </Lockup>
            <Row>
              <Col>
                <Checkbox
                  variant="secondary"
                  label="Middle Palm"
                  value="Right Middle Palm"
                  checked={
                    getPositionIndex(selectedLogo, 'Right Middle Palm') > -1
                  }
                  onChange={() =>
                    changeAdditionalOption(
                      selectedLogo,
                      selectedLogoIndex,
                      'Right Middle Palm',
                    )
                  }
                />
              </Col>
              <Col>
                <Checkbox
                  variant="secondary"
                  label="Middle Palm"
                  value="Left Middle Palm"
                  checked={
                    getPositionIndex(selectedLogo, 'Left Middle Palm') > -1
                  }
                  onChange={() =>
                    changeAdditionalOption(
                      selectedLogo,
                      selectedLogoIndex,
                      'Left Middle Palm',
                    )
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Checkbox
                  variant="secondary"
                  label="Small Cuff"
                  value="Right Small Cuff"
                  checked={
                    getPositionIndex(selectedLogo, 'Right Small Cuff') > -1
                  }
                  onChange={() =>
                    changeAdditionalOption(
                      selectedLogo,
                      selectedLogoIndex,
                      'Right Small Cuff',
                    )
                  }
                />
              </Col>
              <Col>
                <Checkbox
                  variant="secondary"
                  label="Small Cuff"
                  value="Left Small Cuff"
                  checked={
                    getPositionIndex(selectedLogo, 'Left Small Cuff') > -1
                  }
                  onChange={() =>
                    changeAdditionalOption(
                      selectedLogo,
                      selectedLogoIndex,
                      'Left Small Cuff',
                    )
                  }
                />
              </Col>
            </Row>
          </OptionsTable>
        </Dialog>
      </Container>
    </Portal>
  )
}
