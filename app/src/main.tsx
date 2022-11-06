import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import '@fontsource/inter/500.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { FirebaseAppProvider } from 'reactfire'
import { BehindAuth } from './components/BehindAuth'
import { FirebaseInstanceProvider } from './FirebaseInstance'
import './index.css'

// 3. extend the theme
const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('brandWhite', 'brand')(props)
      }
    })
  },
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
      50: '#000',
      100: '#000',
      200: '#000',
      300: '#000',
      400: '#000',
      500: '#000',
      600: '#000',
      700: '#000',
      800: '#000',
      900: '#000'
    },
    brandWhite: {
      50: '#fff',
      100: '#fff',
      200: '#fff',
      300: '#fff',
      400: '#fff',
      500: '#fff',
      600: '#fff',
      700: '#fff',
      800: '#fff',
      900: '#fff'
    }
  }
})

export default theme

const firebaseConfig = {
  apiKey: 'AIzaSyAw1mCZWLICnmTeTowqT-R8axbxGe3FtIg',
  authDomain: 'ship-me-fresh.firebaseapp.com',
  projectId: 'ship-me-fresh',
  storageBucket: 'ship-me-fresh.appspot.com',
  messagingSenderId: '697967022848',
  appId: '1:697967022848:web:edaa78700b2c5f1b98d9e5',
  measurementId: 'G-7J24VGDBDR'
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseInstanceProvider>
        <ChakraProvider theme={theme}>
          <BehindAuth />
        </ChakraProvider>
      </FirebaseInstanceProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
)
