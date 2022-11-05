import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Start } from './routes/start'
import { Order } from './routes/order'
import { ChakraProvider } from '@chakra-ui/react'
import { OrderConfirmed } from './routes/order-confirmed'
import { Recipes } from './routes/recipes'

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { Navigation } from './components/Navigation'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

// 3. extend the theme
const theme = extendTheme({ config })

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
