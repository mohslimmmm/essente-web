import React from 'react';

const StatsCard = ({ title, value, icon, trend, trendValue, color }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-essente-gold/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-white`}>
          {icon}
        </div>
      </div>
      
        {trend && (
            <div className="flex items-center text-xs">
                <span className={`${trend === 'up' ? 'text-green-400' : 'text-red-400'} font-medium flex items-center`}>
                    {trend === 'up' ? '↗' : '↘'} {trendValue}
                </span>
                <span className="text-neutral-500 ml-2">depuis la semaine dernière</span>
            </div>
        )}
    </div>
  );
};

export default StatsCard;
