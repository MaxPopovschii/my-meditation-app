import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

export const ProfileHeader = ({ userProfile, stats, onEditClick }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 
                  hover:bg-gray-700/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 
                        flex items-center justify-center text-4xl cursor-pointer 
                        hover:scale-105 transition-transform duration-300">
              {userProfile.avatar}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full px-3 py-1 
                         text-sm font-bold text-gray-900 shadow-lg">
              Lvl {stats.level}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{userProfile.name}</h1>
            <p className="text-gray-400">{userProfile.goal}</p>
            <div className="mt-3 bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 
                       transition-all duration-1000 ease-out"
                style={{ width: `${(stats.experience % 100)}%` }}
              />
            </div>
          </div>
        </div>
        <button
          onClick={onEditClick}
          className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-300 clickable"
        >
          <FaUserCircle className="text-2xl text-green-500 clickable" />
        </button>
      </div>
    </div>
  );
};