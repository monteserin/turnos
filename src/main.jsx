import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UIDProvider from './app/providers/UIDProvider'
import { GlobalStyle } from './app/styles.js'
import { ConfigProvider } from 'antd'
import { App as AntdApp } from 'antd';

const theme = {
  token: {
    colorPrimary: '#f77754',
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <ConfigProvider theme={theme}>
      <UIDProvider>
        <AntdApp >
          <App />
        </AntdApp>
      </UIDProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
