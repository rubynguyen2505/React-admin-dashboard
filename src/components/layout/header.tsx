import React, { CSSProperties } from 'react'
import { CurrentUser } from './current-user'
import { Layout, Space } from 'antd'

export const Header = () => {
  const headerStyles: CSSProperties = {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  }
  return (
    <Layout.Header style={headerStyles}>
      <Space align='center' size='middle'>
        <CurrentUser />
      </Space>
    </Layout.Header>
  )
}

