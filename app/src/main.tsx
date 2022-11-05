import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import { Order } from './routes/order'
import { OrderConfirmed } from './routes/order-confirmed'
import { Recipes } from './routes/recipes'
import { Send } from './routes/send'

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { Navigation } from './components/Navigation'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

// 3. extend the theme
const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`
  }
})

export default theme

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Navigation />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/order" element={<Order />} />
            <Route path="/start" element={<Start />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
  </React.StrictMode>
)
