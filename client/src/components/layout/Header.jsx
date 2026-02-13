import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext'; // Import CartContext
import logo from '@/assets/logo.png'; // Import the logo
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingBag, FiMenu, FiX, FiUser } from 'react-icons/fi'; // Icons

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuth();
  const { cart, isAnimationActive } = useCart(); // Use CartContext
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header 
        className="sticky top-0 z-[1000] bg-[#F9F9F9]/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300 supports-[backdrop-filter]:bg-[#F9F9F9]/60" 
        id="main-header"
      >
        <div className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between max-w-7xl">
          
          {/* Logo */}
          <h1 className="text-xl md:text-3xl font-elegant font-light tracking-widest transition-all duration-300" id="logo">
            <Link to="/" className="block">
              <img src={logo} alt="ESSENTÉ" className="h-8 md:h-10 w-auto object-contain" /> 
            </Link>
          </h1>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-10 text-xs uppercase tracking-[0.2em] font-medium absolute left-1/2 transform -translate-x-1/2 text-essente-charcoal">
            <Link to="/" className="nav-link hover:text-essente-gold transition-colors duration-300">
              Accueil
            </Link>
            <Link to="/collection" className="nav-link hover:text-essente-gold transition-colors duration-300">
              Collection
            </Link>
            <Link to="/philosophie" className="nav-link hover:text-essente-gold transition-colors duration-300">
              Philosophie
            </Link>
            {user?.role === 'admin' && (
               <Link to="/admin/dashboard" className="nav-link hover:text-essente-gold transition-colors duration-300 text-essente-gold">
                Admin
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-6 text-essente-charcoal">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden md:block text-xl hover:text-essente-gold transition duration-300"
            >
              <FiSearch />
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-xl"
            >
              <FiMenu />
            </button>

            {isAuthenticated ? (
               <div className="hidden md:flex items-center space-x-4">
                  <Link to="/dashboard" className="text-xl hover:text-essente-gold transition duration-300" title="Dashboard">
                    <FiUser />
                  </Link>
                  <button onClick={handleLogout} className="text-xl hover:text-essente-gold transition duration-300" title="Logout">
                    <FiX />
                  </button>
               </div>
            ) : (
                <Link to="/login" className="hidden md:block text-xl hover:text-essente-gold transition duration-300">
                  <FiUser />
                </Link>
            )}
            
            <Link to="/cart" className="relative text-xl hover:text-essente-gold transition duration-300 group">
              <motion.div
                animate={isAnimationActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <FiShoppingBag />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C5A059] rounded-full"></span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>
        
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-[#F9F9F9] border-t border-gray-100 p-4 shadow-sm animate-fade-in">
            <div className="container mx-auto max-w-3xl relative">
              <input 
                type="text" 
                placeholder="RECHERCHER..." 
                className="w-full p-3 pl-4 bg-white border border-gray-200 text-sm tracking-widest focus:outline-none focus:border-essente-gold text-essente-charcoal placeholder-gray-400" 
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-essente-charcoal hover:text-black"
              >
                <FiX />
              </button>
            </div>
          </div>
        )}
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#F9F9F9] z-50 pt-20 px-6 md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-2xl text-essente-charcoal"
            >
                <FiX />
            </button>
            <nav className="flex flex-col space-y-6 text-center">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium uppercase tracking-widest py-3 border-b border-gray-100">Accueil</Link>
                <Link to="/collection" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium uppercase tracking-widest py-3 border-b border-gray-100">Collection</Link>
                <Link to="/philosophie" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium uppercase tracking-widest py-3 border-b border-gray-100">Philosophie</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium uppercase tracking-widest py-3 border-b border-gray-100">Mon Compte</Link>
                        {user?.role === 'admin' && (
                              <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium uppercase tracking-widest py-3 border-b border-gray-100 text-essente-gold">Admin</Link>
                        )}
                        <button onClick={() => {handleLogout(); setIsMobileMenuOpen(false);}} className="text-xl font-medium uppercase tracking-widest py-3 border-b border-gray-100 text-red-500">Déconnexion</button>
                    </>
                ) : (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium uppercase tracking-widest py-3 border-b border-gray-100">Se Connecter</Link>
                )}
            </nav>
        </div>
      )}
      </header>
    </>
  );
};
export default Header;
