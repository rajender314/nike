import React, { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Icon } from 'components'
import {
  ToastOuterContainer,
  ToastInnerContainer,
  IconContainer,
  MessageContainer,
  Title,
  ToastMessage,
} from 'components/toast/toast-components'

type ToastProps = {
  id?: string
  type?: string
  title?: string
  message: string
  showToast: boolean
  duration?: number
  onClose?: (e?: any) => void
}

export default function Toast({
  id = 'nike-toast',
  type = 'info',
  title = 'Nike',
  message,
  showToast,
  duration = 5000,
  onClose,
}: ToastProps) {
  const toastList: any = {}
  toastList[id] = useRef(null)

  if (showToast) {
    if (toastList[id].current) {
      toast.update(id, {
        render: toastComponent,
        autoClose: ['success', 'error'].indexOf(type) > -1 ? 1000 : duration,
      })
    } else {
      toastList[id].current = toast(toastComponent, {
        toastId: id,
        autoClose: duration,
        onClose: () => {
          toastList[id].current = null
          if (onClose) {
            onClose()
          }
        },
      })
    }
  }

  function toastComponent() {
    return (
      <ToastInnerContainer>
        <IconContainer>
          <Icon name={getIcon(type)} />
        </IconContainer>
        <MessageContainer>
          <Title>{title}</Title>
          <ToastMessage>{message}</ToastMessage>
        </MessageContainer>
      </ToastInnerContainer>
    )
  }

  function getIcon(type: any) {
    switch (type) {
      case 'success':
        return 'tick'
      case 'error':
        return 'search'
      case 'warn':
        return 'warn'
      case 'info':
        return 'info'
      default:
        return 'nike'
    }
  }

  return (
    <ToastOuterContainer>
      <ToastContainer
        position="top-right"
        className="nike-toast"
        autoClose={duration}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeButton={false}
      />
    </ToastOuterContainer>
  )
}
