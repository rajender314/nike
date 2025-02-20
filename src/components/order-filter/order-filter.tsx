import React, { useState, useEffect, useContext } from 'react'
import TooltipTrigger from 'react-popper-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  getOrdersDropdown,
  useGetTeams,
  useGetPlayers,
  useGetProducts,
} from 'api'
import { UserContext } from 'providers'
import { objectPath, selectDataFormat } from 'helpers'
import { Button, Checkbox } from 'components'
import {
  FilterToolTipBody,
  FilterTopContainer,
  FilterText,
  ClearText,
  FilterFooter,
  FilterBody,
  FilterLeftContainer,
  FilterRightContainer,
  FilterKeyText,
  ContentBox,
  FilterValueContainer,
  ButtonContainer,
  FilterToolTipContainer,
  FilterToolTipArrow,
  FilterContainer,
  FilterIconText,
  SelectedFilters,
} from './order-filter-components'

type filterProps = {
  status: string[]
  size: string[]
  season: string[]
  gloveType: string[]
  team: string[]
  player: string[]
}

type ListProps = [
  {
    value: string
    label: string
    team_id?: string
  },
]

type Props = {
  applyFilters: (filters: filterProps) => void
  resetFilters: (filters: filterProps) => void
  selectedTeamArray: string[]
  selectedPlayerArray: string[]
}

