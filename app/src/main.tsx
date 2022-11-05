import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/inter/500.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Order } from './routes/order'
import { OrderConfirmed } from './routes/order-confirmed'
import { Send } from './routes/send'
import { mode } from '@chakra-ui/theme-tools'

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
  colors: {
    brand: {
      100: '#000'
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
