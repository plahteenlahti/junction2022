import { ChakraProvider } from '@chakra-ui/react'


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Order } from './routes/order'
import { OrderConfirmed } from './routes/order-confirmed'
import { Send } from './routes/send'

import { extendTheme } from '@chakra-ui/react'
import { Navigation } from './components/Navigation'

// 3. extend the theme
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`
  },
  layerStyles: {
    base: {
      bg: 'gray.900',
      border: '2px solid',
      borderColor: 'gray.500'
    }
  }
})

export default theme

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Send />} />
          <Route path="/order" element={<Order />} />
          <Route path="/send" element={<Send />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
