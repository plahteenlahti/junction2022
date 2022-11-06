import { getAuth } from 'firebase/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { History } from '../routes/history'
import { Login } from '../routes/login'
import { Order } from '../routes/order'
import { Send } from '../routes/send'
import { DeliveryNotification } from './DeliveryNotification'
import { Navigation } from './Navigation'
import { TabBar } from './TabBar'

export const BehindAuth = () => {
  const auth = getAuth()

  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          {auth.currentUser ? (
            <Route path="/" element={<Login />} />
          ) : (
            <>
              <Route path="/" element={<Send />} />
              <Route path="/send" element={<Send />} />
              <Route path="/send/confirm" element={<Send />} />
            </>
          )}
          <Route path="/order" element={<Order />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <DeliveryNotification />
        <TabBar />
      </BrowserRouter>
    </>
  )
}
