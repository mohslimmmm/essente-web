import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'; 
import { 
  FaHome, 
  FaBoxOpen, 
  FaShoppingCart, 
  FaUsers, 
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
    
  const menuItems = [
    { name: 'Tableau de Bord', icon: <FaHome />, path: '/admin/dashboard' },
    { name: 'Produits', icon: <FaBoxOpen />, path: '/admin/products' },
    { name: 'Commandes', icon: <FaShoppingCart />, path: '/admin/orders', badge: 5 },
    { name: 'Clients', icon: <FaUsers />, path: '/admin/customers' },
    { name: 'Analytics', icon: <FaChartBar />, path: '/admin/analytics' },
  ];

  return (
    <aside className="w-64 h-screen bg-neutral-900 border-r border-neutral-800 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-neutral-800 flex justify-center">
        <img src={logo} alt="Essenté Admin" className="h-10 object-contain brightness-0 invert" />
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        <p className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">Menu Principal</p>
        
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200
              ${isActive 
                ? 'bg-essente-gold text-neutral-900' 
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}
            `}
          >
            <span className="text-lg mr-3">{item.icon}</span>
            {item.name}
            {item.badge && (
              <span className="ml-auto bg-red-500 text-white py-0.5 px-2 rounded-full text-xs font-bold">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}

        <div className="mt-8">
            <p className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">Système</p>
            <NavLink
                to="/admin/settings"
                className={({ isActive }) => `
                flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${isActive 
                    ? 'bg-essente-gold text-neutral-900' 
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}
                `}
            >
                <span className="text-lg mr-3"><FaCog /></span>
                Paramètres
            </NavLink>
        </div>
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button className="flex w-full items-center px-3 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
          <span className="text-lg mr-3"><FaSignOutAlt /></span>
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
