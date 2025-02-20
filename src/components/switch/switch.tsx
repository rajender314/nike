import React from 'react'
import SwitchComponent from 'react-switch'
import { SwitchContainer, Label } from './switch-components'
import { primaryColor } from 'styles'
type Props = {
  label: string
  onChange: (e: any) => void
  checked: boolean
}

export default function Switch({ onChange, checked, label }: Props) {
  return (
    <SwitchContainer>
      <Label>{label}</Label>
      <SwitchComponent
        onChange={onChange}
        checked={checked}
        offColor="#ddd"
        onColor={primaryColor}
        onHandleColor="#fff"
        offHandleColor="#fff"
        handleDiameter={24}
        uncheckedIcon={false}
        checkedIcon={false}
        height={28}
        width={48}
      />
    </SwitchContainer>
  )
}
