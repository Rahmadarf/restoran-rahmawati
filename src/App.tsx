import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ScrollManager } from './components/layout/ScrollManager'
import { ToastProvider } from './components/ui/Toast'
import { CartProvider } from './features/cart/CartContext'
import { DiningSessionProvider } from './features/dining-session/DiningSessionContext'
import { OverlayProvider } from './features/ui/OverlayProvider'
import { usePageTransition } from './hooks/usePageTransition'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { DetailMenuPage } from './pages/DetailMenuPage'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { ReservationPage } from './pages/ReservationPage'

function AppRoutes() {
  const location = usePageTransition()

  return (
    <>
      <ScrollManager location={location} />
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/detail-menu" element={<DetailMenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/reservasi" element={<ReservationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <DiningSessionProvider>
            <OverlayProvider>
              <AppRoutes />
            </OverlayProvider>
          </DiningSessionProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
