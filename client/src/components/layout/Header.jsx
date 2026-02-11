import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../assets/logo-essenté-no-bg.png'; // Need to handle assets

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-essente-cream/95 backdrop-blur-sm border-b border-essente-gold/20 transition-all duration-300" id="main-header">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between max-w-7xl">
          
          {/* Logo */}
          <h1 className="text-xl md:text-3xl font-elegant font-light tracking-widest transition-all duration-300" id="logo">
            <Link to="/" className="block">
              {/* Placeholder for logo image */}
              <span className="text-essente-gold font-bold">ESSENTÉ</span>
              {/* <img src={logo} alt="ESSENTÉ" className="h-20 md:h-24 w-auto object-contain" /> */}
            </Link>
          </h1>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-10 text-sm uppercase tracking-widest font-light absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="nav-link hover:text-essente-gold transition-all duration-300 relative group">
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-essente-gold group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a href="#collection" className="nav-link hover:text-essente-gold transition-all duration-300 relative group">
              Collection
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-essente-gold group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#philosophie" className="nav-link hover:text-essente-gold transition-all duration-300 relative group">
              Philosophie
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-essente-gold group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#processus" className="nav-link hover:text-essente-gold transition-all duration-300 relative group">
              Savoir-Faire
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-essente-gold group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden md:block text-lg hover:text-essente-gold transition duration-300"
            >
              <i className="fas fa-search"></i> {/* FontAwesome integration needed or replace with react-icons */}
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-lg"
            >
              <i className="fas fa-bars"></i>
            </button>

            <Link to="/login" className="hidden md:block text-lg hover:text-essente-gold transition duration-300 relative group">
              <i className="fas fa-user"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-essente-charcoal text-essente-cream text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Mon Compte
              </span>
            </Link>
            
            <button className="relative text-xl hover:text-essente-gold transition duration-300 group">
              <i className="fas fa-shopping-bag"></i>
              <span className="absolute -top-1 -right-2 text-xs font-bold w-5 h-5 rounded-full bg-essente-gold text-essente-charcoal flex items-center justify-center pointer-events-none transform scale-100 transition-transform duration-300">0</span>
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-essente-cream border-t border-essente-gold/20 p-4 shadow-lg">
            <div className="container mx-auto max-w-3xl relative">
              <input type="text" placeholder="Rechercher un produit..." className="w-full p-4 pl-12 bg-essente-cream border border-essente-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-essente-gold/50" />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                X
              </button>
            </div>
          </div>
        )}
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-essente-cream z-50 pt-20 px-6 md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-2xl text-essente-charcoal"
            >
                X
            </button>
            <nav className="flex flex-col space-y-8 text-center">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-elegant py-4 border-b border-essente-gold/20">Accueil</Link>
                <a href="#collection" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-elegant py-4 border-b border-essente-gold/20">Collection</a>
                <a href="#philosophie" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-elegant py-4 border-b border-essente-gold/20">Philosophie</a>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-elegant py-4 border-b border-essente-gold/20">Compte</Link>
            </nav>
        </div>
      )}
    </>
  );
};

export default Header;
