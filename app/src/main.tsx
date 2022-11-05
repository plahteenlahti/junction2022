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
import { FirebaseAppProvider } from 'reactfire';

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { Navigation } from './components/Navigation'
import { FirebaseInstanceProvider } from './FirebaseInstance'

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

const firebaseConfig = {
  apiKey: "AIzaSyAw1mCZWLICnmTeTowqT-R8axbxGe3FtIg",
  authDomain: "ship-me-fresh.firebaseapp.com",
  projectId: "ship-me-fresh",
  storageBucket: "ship-me-fresh.appspot.com",
  messagingSenderId: "697967022848",
  appId: "1:697967022848:web:edaa78700b2c5f1b98d9e5",
  measurementId: "G-7J24VGDBDR"
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseInstanceProvider>
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
      </FirebaseInstanceProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
)
