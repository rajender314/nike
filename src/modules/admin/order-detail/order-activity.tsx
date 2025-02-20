import React from 'react'
import { useGetOrderLog } from 'api'
import moment from 'moment'
import {
  LogItemList,
  LogItem,
  LogUserIcon,
  LogUserName,
  LogInfo,
  LogHighlight,
  LogUpdateAt,
  UserImg,
} from './order-detail-components'
import { objectPath, getInitialsFromName } from 'helpers'

type Props = {
  orderId: string
}

export default function OrderActivity({ orderId }: Props) {
  const { loading, data } = useGetOrderLog({
    orderId: orderId,
  })
  const orderActivity = objectPath(data, ['orderLog', 'activityLog'], [])

  if (loading) {
    return <div>loading...</div>
  }
  return (
    <LogItemList>
      {orderActivity.map((log: any) => {
        return (
          <LogItem key={log._id}>
            <LogUserIcon>
              <UserImg image={log.userProfileLogo}>
                {log.userProfileLogo ? '' : getInitialsFromName(log.userName)}
              </UserImg>
            </LogUserIcon>
            <LogUserName>{log.userName}</LogUserName>
            <LogInfo>
              <LogHighlight>{log.logActivity}</LogHighlight>
            </LogInfo>
            <LogUpdateAt>
              {`on ${moment(log.updatedAt).format('MMM D, YYYY hh:mm A')}`}
            </LogUpdateAt>
          </LogItem>
        )
      })}
    </LogItemList>
  )
}
