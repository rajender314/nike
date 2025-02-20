import React from 'react'
import { useForm } from 'react-hook-form'
import { Icon, Button } from 'components'
import { NoData, Logo, IconContainer } from './empty-screen-components'

import { NoOrders, NoPlayers, NoProducts, NoTeams } from '../icon/icons'

export const iconNames = {
  NoOrders: NoOrders,
  NoPlayers: NoPlayers,
  NoProducts: NoProducts,
  NoTeams: NoTeams,
}

type Props = {
  emptyLogo: keyof typeof iconNames
  emptyText: string
  onChange: (e: any) => void
}

export default function EmptyScreen({ emptyLogo, emptyText, onChange }: Props) {
  const { handleSubmit } = useForm()
  return (
    <NoData>
      <Logo>
        <IconContainer>
          <Icon name={emptyLogo} />
        </IconContainer>
      </Logo>
      <Button onClick={handleSubmit(onChange)}>{emptyText}</Button>
    </NoData>
  )
}
