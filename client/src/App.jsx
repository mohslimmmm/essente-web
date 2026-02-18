import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import PrivateRoute from './components/routing/PrivateRoute'
import MainLayout from './components/layout/MainLayout'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Unauthorized from './pages/Unauthorized'
import Collection from './pages/Collection'
import Philosophy from './pages/Philosophy'
import ProductDetail from './pages/ProductDetail'
import OrderConfirmation from './pages/OrderConfirmation'
import TopBanner from './components/layout/TopBanner' // Keep import as it might be used (though now in MainLayout)
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public & User Routes wrapped in MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/philosophie" element={<Philosophy />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              
              {/* Private User Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Route>

            {/* Admin Routes - Standalone Layout (No TopBanner) */}
            <Route element={<PrivateRoute roles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
