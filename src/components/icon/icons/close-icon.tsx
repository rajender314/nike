import React from 'react'
import styled from 'styled-components'

const IconContainer = styled.div`
  padding: 10px;
`

const Icon = styled.div`
  position: relative;
  width: 14px;
  height: 14px;
`

const LineOne = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #80868b;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
`

const LineTwo = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #80868b;
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
`

export default function CloseIcon() {
  return (
    <IconContainer>
      <Icon>
        <LineOne />
        <LineTwo />
      </Icon>
    </IconContainer>
  )
}
