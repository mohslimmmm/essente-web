import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiBox, 
  FiShoppingBag, 
  FiUsers, 
  FiSettings, 
  FiLogOut,
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiAlertCircle,
  FiTag,
  FiGrid
} from 'react-icons/fi';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import logo from '../assets/logo.png';
import ProductManager from '../components/admin/ProductManager';
import CategoryManager from '../components/admin/CategoryManager';
import PromotionsManager from '../components/admin/PromotionsManager';
import OrderManager from '../components/admin/OrderManager';

// --- Dummy Data ---
const revenueData = [
  { day: 'Mon', value: 0 },
  { day: 'Tue', value: 0 },
  { day: 'Wed', value: 0 },
  { day: 'Thu', value: 0 },
  { day: 'Fri', value: 0 },
  { day: 'Sat', value: 0 },
  { day: 'Sun', value: 0 },
];

const recentActivities = [
  { id: 1, text: "Welcome to your Admin Dashboard!", time: "Just now", type: "milestone" },
];

// --- Sub-Components ---

const MenuItem = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group
      ${active 
         ? 'bg-gradient-to-r from-[#C5A059]/20 to-transparent border-l-2 border-[#C5A059] text-[#C5A059]' 
         : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
      }
    `}
  >
    <span className={`text-lg ${active ? 'text-[#C5A059]' : 'text-gray-500 group-hover:text-white'}`}>
      {icon}
    </span>
    <span className="text-sm uppercase tracking-widest font-medium">
      {label}
    </span>
  </button>
);

const KPICard = ({ title, value, trend, icon, isPositive = false, isWarning = false }) => (
  <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded-lg shadow-lg hover:border-[#C5A059]/50 transition-colors duration-300 group">
     <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-black/40 rounded-lg text-[#C5A059] border border-[#333] group-hover:border-[#C5A059]/30 transition-colors">
           {icon}
        </div>
        {/* Trend Indicator */}
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
           isWarning ? 'bg-red-500/10 text-red-500' : 
           isPositive ? 'bg-green-500/10 text-green-500' : 'bg-gray-800 text-gray-400'
        }`}>
           {isWarning ? <FiAlertCircle /> : isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
           {isWarning ? 'Warning' : 'Trend'}
        </div>
     </div>
     
     <div>
        <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">{title}</h4>
        <div className="text-2xl font-light text-white group-hover:text-[#C5A059] transition-colors">{value}</div>
        <div className={`text-xs mt-2 ${
           isWarning ? 'text-red-400' : isPositive ? 'text-green-400' : 'text-gray-500'
        }`}>
           {trend}
        </div>
     </div>
  </div>
);

