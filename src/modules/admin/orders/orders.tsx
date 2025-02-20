import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { objectPath, getShortName } from 'helpers'
import { useGetOrders, useGetOrderCount, getOrderStatusColors } from 'api'
import CountUp from 'react-countup'
import { useNavigate } from 'react-router-dom'
import TooltipTrigger from 'react-popper-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import {
  Container,
  AgContainer,
  FilterHeader,
  StatsHeader,
  StatsBox,
  OrderStatsText,
  OrdersCount,
  Title,
  Header,
  Actions,
  FiltersContainer,
  PlayerCell,
  Avatar,
  PlayerContainer,
  PlayerName,
  PlayerDescription,
  OrderStatus,
  ProductContainer,
  ProductName,
  ImageContainer,
  NoData,
  NoDataText,
  ToolTipContainer,
  ToolTipArrow,
  ToolTipBody,
  StatusContainer,
  StatusRow,
  StatusLabel,
  StatusCount,
  FilterBox,
} from './orders-components'
import { EmptyScreen, SearchInput, Icon, OrderFilter } from 'components'
import { UserContext } from 'providers'

const orderStatusCounts = [
  { code: 0, label: 'Total Designs' },
  {
    code: 3,
  },
  { code: 5 },
  { code: 9 },
]

type filterProps = {
  status: string[]
  size: string[]
  season: string[]
  gloveType: string[]
  team: string[]
  player: string[]
}