export default function OrderFilter({
  resetFilters,
  applyFilters,
  selectedTeamArray,
  selectedPlayerArray,
}: Props) {
  const {
    user: { sportId },
  } = useContext(UserContext)
  const filterText = [
    'Glove Type',
    'Team',
    'Player',
    'Season',
    'Size',
    'Status',
  ]

  const TeamsList = useGetTeams()
  const PlayersList = useGetPlayers()
  const { loading: productsLoading, data: productData } = useGetProducts({
    sportId: sportId,
  })
  const { gloveSizes, seasons, orderStatus } = getOrdersDropdown()
  const productList = objectPath(productData, ['products', 'products'], [])
  const productSelectList = selectDataFormat(productList, '_id', 'name')
  const [selectedFilter, setSeletedFilter] = useState<string>('Glove Type')
  const [showToolTip, setShowToolTip] = useState<boolean>(false)
  const [filters, setFilters] = useState<filterProps>({
    status: [],
    size: [],
    season: [],
    gloveType: [],
    team: selectedTeamArray,
    player: selectedPlayerArray,
  })
  const [teamsInitialized, setTeamsInitialized] = useState(false)
  const [playersInitialized, setPlayersInitialized] = useState(false)
  const [teams, setTeams] = useState<ListProps>([
    {
      value: '',
      label: '',
    },
  ])
  const [players, setPlayers] = useState<ListProps>([
    {
      value: '',
      label: '',
    },
  ])
  const [filterPlayers, setFilterPlayers] = useState<ListProps>([
    {
      value: '',
      label: '',
    },
  ])

  useEffect(() => {
    if (TeamsList.data && !teamsInitialized) {
      let TeamsArray = []
      const { teams = {} } = TeamsList.data
      const { teams: teamsList = [] } = teams
      TeamsArray = teamsList.map((team: any) => {
        return {
          value: team._id,
          label: team.name,
        }
      })
      setTeamsInitialized(true)
      setTeams(TeamsArray)
    }
    if (PlayersList.data && !playersInitialized) {
      let playersArray: any = []
      const { players = {} } = PlayersList.data
      const { players: playersList = [] } = players
      playersArray = playersList.map((player: any) => {
        return {
          value: player._id,
          label: player.name,
          team_id: player.team.length && player.team[0]._id,
        }
      })
      setPlayersInitialized(true)
      setPlayers(playersArray)
      setFilterPlayers(playersArray)
      getselectedPlayerList(playersArray)
    }
    return () => {
      localStorage.removeItem('selectedTeam')
      localStorage.removeItem('selectedPlayer')
    }
    // eslint-disable-next-line
  }, [TeamsList, PlayersList, productsLoading])

  function getselectedPlayerList(playersArray: any) {
    let sortedArray: any = []
    selectedTeamArray.forEach((element) => {
      sortedArray = sortedArray.concat(
        playersArray.filter((player: any) => player.team_id === element),
      )
      setPlayers(sortedArray)
    })
  }

  function onClearFilters() {
    const clearFilters = {
      status: [],
      size: [],
      season: [],
      gloveType: [],
      team: [],
      player: [],
    }
    setShowToolTip(false)
    setFilters(clearFilters)
    resetFilters(clearFilters)
  }

  function onApplyFilters() {
    setShowToolTip(false)
    applyFilters(filters)
  }

  function handleStatusFilter(event: any) {
    const value: string = event.target.value
    let { status = [] } = filters
    const statusArray = status ? status : []
    const findIndex = statusArray.indexOf(value)
    if (findIndex === -1) {
      statusArray.push(value)
    } else {
      statusArray.splice(findIndex, 1)
    }
    status = statusArray
    setFilters({ ...filters, status: status })
  }

  function handleSizeFilter(event: any) {
    const value: string = event.target.value
    let { size = [] } = filters
    const sizesArray = size ? size : []
    const findIndex = sizesArray.indexOf(value)
    if (findIndex === -1) {
      sizesArray.push(value)
    } else {
      sizesArray.splice(findIndex, 1)
    }
    size = sizesArray
    setFilters({ ...filters, size: size })
  }

  function handleSeasonFilter(event: any) {
    const value: string = event.target.value
    let { season = [] } = filters
    const seasonArray = season ? season : []
    const findIndex = seasonArray.indexOf(value)
    if (findIndex === -1) {
      seasonArray.push(value)
    } else {
      seasonArray.splice(findIndex, 1)
    }
    season = seasonArray
    setFilters({ ...filters, season: season })
  }

  function handleTypeFilter(event: any) {
    const value: string = event.target.value
    let { gloveType = [] } = filters
    const typeArray = gloveType ? gloveType : []
    const findIndex = typeArray.indexOf(value)
    if (findIndex === -1) {
      typeArray.push(value)
    } else {
      typeArray.splice(findIndex, 1)
    }
    gloveType = typeArray
    setFilters({ ...filters, gloveType: gloveType })
  }

  function handlePlayerFilter(event: any) {
    const value: string = event.target.value
    let { player = [] } = filters
    const playerArray = player ? player : []
    const findIndex = playerArray.indexOf(value)
    if (findIndex === -1) {
      playerArray.push(value)
    } else {
      playerArray.splice(findIndex, 1)
    }
    player = playerArray
    setFilters({ ...filters, player: player })
  }

  function handleTeamFilter(event: any) {
    const value: string = event.target.value
    let { team = [] } = filters
    const teamArray = team ? team : []
    const findIndex = teamArray.indexOf(value)
    if (findIndex === -1) {
      teamArray.push(value)
    } else {
      teamArray.splice(findIndex, 1)
    }
    team = teamArray
    let sortedArray: any = []

    team.forEach((element) => {
      sortedArray = sortedArray.concat(
        filterPlayers.filter((player) => player.team_id === element),
      )
      setPlayers(sortedArray)
    })
    setFilters({ ...filters, team: team })
  }

  function getFilterIcon({ getTriggerProps, triggerRef }: any) {
    return (
      <div
        {...getTriggerProps({
          ref: triggerRef,
          className: 'trigger',
          style: {
            cursor: 'pointer',
          },
        })}>
        <FilterContainer>
          <FilterIconText onClick={() => setShowToolTip(!showToolTip)}>
            Filters
          </FilterIconText>
          <FontAwesomeIcon
            className="nike-icon icon-plus"
            icon={faFilter}
            size="lg"
            onClick={() => setShowToolTip(!showToolTip)}
          />
        </FilterContainer>
      </div>
    )
  }
  const selectedFiltersLength = (text: string) => {
    let selectedFilterLength: any = 0
    const {
      status = [],
      size = [],
      season = [],
      gloveType = [],
      team = [],
      player = [],
    } = filters
    if (text) {
      switch (text) {
        case 'Season':
          selectedFilterLength =
            season && season.length ? `(${season.length} selected)` : null
          break
        case 'Size':
          selectedFilterLength =
            size && size.length ? `(${size.length} selected)` : null
          break
        case 'Status':
          selectedFilterLength =
            status && status.length ? `(${status.length} selected)` : null
          break
        case 'Glove Type':
          selectedFilterLength =
            gloveType && gloveType.length
              ? `(${gloveType.length} selected)`
              : null
          break
        case 'Team':
          selectedFilterLength =
            team && team.length ? `(${team.length} selected)` : null
          break
        case 'Player':
          selectedFilterLength =
            player && player.length ? `(${player.length} selected)` : null
          break
        default:
          selectedFilterLength = null
      }
    }
    return selectedFilterLength
  }

  const getFilterData = ({
    getTooltipProps,
    getArrowProps,
    tooltipRef,
    arrowRef,
    placement,
  }: any) => {
    return (
      <FilterToolTipContainer
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
        })}>
        <FilterToolTipArrow
          {...getArrowProps({
            ref: arrowRef,
            'data-placement': placement,
            className: 'tooltip-arrow',
          })}
        />
        <FilterToolTipBody className="tooltip-body">
          <FilterTopContainer>
            <FilterText>Filter</FilterText>
            <FontAwesomeIcon
              className="nike-icon icon-plus"
              icon={faTimes}
              size="lg"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowToolTip(false)}
            />
          </FilterTopContainer>
          <FilterBody>
            <FilterLeftContainer>
              {filterText.map((text, i) => {
                return (
                  <ContentBox
                    key={`${i}`}
                    onClick={() => {
                      setSeletedFilter(text)
                    }}
                    active={selectedFilter === text}>
                    <FilterKeyText>{`${text}`}</FilterKeyText>
                    <SelectedFilters>
                      {selectedFiltersLength(text)}
                    </SelectedFilters>
                  </ContentBox>
                )
              })}
            </FilterLeftContainer>
            <FilterRightContainer>
              <FilterValueContainer>
                {selectedFilter === 'Season' &&
                  seasons.map((season, i) => {
                    return (
                      <div key={i}>
                        <Checkbox
                          label={`${season.label}`}
                          size="small"
                          value={`${season.value}`}
                          checked={filters.season.includes(season.value)}
                          onChange={handleSeasonFilter}
                        />
                      </div>
                    )
                  })}
                {selectedFilter === 'Size' &&
                  gloveSizes.map((size, i) => {
                    return (
                      <div key={i}>
                        <Checkbox
                          label={`${size.label}`}
                          size="small"
                          value={`${size.value}`}
                          checked={filters.size.includes(size.value)}
                          onChange={handleSizeFilter}
                        />
                      </div>
                    )
                  })}
                {selectedFilter === 'Status' &&
                  orderStatus.map((status, i) => {
                    return (
                      <div key={i}>
                        <Checkbox
                          label={`${status.label}`}
                          size="small"
                          value={`${status.value}`}
                          checked={filters.status.includes(status.value)}
                          onChange={handleStatusFilter}
                        />
                      </div>
                    )
                  })}
                {selectedFilter === 'Glove Type' &&
                  productSelectList.map((type, i) => {
                    return (
                      <div key={i}>
                        <Checkbox
                          label={`${type.label}`}
                          size="small"
                          value={`${type.value}`}
                          checked={filters.gloveType.includes(type.value)}
                          onChange={handleTypeFilter}
                        />
                      </div>
                    )
                  })}
                {selectedFilter === 'Team' && teams.length
                  ? teams.map((team, i) => {
                      return (
                        <div key={i}>
                          <Checkbox
                            label={`${team.label}`}
                            size="small"
                            value={`${team.value}`}
                            checked={filters.team.includes(team.value)}
                            onChange={handleTeamFilter}
                          />
                        </div>
                      )
                    })
                  : null}
                {selectedFilter === 'Player' ? (
                  filters.team.length ? (
                    players.map((player, i) => {
                      return (
                        <div key={i}>
                          <Checkbox
                            label={`${player.label}`}
                            size="small"
                            value={`${player.value}`}
                            checked={filters.player.includes(player.value)}
                            onChange={handlePlayerFilter}
                          />
                        </div>
                      )
                    })
                  ) : (
                    <FilterKeyText>Please select team.</FilterKeyText>
                  )
                ) : null}
              </FilterValueContainer>
            </FilterRightContainer>
          </FilterBody>
          <FilterFooter>
            <ClearText onClick={onClearFilters}>Clear</ClearText>
            <ButtonContainer>
              <Button
                width="100%"
                variant="primary"
                size="medium"
                onClick={onApplyFilters}>
                Apply
              </Button>
            </ButtonContainer>
          </FilterFooter>
        </FilterToolTipBody>
      </FilterToolTipContainer>
    )
  }

  return (
    <TooltipTrigger
      placement="bottom"
      trigger="click"
      tooltipShown={showToolTip}
      tooltip={(e) => getFilterData(e)}>
      {(e) => getFilterIcon(e)}
    </TooltipTrigger>
  )
}
