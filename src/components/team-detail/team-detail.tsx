import React, { useState, useEffect, useContext } from 'react'
import { Link as NavLink, useNavigate } from 'react-router-dom'
import {
  InlineEdit,
  Radio,
  LogoCard,
  ColorCard,
  Dialog,
  Button,
  ArtworkCard,
  Toast,
  Icon,
} from 'components'
import { checkLogoLimit } from 'helpers'
import {
  Container,
  Header,
  TeamInfo,
  LabelText,
  InlineEditForm,
  InputBox,
  IconContainer,
  LogoSection,
  ColorSection,
  SectionHeader,
  LogosList,
  ColorsList,
  Title,
  Link,
  LogoListItem,
  ColorListItem,
  LogoCardBorder,
  ContentSection,
  DialogFooter,
  LogoInfo,
  ShowEqContainer,
  TeamUrl,
  ArtworkSection,
  CardList,
} from './team-detail-components'
import { UserContext } from 'providers'

type Props = {
  team: any
  updateName: (e: any) => void
  updateTeam: (e: any) => void
  addLogo: (e: any) => void
  updateLogo: (e: any, name?: String) => void
  addColor: (e: any) => void
  updateColor: (e: any) => void
  addArtwork: (e: any) => void
  updateArtwork: (e: any) => void
  errorMessage: string
}

