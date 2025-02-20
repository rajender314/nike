import { iconNames } from 'components/icon/icon'

export type ProductFootball = 'VJ6' | 'VJ7' | 'SB6' | 'VK4'
export type ProductBaseball = 'MLB' | 'SP21'

export type Product = ProductFootball | ProductBaseball

export type FootballGloveView =
  | 'top'
  | 'palm'
  | 'leftCuff'
  | 'rightCuff'
  | 'dieCast'
  | 'smallDieCast'
export type BaseballGloveView = 'side' | 'back' | 'top' | 'palm'
export type ChestProtectorView = 'front' | 'back'

export type DesignerView =
  | FootballGloveView
  | BaseballGloveView
  | ChestProtectorView

export type ViewType = {
  id: 'palm' | 'top' | 'leftCuff' | 'rightCuff' | 'dieCast' | 'smallDieCast'
  name: string
  iconName: keyof typeof iconNames
  productAssets: any
  productItems: any[]
  reRender: number
  width?: string
  height?: string
  prefix?: string
  styleName?: string
}

export type TabType = {
  id: number
  name: string
  prefix: string
  iconName: any
  views: ViewType[]
  styleProps?: any[]
}

export type Asset = {
  src: string
  x: number
  y: number
  itemId?: number
  parentId?: number
  overlay?: boolean
  brand?: 'Nike' | 'Jordan'
  position?: 'Right' | 'Left'
  globalComposition?: string
  blendMode?: string
  primary?: boolean
  secondary?: boolean
  tertiary?: boolean
}
