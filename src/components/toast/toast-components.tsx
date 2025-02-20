import styled from 'styled-components'

export const ToastOuterContainer = styled.div`
  .nike-toast {
    .Toastify__toast {
      min-height: 60px;
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
    }
    .Toastify__toast--default {
      color: #666666;
    }
  }
`

export const ToastInnerContainer = styled.div`
  display: flex;
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`

export const MessageContainer = styled.div`
  padding-left: 16px;
`

export const Title = styled.div`
  margin-bottom: 6px;
  color: #222222;
  font-size: 1rem;
  font-weight: 500;
`

export const ToastMessage = styled.div`
  font-size: 0.8rem;
`
