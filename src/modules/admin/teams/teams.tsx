import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Team as TTeam,
  Logo as TLogo,
  Color as TColor,
  Artwork as TArtwork,
} from 'types'
import {
  useGetTeams,
  useCreateTeam,
  useUpdateTeamName,
  useCreateTeamLogo,
  useCreateTeamColor,
  useCreateTeamArtwork,
  useUpdateTeam,
} from 'api'
import {
  Button,
  Dialog,
  Input,
  TeamList,
  TeamDetail,
  EmptyScreen,
  Icon,
} from 'components'
import {
  Container,
  ListContainer,
  DetailContainer,
  ListHeader,
  ListTitle,
  DialogFooter,
  ErrorMsg,
} from './teams-components'
import { UserContext } from 'providers'

export default function Teams() {
  const {
    user: { sportId },
  } = useContext(UserContext)
  const { loading, data, error } = useGetTeams()
  const [createTeam] = useCreateTeam()
  const [updateTeam] = useUpdateTeam()
  const [updateTeamName] = useUpdateTeamName()
  const [createTeamLogo] = useCreateTeamLogo()
  const [createTeamColor] = useCreateTeamColor()
  const [createTeamArtwork] = useCreateTeamArtwork()

  const { register, handleSubmit, errors } = useForm()
  const [accessCodeError, setAccessCodeError] = useState<string>('')
  const [showDialog, setShowDialog] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<TTeam>({
    _id: '',
    name: '',
    accessCode: '',
    brand: 'Nike',
    logo: [],
    color: [],
    artWork: [],
  })

  useEffect(() => {
    if (data && data.teams && data.teams.teams.length && !selectedTeam._id) {
      setSelectedTeam(data.teams.teams[0])
    }
  }, [data])

  function createNewTeam(data: any) {
    createTeam({
      variables: { ...data, brand: 'Nike', sportId: sportId },
    }).then(function (res: any) {
      const {
        data: { createTeam },
      } = res

      setTimeout(() => setSelectedTeam(createTeam), 0)
    })
    setShowDialog(false)
  }

  function updateTeamForm(params: any) {
    updateTeam({ variables: { ...params } }).then((res: any) => {
      const {
        createTeam: {
          status = false,
          message = '',
          accessCode = '',
          brand = 'Nike',
        },
      } = res.data
      if (status) {
        setAccessCodeError('')
      } else {
        setAccessCodeError(message)
        setTimeout(() => {
          setSelectedTeam({ ...selectedTeam, accessCode, brand })
        }, 50)
      }
    })
  }

  function updateName(name: string) {
    if (name) {
      const { _id } = selectedTeam

      updateTeamName({ variables: { _id: _id, name: name } })
    }
  }

  function addLogo() {
    const { _id, logo } = selectedTeam
    const newLogo = {
      teamId: _id,
      name: '',
      logo: '',
      aiName: '',
      aiLogo: '',
      status: true,
    }

    createTeamLogo({ variables: newLogo }).then((res: any) => {
      const {
        data: { createTeamLogo },
      } = res
      setSelectedTeam({
        ...selectedTeam,
        logo: [...logo, createTeamLogo],
      })
    })
  }

  function updateLogo(updatedLogo: TLogo, name?: String) {
    const { logo } = selectedTeam
    if (name && name !== '') {
      updatedLogo['aiLogo'] = updatedLogo.logo
      updatedLogo['aiName'] = name
      updatedLogo['logo'] = ''
    }
    const updatedLogos = logo.map((logo: TLogo) => {
      if (logo._id === updatedLogo._id) {
        createTeamLogo({ variables: updatedLogo })
        return updatedLogo
      } else {
        return logo
      }
    })

    setSelectedTeam({ ...selectedTeam, logo: updatedLogos })
  }

  function addColor() {
    const { _id, color } = selectedTeam
    const newColor = {
      teamId: _id,
      name: 'Jet Black',
      code: '#222222',
      status: true,
    }

    createTeamColor({ variables: { ...newColor } }).then((res: any) => {
      const {
        data: { createTeamColor },
      } = res

      setSelectedTeam({
        ...selectedTeam,
        color: [...color, createTeamColor],
      })
    })
  }

  function updateColor(updatedColor: TColor) {
    const { color } = selectedTeam

    const updatedColors = color.map((color: TColor) => {
      if (color._id === updatedColor._id) {
        createTeamColor({ variables: { ...updatedColor } })
        return updatedColor
      } else {
        return color
      }
    })

    setSelectedTeam({ ...selectedTeam, color: updatedColors })
  }

  function addArtwork() {
    const { _id, artWork } = selectedTeam
    const newArtwork = {
      teamId: _id,
      name: '',
      palmPattern: '',
      bohPattern: '',
      dieCastLeftPattern: '',
      dieCastRightPattern: '',
      status: true,
    }
    console.log(artWork)
    createTeamArtwork({ variables: { ...newArtwork } }).then((res: any) => {
      const {
        data: { createTeamArtWork },
      } = res
      setSelectedTeam({
        ...selectedTeam,
        artWork: [...artWork, createTeamArtWork],
      })
    })
  }

  function updateArtwork(updatedArtwork: TArtwork) {
    const { artWork } = selectedTeam

    createTeamArtwork({ variables: { ...updatedArtwork } })

    const artworkList = artWork.map((item: TArtwork) => {
      if (item._id === updatedArtwork._id) {
        return updatedArtwork
      } else {
        return item
      }
    })

    setSelectedTeam({ ...selectedTeam, artWork: artworkList })
  }

  if (loading && !data) {
    return <Icon name="nikeLoading" />
  }
  if (error) {
    return <div>Teams Error</div>
  }
  const { teams } = data.teams

  return (
    <>
      {teams.length === 0 ? (
        <EmptyScreen
          emptyLogo="NoTeams"
          emptyText="Create Team"
          onChange={(e) => setShowDialog(true)}
        />
      ) : (
        <Container>
          <ListContainer>
            <ListHeader>
              <ListTitle>Teams</ListTitle>
              <Button width="150px" onClick={() => setShowDialog(true)}>
                Add Team
              </Button>
            </ListHeader>
            <TeamList
              teams={teams}
              selectedTeam={selectedTeam}
              onSelect={setSelectedTeam}
            />
          </ListContainer>

          <DetailContainer>
            {selectedTeam && selectedTeam._id && (
              <TeamDetail
                team={selectedTeam}
                updateName={updateName}
                updateTeam={updateTeamForm}
                addLogo={addLogo}
                updateLogo={updateLogo}
                addColor={addColor}
                updateColor={updateColor}
                addArtwork={addArtwork}
                updateArtwork={updateArtwork}
                errorMessage={accessCodeError}
              />
            )}
          </DetailContainer>
        </Container>
      )}
      {showDialog && (
        <Dialog title="Add Team" onClose={() => setShowDialog(false)}>
          <Dialog.Body>
            <form onSubmit={handleSubmit(createNewTeam)}>
              <Input
                label="Team Name"
                placeholder="Enter Team Name"
                name="name"
                ref={register({ required: true })}
              />
              {errors.name && errors.name.type === 'required' && (
                <ErrorMsg>Please enter Team Name</ErrorMsg>
              )}
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <DialogFooter>
              <Button variant="text" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit(createNewTeam)}>Add Team</Button>
            </DialogFooter>
          </Dialog.Footer>
        </Dialog>
      )}
    </>
  )
}
