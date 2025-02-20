import React from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: any
}

export default function Portal({ children }: Props) {
  return ReactDOM.createPortal(<div>{children}</div>, document.body)
}
