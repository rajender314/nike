import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {
  useCreatePlayer,
  useGetTeamsPlayer,
  useGetSizes,
  useGetPositions,
  useLazyGetPlayers,
  useUpdatePlayer,
  useCreatePlayerLogo,
  useCreatePlayerArtwork,
} from 'api'
import { objectPath } from 'helpers'
import {
  Player as TPlayer,
  PlayerLogo as TLogo,
  PlayerArtwork as TPlayerArtwork,
} from 'types'

import {
  Button,
  Dialog,
  Input,
  Select,
  PlayerList,
  PlayerDetail,
  Radio,
  Icon,
  EmptyScreen,
} from 'components'

import {
  Container,
  ListContainer,
  DetailContainer,
  ListHeader,
  ListTitle,
  PlayerListContainer,
  InputContainer,
  DialogFooter,
  InputWraper,
  IconContainer,
  Error,
} from './players-components'
import { UserContext } from 'providers'

export default function Player() {
  const {
    user: { sportId },
  } = useContext(UserContext)
  const location = useLocation()
  const [createPlayer] = useCreatePlayer()
  const [createPlayerLogo] = useCreatePlayerLogo()
  const [createPlayerArtwork] = useCreatePlayerArtwork()
  const [updatePlayer] = useUpdatePlayer()
  const [formData, setFormData] = useState<any>({
    name: '',
    teamId: '',
    position: '',
    number: '',
    size: '',
    brand: 'Nike',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [fetching] = useState(false)
  const [currentPage] = useState(1)
  const [playerList, setPlayerList] = useState([])
  const [accessCodeError, setAccessCodeError] = useState<string>('')
  const { loading: dataLoading, data: teamsList } = useGetTeamsPlayer({
    sportId: sportId,
  })
  const sizes = useGetSizes()
  const positions = useGetPositions()

  const { loading, data } = useLazyGetPlayers()
  const playerObj = {
    _id: '',
    playerCode: '',
    name: '',
    teamId: '',
    size: '',
    number: 0,
    playerProfileLogo: '',
    brand: '',
    description: '',
    logo: [],
    artWork: [],
    position: '',
    accessCode: '',
  }
  const [selectedPlayer, setSelectedPlayer] = useState<TPlayer>(playerObj)

  useEffect(() => {
    if (currentPage === 1 && data && data.players && data.players.players) {
      setPlayerList(data.players.players)
    }
    // eslint-disable-next-line
  }, [data])

  function onAddPlayer() {
    setFormData({
      name: '',
      teamId: '',
      position: '',
      number: '',
      size: '',
      brand: 'Nike',
    })
    setIsSubmitted(false)
    setShowDialog(true)
  }

  function isFormValid() {
    return (
      formData.name &&
      formData.teamId &&
      formData.position &&
      formData.number &&
      formData.size
    )
  }

  function formatOrderPostData() {
    const postData: any = {}

    Object.keys(formData).forEach((key) => {
      postData[key] = objectPath(formData[key], ['value'], formData[key])
    })

    return postData
  }

  function createNewPlayer() {
    setIsSubmitted(true)
    if (!isFormValid()) {
      return
    }
    const playerData = { ...formatOrderPostData() }
    playerData.number = parseInt(playerData.number, 10)

    createPlayer({
      variables: { ...playerData, sportId: sportId },
    }).then(function (res: any) {
      const {
        data: { createPlayer },
      } = res

      setSelectedPlayer(createPlayer)
    })
    setShowDialog(false)
  }

  function handleChange(name: any, value: any) {
    formData[name] = value

    setFormData({ ...formData })
  }

  function updateFormPlayer(params: any) {
    updatePlayer({ variables: { ...params } }).then((res: any) => {
      const {
        createPlayer: { status = false, message = '', accessCode = '' },
      } = res.data
      if (status) {
        setAccessCodeError('')
      } else {
        setAccessCodeError(message)
        setTimeout(() => {
          setSelectedPlayer({ ...selectedPlayer, accessCode: accessCode })
        }, 50)
      }
    })
  }

  function addLogo() {
    const { _id, logo } = selectedPlayer
    const newLogo = {
      playerId: _id,
      name: '',
      logo: '',
      aiName: '',
      aiLogo: '',
      status: true,
    }

    createPlayerLogo({ variables: { ...newLogo } }).then((res: any) => {
      const {
        data: { createPlayerLogo },
      } = res
      setSelectedPlayer({
        ...selectedPlayer,
        logo: [...logo, createPlayerLogo],
      })
    })
  }

  function updateLogo(updatedLogo: TLogo, fileName?: String) {
    const { logo } = selectedPlayer
    if (fileName && fileName !== '') {
      updatedLogo['aiLogo'] = updatedLogo.logo
      updatedLogo['aiName'] = fileName
      updatedLogo['logo'] = ''
    }
    const updatedLogos = logo.map((logo: TLogo) => {
      if (logo._id === updatedLogo._id) {
        createPlayerLogo({ variables: { ...updatedLogo } }).then((res: any) => {
          console.log('updateLogo::', res)
        })
        return updatedLogo
      } else {
        return logo
      }
    })

    setSelectedPlayer({ ...selectedPlayer, logo: updatedLogos })
  }

  function addArtwork() {
    const { _id, artWork } = selectedPlayer
    const newArtwork = {
      playerId: _id,
      name: '',
      palmPattern: '',
      bohPattern: '',
      dieCastLeftPattern: '',
      dieCastRightPattern: '',
      status: true,
    }

    createPlayerArtwork({ variables: { ...newArtwork } }).then((res: any) => {
      const {
        data: { createPlayerArtWork },
      } = res
      setSelectedPlayer({
        ...selectedPlayer,
        artWork: [...artWork, createPlayerArtWork],
      })
    })
  }

  function updateArtwork(updatedArtwork: TPlayerArtwork) {
    const { artWork } = selectedPlayer

    createPlayerArtwork({ variables: { ...updatedArtwork } })

    const artworkList = artWork.map((item: TPlayerArtwork) => {
      if (item._id === updatedArtwork._id) {
        return updatedArtwork
      } else {
        return item
      }
    })

    setSelectedPlayer({ ...selectedPlayer, artWork: artworkList })
  }

  if (sportId === 'football-ncaa') {
    return <Navigate to="/admin/orders" state={{ from: location }} />
  }

  if ((dataLoading || loading) && !data) {
    return <Icon name="nikeLoading" />
  }

  if (!teamsList || !data) {
    return <div>Error loading players...</div>
  }

  const { teams } = teamsList.teams
  const { players } = data.players

  //for selecting the first player by default
  if (playerList.length && !selectedPlayer._id) {
    setTimeout(() => setSelectedPlayer(playerList[0]), 0)
  }

  function handleScroll(event: any) {
    var node = event.target
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight
    if (bottom && !fetching) {
      // getPlayers()
      console.log('BOTTOM REACHED:', bottom)
    }
  }

  const paneDidMount = (node: any) => {
    if (node) {
      node.addEventListener('scroll', handleScroll)
    }
  }

  function updateSelectedPlayer(data: any) {
    setAccessCodeError('')
    setTimeout(() => {
      setSelectedPlayer(data)
    }, 10)
  }
  return (
    <>
      {players && players.length === 0 ? (
        <EmptyScreen
          emptyLogo="NoPlayers"
          emptyText="Add Player"
          onChange={(e) => onAddPlayer()}
        />
      ) : (
        <Container>
          <ListContainer>
            <ListHeader>
              <ListTitle>Players</ListTitle>
              <Button width="150px" onClick={() => onAddPlayer()}>
                Add Player
              </Button>
            </ListHeader>

            <PlayerListContainer ref={paneDidMount}>
              <PlayerList
                players={players}
                selectedPlayer={selectedPlayer}
                onSelect={updateSelectedPlayer}
              />
            </PlayerListContainer>
          </ListContainer>

          <DetailContainer>
            {players && selectedPlayer && selectedPlayer._id && (
              <PlayerDetail
                player={selectedPlayer}
                updatePlayer={updateFormPlayer}
                addLogo={addLogo}
                updateLogo={updateLogo}
                addArtwork={addArtwork}
                updateArtwork={updateArtwork}
                errorMessage={accessCodeError}
              />
            )}
          </DetailContainer>
        </Container>
      )}
      {showDialog && (
        <Dialog title="Add Player" onClose={() => setShowDialog(false)}>
          <Dialog.Body>
            <form>
              <Input
                label="Player Name"
                placeholder="Enter Player Name"
                name="name"
                value={formData.name}
                onChange={(e: any) => handleChange('name', e.target.value)}
              />
              {isSubmitted && !formData.name && (
                <Error>Please Enter Player Name</Error>
              )}
              <InputContainer>
                <InputWraper>
                  <Select
                    label="Team"
                    options={teams}
                    placeholder="Select Team"
                    name="teamId"
                    value={formData.teamId}
                    onChange={(val: any) => handleChange('teamId', val)}
                  />
                  {isSubmitted && !formData.teamId && (
                    <Error>Please select Team</Error>
                  )}
                </InputWraper>
                <InputWraper>
                  <Select
                    label="Position"
                    options={positions}
                    placeholder="Select Position"
                    name="position"
                    value={formData.position}
                    onChange={(val: any) => handleChange('position', val)}
                  />
                  {isSubmitted && !formData.position && (
                    <Error>Please select Position</Error>
                  )}
                </InputWraper>
              </InputContainer>
              <InputContainer>
                <InputWraper>
                  <Input
                    label="Number"
                    placeholder="Enter Number"
                    name="number"
                    type="number"
                    value={formData.number}
                    onChange={(e: any) =>
                      handleChange('number', e.target.value)
                    }
                  />
                  {isSubmitted && !formData.number && (
                    <Error>Please enter Number</Error>
                  )}
                </InputWraper>
                <InputWraper>
                  <Select
                    label="Size"
                    options={sizes}
                    placeholder="Select Size"
                    name="size"
                    value={formData.size}
                    onChange={(val: any) => handleChange('size', val)}
                  />
                  {isSubmitted && !formData.size && (
                    <Error>Please select Size</Error>
                  )}
                </InputWraper>
              </InputContainer>
              <Radio
                label="Brand"
                name="brand"
                value="Nike"
                checked={formData.brand === 'Nike'}
                onChange={(e: any) => handleChange('brand', e.target.value)}>
                <IconContainer>
                  <Icon name="nike" />
                </IconContainer>
                Nike
              </Radio>
              <Radio
                label="Brand"
                name="brand"
                value="Jordan"
                checked={formData.brand === 'Jordan'}
                onChange={(e: any) => handleChange('brand', e.target.value)}>
                <IconContainer>
                  <Icon name="jordan" />
                </IconContainer>
                Jordan
              </Radio>
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <DialogFooter>
              <Button variant="text" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={createNewPlayer}>Add Player</Button>
            </DialogFooter>
          </Dialog.Footer>
        </Dialog>
      )}
    </>
  )
}
