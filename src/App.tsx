import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ScrollManager } from './components/layout/ScrollManager'
import { ToastProvider } from './components/ui/Toast'
import { CartProvider } from './features/cart/CartContext'
import { OverlayProvider } from './features/ui/OverlayProvider'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <OverlayProvider>
            <ScrollManager />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OverlayProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