export default function TeamDetail({
  team,
  updateName,
  updateTeam,
  addLogo,
  updateLogo,
  addColor,
  updateColor,
  addArtwork,
  updateArtwork,
  errorMessage,
}: Props) {
  const {
    user: { sportId },
  } = useContext(UserContext)
  const {
    _id: teamId,
    name,
    accessCode,
    brand,
    logo: logos,
    color: colors,
    artWork: artwork,
  } = team
  const navigate = useNavigate()
  const [teamName, setTeamName] = useState(name)
  const [teamAccessCode, setAccessCode] = useState(accessCode)
  const [teamBrand, setBrand] = useState(brand)
  const [showToast, setShowToast] = useState<boolean>(!!errorMessage)
  const [showDelete, setShowDelete] = useState(false)
  const [logoToDelete, setLogoToDelete] = useState({})
  const [showDeleteColor, setShowDeleteColor] = useState(false)
  const [colorToDelete, setColorToDelete] = useState({})
  const [showDeleteArtwork, setShowDeleteArtwork] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState({})

  useEffect(() => {
    setTeamName(name)
    setAccessCode(accessCode)
    setBrand(brand)
    setShowToast(errorMessage ? true : false)
  }, [teamId, team])

  function updateAccessCode(e: any) {
    const accessCode = e.target.value
    if (accessCode) {
      const data = { _id: teamId, accessCode: accessCode }
      setAccessCode(accessCode)
      updateTeam(data)
    }
  }

  function updateSelected(val: any, type: any) {
    if (val) {
      setBrand(val)
      updateTeam({ _id: teamId, brand: val })
    }
  }

  function deleteLogo(logo: any) {
    setShowDelete(true)
    setLogoToDelete(logo)
  }

  function deleteColor(color: any) {
    setShowDeleteColor(true)
    setColorToDelete(color)
  }

  function deleteUpdateLogo(logo: any) {
    updateLogo({ ...logo, status: false })
    setShowDelete(false)
  }

  function deleteUpdateColor(color: any) {
    updateColor({ ...color, status: false })
    setShowDeleteColor(false)
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
    localStorage.setItem('selectedTeam', teamId)
    navigate('/admin/orders')
  }

  return (
    <>
      <Toast
        message={errorMessage}
        showToast={showToast}
        type="warn"
        title="Team Access Code Error"
        onClose={() => setShowToast(false)}
      />

      <Container>
        {showDelete && (
          <Dialog title="Remove Logo" onClose={() => setShowDelete(false)}>
            <Dialog.Body>
              Are you sure, you want to remove this logo?
            </Dialog.Body>
            <Dialog.Footer>
              <DialogFooter>
                <Button variant="text" onClick={() => setShowDelete(false)}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => deleteUpdateLogo(logoToDelete)}>
                  Remove Logo
                </Button>
              </DialogFooter>
            </Dialog.Footer>
          </Dialog>
        )}

        {showDeleteColor && (
          <Dialog
            title="Remove Color"
            onClose={() => setShowDeleteColor(false)}>
            <Dialog.Body>
              Are you sure, you want to remove this Color?
            </Dialog.Body>
            <Dialog.Footer>
              <DialogFooter>
                <Button
                  variant="text"
                  onClick={() => setShowDeleteColor(false)}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => deleteUpdateColor(colorToDelete)}>
                  Remove Color
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
        <Header>
          <InlineEdit
            size="large"
            label="TEAM"
            placeholder="Enter Team Name"
            value={teamName || ''}
            onChange={(e) => setTeamName(e.target.value)}
            onBlur={(e) => updateName(teamName)}
          />
          <ShowEqContainer>
            {sportId === 'football-ncaa' && (
              <TeamUrl>
                <NavLink to={`/`} target="_blank">
                  Team Equipment View &gt;
                </NavLink>
              </TeamUrl>
            )}
            <TeamUrl>
              <a onClick={showAllDesigns}>Show All Designs {'>'}</a>
            </TeamUrl>
          </ShowEqContainer>
        </Header>

        <ContentSection>
          {sportId === 'football-ncaa' && (
            <TeamInfo>
              <InputBox>
                <InlineEdit
                  label="Access Code"
                  value={teamAccessCode || ''}
                  placeholder="Add Access Code"
                  onChange={(e) => setAccessCode(e.target.value)}
                  onBlur={updateAccessCode}
                />
              </InputBox>

              <LabelText>Brand</LabelText>

              <InlineEditForm>
                <Radio
                  label="Brand"
                  name="brand"
                  checked={teamBrand === 'Nike'}
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
                  checked={teamBrand === 'Jordan'}
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
            </TeamInfo>
          )}

          <LogoSection>
            <SectionHeader>
              <Title>Logos</Title>
              {logos && checkLogoLimit(logos) && (
                <Link onClick={addLogo}>+ Add</Link>
              )}
            </SectionHeader>
            <LogoInfo>(Max file size is 5 mb)</LogoInfo>
            <LogosList>
              {logos.map((logo: any, index: number) => {
                // console.log(logo)
                if (!logo.status || !logo._id) {
                  return <div key={index + logo._id}></div>
                }
                return (
                  <LogoListItem key={index + logo._id}>
                    <LogoCard
                      url={logo.logo}
                      name={logo.name}
                      aiName={logo.aiName}
                      allowAi={true}
                      onDelete={() => deleteLogo(logo)}
                      updateLogo={(url: String, name?: any) =>
                        updateLogo({ ...logo, logo: url }, name)
                      }
                      updateName={(name) => updateLogo({ ...logo, name: name })}
                    />
                    <LogoCardBorder />
                  </LogoListItem>
                )
              })}
            </LogosList>
          </LogoSection>

          <ColorSection>
            <SectionHeader>
              <Title>Colors</Title>
              {colors && checkLogoLimit(colors) && (
                <Link onClick={addColor}>+ Add</Link>
              )}
            </SectionHeader>
            <ColorsList>
              {colors.map((color: any, index: number) => {
                if (!color.status || !color._id) {
                  return <div key={index + color._id}></div>
                }
                return (
                  <ColorListItem key={index + color._id}>
                    <ColorCard
                      {...color}
                      onDelete={() => deleteColor(color)}
                      onChange={(data) => updateColor({ ...color, ...data })}
                    />
                  </ColorListItem>
                )
              })}
            </ColorsList>
          </ColorSection>

          {sportId === 'football-ncaa' && (
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
          )}
        </ContentSection>
      </Container>
    </>
  )
}
