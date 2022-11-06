import { getAuth, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth, useFirebaseApp } from 'reactfire'
import { History } from '../routes/history'
import { Login } from '../routes/login'
import { Order } from '../routes/order'
import { Send } from '../routes/send'
import SendConfirm from '../routes/send-confirm'
import { DeliveryNotification } from './DeliveryNotification'
import { Navigation } from './Navigation'
import { TabBar } from './TabBar'

type State = {
  isSignedIn: boolean
  pending: boolean
  user: User | null
}
export function useFBAuth() {
  const auth = useAuth()
  const [authState, setAuthState] = useState<State>({
    isSignedIn: false,
    pending: true,
    user: null
  })

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user =>
      setAuthState({ user, pending: false, isSignedIn: !!user })
    )
    return () => unregisterAuthObserver()
  }, [])

  return { auth, ...authState }
}

export const BehindAuth = () => {
  const app = useFirebaseApp()
  const auth = getAuth(app)
  return (
    <AuthProvider sdk={auth}>
      <Navigation />
      <BrowserRouter>
        <ExtraLevel></ExtraLevel>
        <DeliveryNotification />
        <TabBar />
      </BrowserRouter>
    </AuthProvider>
  )
}

const ExtraLevel = () => {
  const { pending, isSignedIn } = useFBAuth()

  if (pending) {
    return <></>
  }

  return (
    <Routes>
      {isSignedIn ? (
        <>
          <Route path="/" element={<Send />} />
          <Route path="/send" element={<Send />} />
          <Route path="/order" element={<Order />} />
          <Route path="/history" element={<History />} />
          <Route path="/send/confirm" element={<SendConfirm />} />
        </>
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  )
}
