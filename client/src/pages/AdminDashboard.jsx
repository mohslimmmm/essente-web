import Sidebar from '../components/admin/Sidebar';
import StatsCard from '../components/admin/StatsCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaDollarSign, FaShoppingBag, FaUserFriends, FaChartLine } from 'react-icons/fa';

const data = [
  { name: 'Lun', revenue: 4000 },
  { name: 'Mar', revenue: 3000 },
  { name: 'Mer', revenue: 2000 },
  { name: 'Jeu', revenue: 2780 },
  { name: 'Ven', revenue: 1890 },
  { name: 'Sam', revenue: 6390 },
  { name: 'Dim', revenue: 3490 },
];

const AdminDashboard = () => {
  return (
    <div className="flex bg-black min-h-screen text-white font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-essente-gold mb-1">Tableau de Bord</h1>
            <p className="text-neutral-400 text-sm">Vue d'ensemble des performances de votre boutique.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-xs text-neutral-500">Super Admin</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-essente-gold flex items-center justify-center text-black font-bold">
                A
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard 
            title="Revenu Total" 
            value="15,150 DA" 
            icon={<FaDollarSign />} 
            color="bg-yellow-500" 
            trend="up" 
            trendValue="+12%" 
          />
          <StatsCard 
            title="Commandes Actives" 
            value="5" 
            icon={<FaShoppingBag />} 
            color="bg-blue-500" 
            trend="up" 
            trendValue="+5" 
          />
          <StatsCard 
            title="Nouveaux Clients" 
            value="9" 
            icon={<FaUserFriends />} 
            color="bg-green-500" 
            trend="up" 
            trendValue="+2" 
          />
          <StatsCard 
            title="Taux de Conversion" 
            value="3.2%" 
            icon={<FaChartLine />} 
            color="bg-purple-500" 
            trend="down" 
            trendValue="-0.4%" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">Carte des Revenus (7 derniers jours)</h3>
                    <select className="bg-black border border-neutral-700 text-xs text-white rounded px-3 py-1 outline-none focus:border-essente-gold">
                        <option>Cette Semaine</option>
                        <option>Ce Mois</option>
                    </select>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}DA`} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#fff' }} 
                                itemStyle={{ color: '#D4AF37' }}
                            />
                            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                            <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activity / Logbook */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Journal d'Activité</h3>
                <div className="space-y-6">
                    {[
                        { user: 'dhdjisjs', action: 'Nouvelle Commande', amount: '4,500 DA', time: 'Il y a 2h', color: 'text-green-400' },
                        { user: 'Tjfukb', action: 'Nouvelle Commande', amount: '4,300 DA', time: 'Il y a 2h', color: 'text-green-400' },
                        { user: 'test', action: 'Nouvelle Commande', amount: '1,600 DA', time: 'Il y a 6h', color: 'text-green-400' },
                        { user: 'Chenait imad', action: 'Nouvelle Commande', amount: '600 DA', time: 'Il y a 17h', color: 'text-green-400' },
                        { user: 'Sarah M.', action: 'Nouveau Client', amount: '-', time: 'Il y a 1j', color: 'text-blue-400' },
                    ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 pb-4 border-b border-neutral-800 last:border-0 last:pb-0">
                            <div className="w-2 h-2 rounded-full bg-essente-gold mt-2"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">
                                    <span className="font-bold">{item.user}</span> <span className="text-neutral-400 text-xs">Analysis:</span> {item.action}
                                </p>
                                <p className="text-xs text-neutral-500 mt-1">{item.time}</p>
                            </div>
                            <span className={`text-xs font-mono font-bold ${item.color}`}>{item.amount}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-6 py-2 text-xs text-center text-neutral-400 hover:text-white border border-neutral-800 rounded hover:border-neutral-600 transition-all">
                    Voir Tout le Journal
                </button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
