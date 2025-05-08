import React from 'react';
import { FaClock, FaChartLine, FaStar } from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';

const StatCard = ({ icon, title, value }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 
                hover:bg-gray-700/50 transition-all duration-300 group 
                cursor-pointer transform hover:scale-105">
    <div className="text-green-500 text-2xl mb-4 group-hover:scale-110 
                  transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-white text-2xl font-bold">{value}</p>
  </div>
);

export const StatsGrid = ({ stats, isUpdating }) => {
  const statsItems = [
    {
      icon: <GiMeditation />,
      title: "Sessioni Totali",
      value: stats.totalSessions
    },
    {
      icon: <FaClock />,
      title: "Minuti Totali",
      value: stats.totalMinutes
    },
    {
      icon: <FaChartLine />,
      title: "Streak Attuale",
      value: `${stats.streak} giorni`
    },
    {
      icon: <FaStar />,
      title: "Achievement",
      value: `${stats.achievements.length} sbloccati`
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 
                   ${isUpdating ? 'opacity-50' : 'opacity-100'} 
                   transition-opacity duration-300`}>
      {statsItems.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};