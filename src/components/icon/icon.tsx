import React from 'react'
import {
  AvatarIcon,
  CloseIcon,
  DeleteIcon,
  HomeIcon,
  NikeIcon,
  NikeLargeIcon,
  NikeLoadingIcon,
  JordanIcon,
  PlayerIcon,
  ProductIcon,
  TeamIcon,
  SearchIcon,
  AddIcon,
  TopOfHandIcon,
  PalmOfHandIcon,
  InsideCuffIcon,
  MiddlePalmIcon,
  SmallCuffIcon,
  SmallCuffLockupIcon,
  NoOrders,
  NoPlayers,
  NoProducts,
  NoTeams,
  TickIcon,
  Warning,
  Info,
  LogoutIcon,
  DieCastIcon,
  MenuIcon,
  FootBall,
  BaseBall,
  BasketBall,
  Hockey,
  Soccer,
  SoftBall,
} from './icons'

export const iconNames = {
  add: AddIcon,
  avatar: AvatarIcon,
  close: CloseIcon,
  delete: DeleteIcon,
  home: HomeIcon,
  jordan: JordanIcon,
  nike: NikeIcon,
  nikeLarge: NikeLargeIcon,
  nikeLoading: NikeLoadingIcon,
  player: PlayerIcon,
  product: ProductIcon,
  search: SearchIcon,
  team: TeamIcon,
  logout: LogoutIcon,
  info: Info,
  tick: TickIcon,
  warn: Warning,
  menu: MenuIcon,

  topOfHand: TopOfHandIcon,
  palmOfHand: PalmOfHandIcon,
  leftInsideCuff: InsideCuffIcon,
  rightInsideCuff: InsideCuffIcon,

  middlePalm: MiddlePalmIcon,
  smallCuff: SmallCuffIcon,
  smallCuffLockup: SmallCuffLockupIcon,

  NoOrders: NoOrders,
  NoPlayers: NoPlayers,
  NoProducts: NoProducts,
  NoTeams: NoTeams,
  diecast: DieCastIcon,

  football: FootBall,
  'football-ncaa': FootBall,
  baseball: BaseBall,
  basketball: BasketBall,
  hockey: Hockey,
  soccer: Soccer,
  softball: SoftBall,
}

export type IconProps = {
  name: keyof typeof iconNames
}

export default function Icon({ name }: IconProps) {
  const IconComponent = iconNames[name]
  return <IconComponent />
}