// --- Main Component ---

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            {/* Header */}
            <header className="mb-10 flex justify-between items-end">
              <div>
                <h2 className="text-4xl text-white font-light uppercase tracking-wider mb-1">Dashboard Overview</h2>
                <p className="text-gray-400 text-sm font-light">Welcome back, Admin</p>
              </div>
              <div className="text-right">
                <p className="text-[#C5A059] text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KPICard 
                title="Total Revenue" 
                value="CAD $0" 
                trend="Ready to start" 
                icon={<span className="text-xl">$</span>} 
              />
              <KPICard 
                title="Active Orders" 
                value="0" 
                trend="No orders yet" 
                icon={<FiShoppingBag />} 
              />
              <KPICard 
                title="Total Clients" 
                value="0" 
                trend="Awaiting customers" 
                icon={<FiUsers />} 
              />
              <KPICard 
                title="Low Stock" 
                value="0 Items" 
                trend="All good" 
                icon={<FiAlertCircle />} 
              />
            </div>

            {/* Data Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-[#1E1E1E] border border-[#333] rounded-lg p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none opacity-50"></div>
                
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h3 className="text-lg font-sans text-[#C5A059] tracking-wider">Revenue Map</h3>
                  <select className="bg-black/30 border border-[#444] text-xs text-gray-300 rounded px-2 py-1 outline-none focus:border-[#C5A059]">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                
                <div className="h-[300px] w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C5A059" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis 
                        dataKey="day" 
                        stroke="#666" 
                        tick={{fill: '#888', fontSize: 12}} 
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis 
                        stroke="#666" 
                        tick={{fill: '#888', fontSize: 12}} 
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }}
                        itemStyle={{ color: '#C5A059' }}
                        cursor={{ stroke: '#C5A059', strokeWidth: 1, strokeDasharray: '5 5' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#C5A059" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-[#1E1E1E] border border-[#333] rounded-lg p-6 shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-sans text-[#C5A059] tracking-wider">Logbook</h3>
                  <span className="text-xs text-gray-500 border border-[#333] px-2 py-1 rounded">Live</span>
                </div>
                
                <div className="space-y-6 relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-[#333] z-0"></div>
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="relative z-10 pl-6 group cursor-default">
                      <span className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#1E1E1E] ${
                        activity.type === 'alert' ? 'bg-red-500' : 
                        activity.type === 'milestone' ? 'bg-[#C5A059]' : 'bg-[#C5A059]/60'
                      }`}></span>
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                        {activity.text}
                      </p>
                      <span className="text-xs text-gray-600 block mt-1">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      
      case 'products':
        return <ProductManager />;
      
      case 'categories':
        return <CategoryManager />;
      
      case 'promotions':
        return <PromotionsManager />;
      
      case 'orders':
        return <OrderManager />;
      
      case 'customers':
        return (
          <div className="text-center py-20">
            <FiUsers className="mx-auto text-[#C5A059] mb-4" size={64} />
            <h2 className="text-3xl text-white font-light mb-4">Customer Management</h2>
            <p className="text-gray-400">Manage customer accounts and relationships.</p>
          </div>
        );
      
      case 'settings':
        return (
          <div className="text-center py-20">
            <FiSettings className="mx-auto text-[#C5A059] mb-4" size={64} />
            <h2 className="text-3xl text-white font-light mb-4">Settings</h2>
            <p className="text-gray-400">Configure your store settings and preferences.</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0b0b] text-gray-200 font-sans selection:bg-[#C5A059] selection:text-black">
      
      {/* Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-[#0b0b0b] border-r border-[#333] flex flex-col z-20">
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-[#333] px-4">
          <img 
            src={logo} 
            alt="ESSENTÉ ADMIN" 
            className="h-20 w-auto object-contain brightness-0 invert opacity-90" 
          />
        </div>

        {/* Menu */}
        <nav className="flex-1 py-8 px-4 space-y-2">
          <MenuItem 
            icon={<FiHome />} 
            label="Dashboard" 
            active={activeSection === 'dashboard'}
            onClick={() => setActiveSection('dashboard')}
          />
          <MenuItem 
            icon={<FiBox />} 
            label="Products" 
            active={activeSection === 'products'}
            onClick={() => setActiveSection('products')}
          />
          <MenuItem 
            icon={<FiGrid />} 
            label="Categories" 
            active={activeSection === 'categories'}
            onClick={() => setActiveSection('categories')}
          />
          <MenuItem 
            icon={<FiTag />} 
            label="Promotions" 
            active={activeSection === 'promotions'}
            onClick={() => setActiveSection('promotions')}
          />
          <MenuItem 
            icon={<FiShoppingBag />} 
            label="Orders" 
            active={activeSection === 'orders'}
            onClick={() => setActiveSection('orders')}
          />
          <MenuItem 
            icon={<FiUsers />} 
            label="Customers" 
            active={activeSection === 'customers'}
            onClick={() => setActiveSection('customers')}
          />
          <MenuItem 
            icon={<FiSettings />} 
            label="Settings" 
            active={activeSection === 'settings'}
            onClick={() => setActiveSection('settings')}
          />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#333]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-gray-900 rounded-lg transition-colors duration-300"
          >
            <FiLogOut />
            <span className="text-sm uppercase tracking-wider font-medium">Logout</span>
          </button>
        </div>
      </aside>


      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-[#0b0b0b]">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
