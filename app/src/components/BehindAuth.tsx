import { getAuth } from 'firebase/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { History } from '../routes/history'
import { Login } from '../routes/login'
import { Order } from '../routes/order'
import { OrderConfirmed } from '../routes/order-confirmed'
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
              <Route path="/" element={<History />} />
              <Route path="/send" element={<History />} />
            </>
          )}
          <Route path="/order" element={<Order />} />
          <Route path="/history" element={<History />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
        </Routes>
        <DeliveryNotification />
        <TabBar />
      </BrowserRouter>
    </>
  )
}
