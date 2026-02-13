import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CartProvider } from './context/CartContext';
import ProductCard from './components/ProductCard';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from './context/CartContext'; // Import hook for cart count in header

// Inner component to access CartContext
const MainContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, total } = useCart(); // Access cart state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Use dummy array for skeleton loading
  const displayProducts = loading ? Array(6).fill({}) : products;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header - Navy Blue #0a192f */}
      <header className="bg-[#0a192f] text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider uppercase">Essenté</h1>
          <div className="relative cursor-pointer">
            <FaShoppingBag className="text-2xl hover:text-orange-400 transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF5722] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8 flex-grow">
         <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-[#0a192f]">New Arrivals</h2>
              <p className="text-gray-500 mt-1">Discover our latest collection of premium essentials.</p>
            </div>
            {/* Total Display for Demo */}
             <div className="text-right">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Cart Total</p>
                <p className="text-xl font-bold text-[#FF5722]">${total.toFixed(2)}</p>
            </div>
         </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, index) => (
            <ProductCard 
              key={product.id || index} 
              product={product} 
              isLoading={loading} 
            />
          ))}
        </div>
      </main>

      {/* Footer - Navy Blue #0a192f */}
      <footer className="bg-[#0a192f] text-gray-300 py-8 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Essenté. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  )
}

export default App
