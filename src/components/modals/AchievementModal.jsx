import React from 'react';
import { FaTimes, FaTrophy, FaCheck } from 'react-icons/fa';

export const AchievementModal = ({ achievement, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 transform 
                 transition-all duration-300 animate-fade-up">
      <div className="flex justify-between items-start mb-6">
        <div className="text-4xl animate-bounce">{achievement.icon}</div>
        <button onClick={onClose} 
                className="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <FaTimes />
        </button>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">{achievement.title}</h2>
      <p className="text-gray-400 mb-6">{achievement.description}</p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-2">Progresso</h3>
          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-1000"
                 style={{ width: `${(achievement.progress / achievement.total) * 100}%` }} />
          </div>
          <p className="text-gray-400 mt-2">
            {achievement.progress} / {achievement.total}
          </p>
        </div>

        {achievement.completed && (
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Completato</h3>
            <p className="text-gray-300 flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              {new Date(achievement.completedDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);