export default function Orders() {
  const {
    user: { sportId },
  } = useContext(UserContext)
  const selectedTeam = localStorage.getItem('selectedTeam')
  const selectedPlayer = localStorage.getItem('selectedPlayer')
  let selectedTeamList: string[] = selectedTeam ? [selectedTeam] : []
  let selectedPlayerList: string[] = selectedPlayer ? [selectedPlayer] : []
  const [orders, setOrders] = useState<any[]>([])
  const [searchText, setSearchText] = useState(null)
  const [, setStatusText] = useState('')
  const statusColors = getOrderStatusColors()
  const [statusCounts, setStatusCounts] = useState<any[]>(orderStatusCounts)
  const [applyFilter, setAppliedFilter] = useState<filterProps>({
    status: [],
    size: [],
    season: [],
    gloveType: [],
    team: selectedTeamList,
    player: selectedPlayerList,
  })

  const navigate = useNavigate()
  const { loading, data: ordersData } = useGetOrders({
    page: 1,
    search: searchText || '',
    limit: 50,
    filter: applyFilter,
    sportId: sportId,
  })
  const { loading: countLoading, data: statusData } = useGetOrderCount()
  const ordersList = objectPath(ordersData, ['orders', 'orders'], [])
  const statusList = objectPath(
    statusData,
    ['orderStatus', 'OrderStatusList'],
    [],
  )

  useEffect(() => {
    if (statusList.length) {
      updateStatusLabels()
    }
  }, [statusList])

  useEffect(() => {
    if (ordersList.length) {
      setOrders(ordersList)
    }
  }, [ordersList])

  const columnDefs: any[] = []

  if (sportId === 'football-ncaa') {
    columnDefs.push({
      headerName: 'Team',
      field: 'teamName',
      sortable: true,
      resizable: true,
      width: 250,
    })
  } else {
    columnDefs.push({
      headerName: 'Player',
      field: 'playerId',
      sortable: true,
      resizable: true,
      width: 250,
      cellRendererFramework: PlayerCustomCell,
    })
  }

  columnDefs.push(
    {
      headerName: 'Season',
      width: 80,
      sortable: true,
      resizable: true,
      field: 'season',
    },
    {
      headerName: 'Style',
      sortable: true,
      resizable: true,
      width: 80,
      cellRendererFramework: ProductCustomCell,
      field: 'productType',
    },
  )

  if (sportId !== 'football-ncaa') {
    columnDefs.push({
      headerName: 'Size',
      width: 80,
      sortable: true,
      resizable: true,
      field: 'gloveSize',
    })
  }

  columnDefs.push(
    {
      headerName: 'Colorway',
      sortable: true,
      width: 200,
      resizable: true,
      field: 'productItems',
      cellRendererFramework: ColorWayCustomCell,
    },
    {
      headerName: 'Last Modified',
      sortable: true,
      width: 150,
      resizable: true,
      field: 'updatedAt',
      cellRendererFramework: LastModifiedCustomCell,
    },
    {
      headerName: 'Status',
      sortable: true,
      resizable: true,
      width: 180,
      cellRendererFramework: StatusCustomCell,
      field: 'orderStatus',
    },
  )

  function updateStatusLabels() {
    orderStatusCounts.forEach((status: any) => {
      if (status.code !== 0) {
        status.label = statusList.find(
          (statusObj: any) => statusObj.code === status.code,
        ).name
      }
    })

    setStatusCounts([...orderStatusCounts])
  }

  function PlayerCustomCell(ev: any) {
    if (ev && ev.data && ev.data.player && ev.data.player.name) {
      return (
        <PlayerCell>
          {ev.data.player.playerProfileLogo ? (
            <Avatar>
              <ImageContainer src={ev.data.player.playerProfileLogo} />
            </Avatar>
          ) : (
            <Avatar>{getShortName(ev.data.player.name)}</Avatar>
          )}

          <PlayerContainer>
            <PlayerName>{ev.data.player.name}</PlayerName>
            <PlayerDescription>{ev.data.teamName}</PlayerDescription>
          </PlayerContainer>
        </PlayerCell>
      )
    }
    return '--'
  }

  function getStatusCount(id: any) {
    if (!statusList.length) return 0
    if (id === 0) {
      return (ordersData && ordersData.orders.count) || 0
    } else {
      return _.find(statusList, { code: id }).orderCount
    }
  }

  function ProductCustomCell(ev: any) {
    if (ev && ev.data && ev.data.product && ev.data.product.name) {
      return (
        <PlayerCell>
          {/* {ev.data.product.productProfileLogo ? (
            <ProductAvatar>
              <ImageContainer src={ev.data.product.productProfileLogo} />
            </ProductAvatar>
          ) : (
            <ProductAvatar>{getShortName(ev.data.product.name)}</ProductAvatar>
          )} */}

          <ProductContainer>
            <ProductName>{ev.data.product.name}</ProductName>
          </ProductContainer>
        </PlayerCell>
      )
    }
    return '--'
  }

  function LastModifiedCustomCell(ev: any) {
    return (
      <div className="modified-date">
        {ev.value && moment(ev.value).format('MMM Do, YYYY')}
      </div>
    )
  }

  function ColorWayCustomCell(ev: any) {
    let productItems = ev.value

    function getSelectedColor(data: any) {
      let obj = data.find((option: any) => !!option.selected) || {}
      return obj.publicName || obj.name || '--'
    }
    function pickColorByComponentId(id: any) {
      let data = productItems.find((item: any) => item.itemType === id)
      let sB6Data = productItems.find(
        (item: any) => item.itemType === id && item.itemId === 102,
      )
      if (!data) {
        return '--'
      }
      if (id === 'swoosh' || id === 'palm') {
        let primaryColor = getSelectedColor(data.primaryColors)
        if (primaryColor !== '--') {
          return primaryColor
        } else {
          return data.primaryColors && data.primaryColors[0]
            ? data.primaryColors[0].publicName || data.primaryColors[0].name
            : '--'
        }
      } else {
        if (ev.data.product.name !== 'SB6') {
          return getSelectedColor([...data.options, ...data.optionalColors])
        } else {
          return getSelectedColor([
            ...sB6Data.options,
            ...sB6Data.optionalColors,
          ])
        }
      }
    }
    let palmColor = pickColorByComponentId('palm')
    let swooshColor = pickColorByComponentId('swoosh')
    let bohColor = pickColorByComponentId('color')

    return <div>{`${bohColor} / ${palmColor} / ${swooshColor}`}</div>
  }

  function getStatusColor(id: any) {
    let statusObj = statusColors.find((color: any) => color.code === id)
    return statusObj
  }

  function StatusCustomCell(ev: any) {
    if (!ev.value) {
      return '--'
    }
    return (
      <OrderStatus status={getStatusColor(ev.data.statusId)}>
        {ev.value}
      </OrderStatus>
    )
  }

  function onGridReady(params: any) {
    window.addEventListener('resize', () => {
      handleResize(params.api)
    })
    params.api.sizeColumnsToFit()
  }

  function handleResize(api: any) {
    if (api && api.destroyCalled) return
    if (api) {
      api.sizeColumnsToFit()
    }
  }

  function onclickRow(ev: any) {
    if (ev && ev.data && ev.data.orderId) {
      navigate(`/admin/orders/${ev.data.orderId}`)
    }
  }

  function onAddEmpty(ev: any) {
    navigate('/admin/create-order')
  }

  function colorSelection({
    getTooltipProps,
    getArrowProps,
    tooltipRef,
    arrowRef,
    placement,
  }: any) {
    return (
      <ToolTipContainer
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
        })}>
        <ToolTipArrow
          {...getArrowProps({
            ref: arrowRef,
            'data-placement': placement,
            className: 'tooltip-arrow',
          })}
        />
        <ToolTipBody className="tooltip-body">
          <StatusContainer>
            {statusList.map((color: any, colorIndex: any) => {
              return (
                <StatusRow
                  key={colorIndex}
                  onClick={() => setStatusText(color.name)}>
                  <StatusLabel>{color.name}</StatusLabel>
                  <StatusCount>{color.orderCount}</StatusCount>
                </StatusRow>
              )
            })}
          </StatusContainer>
        </ToolTipBody>
      </ToolTipContainer>
    )
  }

  const applyFilters = (appliedFilters: filterProps) => {
    setAppliedFilter(appliedFilters)
  }

  const resetFilters = (appliedFilters: filterProps) => {
    if (JSON.stringify(applyFilter) !== JSON.stringify(appliedFilters)) {
      setAppliedFilter(appliedFilters)
    }
  }

  function changeColor({ getTriggerProps, triggerRef }: any) {
    return (
      <div
        {...getTriggerProps({
          ref: triggerRef,
          className: 'trigger',
          style: {
            position: 'absolute',
            top: '15px',
            right: '15px',
            cursor: 'pointer',
          },
        })}>
        <FontAwesomeIcon className="nike-icon icon-plus" icon={faPlayCircle} />
      </div>
    )
  }

  if (searchText === null && loading && ordersList.length === 0) {
    return <Icon name="nikeLoading" />
  }

  if (searchText === null && !loading && ordersList.length === 0) {
    return (
      <EmptyScreen
        emptyLogo="NoOrders"
        emptyText="Create Design"
        onChange={(e) => onAddEmpty(e)}
      />
    )
  }

  return (
    <Container>
      <FilterHeader>
        <FiltersContainer>
          <Header>
            <Title>All Designs</Title>
          </Header>
          <Actions>
            {
              <FilterBox>
                <OrderFilter
                  resetFilters={resetFilters}
                  applyFilters={applyFilters}
                  selectedTeamArray={selectedTeamList}
                  selectedPlayerArray={selectedPlayerList}
                />
              </FilterBox>
            }
            <SearchInput
              placeholder="Search"
              onChange={(ev) => setSearchText(ev.target.value)}
            />
          </Actions>
        </FiltersContainer>
      </FilterHeader>

      <StatsHeader>
        {statusCounts.map((status: any) => {
          return (
            <StatsBox
              key={status.code}
              color={getStatusColor(status.code)}
              onClick={() =>
                setSearchText(
                  status.label === 'Total Designs' ? '' : status.label.trim(),
                )
              }>
              {status.code === 0 && (
                <TooltipTrigger
                  placement="right"
                  trigger="click"
                  tooltip={(e) => colorSelection(e)}>
                  {(e) => changeColor(e)}
                </TooltipTrigger>
              )}
              <OrderStatsText>{status.label}</OrderStatsText>
              <OrdersCount>
                <CountUp duration={2} end={getStatusCount(status.code)} />
              </OrdersCount>
            </StatsBox>
          )
        })}
      </StatsHeader>

      <AgContainer className="ag-theme-material">
        {loading ? (
          <Icon name="nikeLoading" />
        ) : orders.length > 0 ? (
          <AgGridReact
            onGridReady={onGridReady}
            rowHeight={65}
            headerHeight={36}
            animateRows={true}
            onRowClicked={onclickRow}
            suppressCellSelection={true}
            columnDefs={columnDefs}
            rowData={orders || []}></AgGridReact>
        ) : (
          <NoData>
            <NoDataText>No Designs Found</NoDataText>
          </NoData>
        )}
      </AgContainer>
    </Container>
  )
}
