import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Portal, Checkbox, ImageLoad } from 'components'
import {
  Container,
  Dialog,
  Header,
  Color,
  Title,
  CloseIcon,
  OptionsTable,
  Row,
  Col,
} from './mobile-color-additional-options-components'

type Props = {
  colorList: any[]
  selectedColor: any
  selectedColorIndex: number
  onSelect: (e: any, i: number) => void
  onClose: () => void
}

export default function MobileColorAdditionalOptions({
  colorList,
  selectedColor,
  selectedColorIndex,
  onSelect,
  onClose,
}: Props) {
  function changeAdditionalOption(color: any, index: number, position: string) {
    if (!color.position) {
      color.position = []
    }
    const positionIndex = color.position.indexOf(position)
    if (positionIndex > -1) {
      color.position.splice(positionIndex, 1)
    } else {
      colorList.forEach((colorItem) => {
        if (colorItem.position) {
          const prevPositionIndex = colorItem.position.indexOf(position)
          if (prevPositionIndex > -1) {
            colorItem.position.splice(prevPositionIndex, 1)
          }
        }
      })
      color.position.push(position)
    }
    onSelect(color, index)
  }

  return (
    <Portal>
      <Container>
        <Dialog>
          <Header>
            <Color style={{ backgroundColor: selectedColor.code }} />
            <Title>Select Placement</Title>
            <CloseIcon onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseIcon>
          </Header>
          <OptionsTable>
            <Row>
              <Col>
                <Checkbox
                  variant="secondary"
                  label="Right Palm"
                  value="Right"
                  checked={
                    !!selectedColor.position &&
                    selectedColor.position.indexOf('Right') > -1
                  }
                  onChange={() =>
                    changeAdditionalOption(
                      selectedColor,
                      selectedColorIndex,
                      'Right',
                    )
                  }
                />
              </Col>
              <Col>
                <Checkbox
                  variant="secondary"
                  label="Left Palm"
                  value="Left"
                  checked={
                    !!selectedColor.position &&
                    selectedColor.position.indexOf('Left') > -1
                  }
                  onChange={() =>
                    changeAdditionalOption(
                      selectedColor,
                      selectedColorIndex,
                      'Left',
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
