import React, { useState, useEffect, useContext } from 'react'
import { Link as NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from 'providers'
import { useGetSizes, useGetTeamsPlayer, useGetPositions } from 'api'
import { checkLogoLimit } from 'helpers'
import {
  InlineEdit,
  InlineEditText,
  Input,
  LogoCard,
  Select,
  Radio,
  Icon,
  ImageUploader,
  Button,
  Dialog,
  Toast,
  ArtworkCard,
} from 'components'

import {
  Container,
  DetailHeader,
  PlayerUrl,
  ContentSection,
  PlayerInfo,
  InlineEditForm,
  FormFieldM,
  LabelText,
  LogoSection,
  SectionHeader,
  LogosList,
  Title,
  Link,
  LogoListItem,
  IconContainer,
  ProfileName,
  DialogFooter,
  LogoInfo,
  ShowAllDesigns,
  ShowEquContainer,
  InputBox,
  ArtworkSection,
  CardList,
} from './player-detail-components'

type Props = {
  player: any
  updatePlayer: (e: any) => void
  addLogo: (e: any) => void
  updateLogo: (e: any, name?: String) => void
  addArtwork: (e: any) => void
  updateArtwork: (e: any) => void
  errorMessage: string
}

export default function PlayerDetail({
  player,
  updatePlayer,
  addLogo,
  updateLogo,
  addArtwork,
  updateArtwork,
  errorMessage,
}: Props) {
  const {
    _id,
    name,
    accessCode,
    brand,
    playerProfileLogo,
    size,
    teamId,
    number,
    description,
    position,
    logo: logos,
    artWork: artwork,
  } = player
  const {
    user: { sportId },
  } = useContext(UserContext)
  const { data } = useGetTeamsPlayer({ sportId: sportId })
  const sizes = useGetSizes()
  const positions = useGetPositions()
  const navigate = useNavigate()
  const { teams } = data.teams
  const [selectedLogo, setSelectedLogo] = useState({})
  const [showDeleteLogo, setShowDeleteLogo] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState({})
  const [showDeleteArtwork, setShowDeleteArtwork] = useState(false)
  const [playerName, setPlayerName] = useState(name)
  const [playerAccessCode, setAccessCode] = useState(accessCode)
  const [playerLogo, setPlayerLogo] = useState(playerProfileLogo)
  const [playerId, setPlayerId] = useState(_id)
  const [playerDescription, setPlayerDescription] = useState(description)
  const [playerNumber, setNumber] = useState(number)
  const [playerBrand, setBrand] = useState(brand)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [selectedTeam, setSelectedTeam] = useState(getSelected(teams, teamId))
  const [selectedSize, setSelectedSize] = useState(getSelected(sizes, size))
  const [selectedPosition, setSelectedPosition] = useState(
    getSelected(positions, position),
  )
  useEffect(() => {
    setTimeout(() => {
      setPlayerName(player.name)
      setAccessCode(player.accessCode)
      setPlayerId(player._id)
      setPlayerLogo(player.playerProfileLogo ? player.playerProfileLogo : '')
      setPlayerDescription(player.description)
      setNumber(player.number)
      setBrand(player.brand)
      setSelectedTeam(getSelected(teams, player.teamId))
      setSelectedSize(getSelected(sizes, player.size))
      setSelectedPosition(getSelected(positions, player.position))
      setShowToast(errorMessage ? true : false)
    }, 10)
  }, [player, teams, sizes, positions, errorMessage])

  function getSelected(data: any, value: any) {
    try {
      if (data && value) {
        let obj = data.find((o: any) => o.value === value)
        return obj
      }
      return {}
    } catch (error) {
      console.log(error)
    }
  }

  function updatePlayerName(e: any) {
    const playerName = e.target.value

    if (playerName) {
      const data = { _id: _id, name: playerName }
      setPlayerName(playerName)
      updatePlayer(data)
    }
  }

  function updateAccessCode(e: any) {
    const accessCode = e.target.value
    if (accessCode) {
      const data = { _id: _id, accessCode: accessCode }
      setAccessCode(accessCode)
      updatePlayer(data)
    }
  }

  function updateNumber(e: any) {
    const playerNumber = e.target.value

    if (playerNumber) {
      let number = parseInt(playerNumber)
      number = number < 0 ? 0 : number > 99 ? 99 : number
      const data = { _id: _id, number: number }
      setNumber(number)
      updatePlayer(data)
    }
  }
  function updatePlayerDescription(value: any) {
    if (value) {
      const data = { _id: _id, description: value }
      setPlayerDescription(value)
      updatePlayer(data)
    }
  }
  function updateSelected(val: any, type: any) {
    if (val) {
      let data: any = {}
      if (type === 'size') {
        setSelectedSize(val)
        data = { _id: _id, size: val.value }
      } else if (type === 'brand') {
        setBrand(val)
        data = { _id: _id, brand: val }
      } else if (type === 'position') {
        setSelectedPosition(val)
        data = { _id: _id, position: val.value }
      } else {
        setSelectedTeam(val)
        data = { _id: _id, teamId: val.value }
      }
      updatePlayer(data)
    }
  }
  function uploadProfile(e: any) {
    if (e) {
      const data = { _id: playerId, playerProfileLogo: e }
      updatePlayer(data)
    }
  }

  function deleteLogo(logo: any) {
    setShowDeleteLogo(true)
    setSelectedLogo(logo)
  }

  function confirmDeleteLogo(logo: any) {
    updateLogo({ ...logo, status: false })
    setShowDeleteLogo(false)
  }

  function deleteArtwork(artwork: any) {
    setShowDeleteArtwork(true)
    setSelectedArtwork(artwork)
  }

  function confirmDeleteArtwork(artwork: any) {
    updateArtwork({ ...artwork, status: false })
    setShowDeleteArtwork(false)
  }

  function showAllDesigns() {
    localStorage.setItem('selectedPlayer', playerId)
    localStorage.setItem('selectedTeam', player.teamId)
    navigate('/admin/orders')
  }

  return (
    <>
      <Toast
        message={errorMessage}
        showToast={showToast}
        type="warn"
        title="Athlete Access Code Error"
        onClose={() => setShowToast(false)}
      />
      <Container>
        {showDeleteLogo && (
          <Dialog title="Remove Logo" onClose={() => setShowDeleteLogo(false)}>
            <Dialog.Body>
              Are you sure, you want to remove this logo?
            </Dialog.Body>
            <Dialog.Footer>
              <DialogFooter>
                <Button variant="text" onClick={() => setShowDeleteLogo(false)}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => confirmDeleteLogo(selectedLogo)}>
                  Remove Logo
                </Button>
              </DialogFooter>
            </Dialog.Footer>
          </Dialog>
        )}
        {showDeleteArtwork && (
          <Dialog
            title="Remove Artwork"
            onClose={() => setShowDeleteArtwork(false)}>
            <Dialog.Body>
              Are you sure, you want to remove this artwork?
            </Dialog.Body>
            <Dialog.Footer>
              <DialogFooter>
                <Button
                  variant="text"
                  onClick={() => setShowDeleteArtwork(false)}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => confirmDeleteArtwork(selectedArtwork)}>
                  Remove Artwork
                </Button>
              </DialogFooter>
            </Dialog.Footer>
          </Dialog>
        )}
        <DetailHeader>
          {playerId && (
            <ImageUploader
              key={playerId}
              url={playerLogo}
              location="profile"
              onUpload={uploadProfile}
            />
          )}

          <ProfileName>
            <InlineEdit
              label="Player"
              value={playerName}
              placeholder="Enter Player Name"
              onChange={(e) => setPlayerName(e.target.value)}
              onBlur={updatePlayerName}
            />
            <ShowEquContainer>
              <PlayerUrl>
                <NavLink to={`/`} target="_blank">
                  Athlete Equipment View &gt;
                </NavLink>
              </PlayerUrl>
              <PlayerUrl>
                <ShowAllDesigns onClick={showAllDesigns}>
                  Show All Designs &gt;
                </ShowAllDesigns>
              </PlayerUrl>
            </ShowEquContainer>
          </ProfileName>
        </DetailHeader>

        <ContentSection>
          <PlayerInfo>
            <InputBox>
              <InlineEdit
                label="Access Code"
                value={playerAccessCode || ''}
                placeholder="Add Access Code"
                onChange={(e) => setAccessCode(e.target.value)}
                onBlur={updateAccessCode}
              />
            </InputBox>
            <InlineEditForm>
              <FormFieldM>
                <Select
                  label="Team"
                  options={teams}
                  name="team"
                  value={selectedTeam}
                  onChange={(val: any) => updateSelected(val, 'team')}
                />
              </FormFieldM>
              <FormFieldM>
                <Select
                  label="Position"
                  options={positions}
                  placeholder="Select Position"
                  name="position"
                  value={selectedPosition}
                  onChange={(val: any) => updateSelected(val, 'position')}
                />
              </FormFieldM>
            </InlineEditForm>
            <InlineEditForm>
              <FormFieldM>
                <Input
                  label="Number"
                  type="number"
                  value={playerNumber || ''}
                  onChange={(e) => setNumber(e.target.value)}
                  onBlur={updateNumber}
                />
              </FormFieldM>

              <FormFieldM>
                <Select
                  label="Size"
                  options={sizes}
                  name="size"
                  value={selectedSize}
                  onChange={(val: any) => updateSelected(val, 'size')}
                />
              </FormFieldM>
            </InlineEditForm>
            <LabelText>Brand</LabelText>

            <InlineEditForm>
              <Radio
                label="Brand"
                name="brand"
                checked={playerBrand === 'Nike'}
                onChange={(val: any) =>
                  updateSelected(val.target.value, 'brand')
                }
                value="Nike">
                <IconContainer>
                  <Icon name="nike" />
                </IconContainer>
                Nike
              </Radio>
              <Radio
                label="Brand"
                name="brand"
                checked={playerBrand === 'Jordan'}
                onChange={(val: any) =>
                  updateSelected(val.target.value, 'brand')
                }
                value="Jordan">
                <IconContainer>
                  <Icon name="jordan" />
                </IconContainer>
                Jordan
              </Radio>
            </InlineEditForm>
            <div className="player-description">
              <InlineEditForm>
                <InlineEditText
                  label="Description"
                  value={playerDescription || ''}
                  placeholder="Add Description"
                  onChange={(e) => setPlayerDescription(e.target.value)}
                  onBlur={(e) => updatePlayerDescription(e.target.value)}
                />
              </InlineEditForm>
            </div>
          </PlayerInfo>

          <LogoSection>
            <SectionHeader>
              <Title>Personal Logos</Title>
              {logos && checkLogoLimit(logos) && (
                <Link onClick={addLogo}>+ Add</Link>
              )}
            </SectionHeader>
            <LogoInfo>(Max file size is 5 mb)</LogoInfo>
            <LogosList>
              {logos &&
                logos.map((logo: any, index: number) => {
                  return (
                    logo.status &&
                    logo._id && (
                      <LogoListItem key={index + logo._id}>
                        <LogoCard
                          url={logo.logo}
                          onDelete={() => deleteLogo(logo)}
                          name={logo.name}
                          aiName={logo.aiName}
                          allowAi={true}
                          updateLogo={(url: String, fileName?: any) =>
                            updateLogo({ ...logo, logo: url }, fileName)
                          }
                          updateName={(name) =>
                            updateLogo({ ...logo, name: name })
                          }
                        />
                      </LogoListItem>
                    )
                  )
                })}
            </LogosList>
          </LogoSection>

          <ArtworkSection>
            <SectionHeader>
              <Title>Custom Artwork</Title>
              {logos && checkLogoLimit(logos) && (
                <Link onClick={addArtwork}>+ Add</Link>
              )}
            </SectionHeader>
            <LogoInfo>(Max file size is 5 mb)</LogoInfo>
            <CardList>
              {artwork &&
                artwork.map((artwork: any, index: number) => {
                  return (
                    artwork.status &&
                    artwork._id && (
                      <ArtworkCard
                        key={index + artwork._id}
                        name={artwork.name}
                        palmPattern={artwork.palmPattern}
                        bohPattern={artwork.bohPattern}
                        dieCastLeftPattern={artwork.dieCastLeftPattern}
                        dieCastRightPattern={artwork.dieCastRightPattern}
                        onUpdate={(data) =>
                          updateArtwork({ ...artwork, ...data })
                        }
                        onDelete={() => deleteArtwork(artwork)}
                      />
                    )
                  )
                })}
            </CardList>
          </ArtworkSection>
        </ContentSection>
      </Container>
    </>
  )
}
