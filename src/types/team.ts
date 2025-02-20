export type Team = {
  _id: string
  name: string
  accessCode: string
  brand: string
  logo: Logo[]
  color: Color[]
  artWork: Artwork[]
}

export type Logo = {
  _id?: string
  teamId: string
  name: string
  logo: string
  aiName: String
  aiLogo: String
}

export type Color = {
  _id?: string
  teamId: string
  name: string
  code: string
}

export type Artwork = {
  _id?: string
  playerId: string
  name: string
  palmPattern: string
  bohPattern: string
  dieCastLeftPattern: string
  dieCastRightPattern: string
  status: boolean
}
