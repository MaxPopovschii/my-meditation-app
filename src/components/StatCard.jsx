import React from 'react';

export const StatCard = ({ icon, title, value }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 
                hover:bg-gray-700/50 transition-all duration-300 group 
                transform hover:scale-[1.05] hover:shadow-lg hover:shadow-green-500/10
                cursor-pointer">
    <div className="text-green-500 text-2xl mb-4 group-hover:scale-110 
                  transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-white text-2xl font-bold">{value}</p>
  </div>
);