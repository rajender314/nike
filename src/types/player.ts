export type Player = {
  _id: string
  name: string
  teamId: string
  size: string
  number: number
  playerCode: string
  playerProfileLogo: string
  brand: string
  description: string
  position: string
  accessCode: string
  logo: PlayerLogo[]
  artWork: PlayerArtwork[]
}
export type PlayerLogo = {
  _id?: string
  playerId: string
  name: string
  logo: string
  aiLogo: String
  aiName: String
  status: boolean
}

export type PlayerArtwork = {
  _id?: string
  playerId: string
  name: string
  palmPattern: string
  bohPattern: string
  dieCastLeftPattern: string
  dieCastRightPattern: string
  status: boolean
}
