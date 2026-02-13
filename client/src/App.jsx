import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import PrivateRoute from './components/routing/PrivateRoute'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Unauthorized from './pages/Unauthorized'
import Collection from './pages/Collection'
import Philosophy from './pages/Philosophy'
import TopBanner from './components/layout/TopBanner'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <TopBanner />
          <Routes>
            {/* Public & User Routes wrapped in MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/philosophie" element={<Philosophy />} />
              
              {/* Private User Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>

            {/* Admin Routes - Standalone Layout */}
            <Route element={<PrivateRoute roles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* Add other admin routes here later */}
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
