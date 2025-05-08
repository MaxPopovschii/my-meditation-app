import React from 'react';
import { FaStar } from 'react-icons/fa';
import { GiTreeBranch } from 'react-icons/gi';

export const ProgressSection = ({ stats, onAchievementClick }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Meditation History */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <GiTreeBranch className="text-2xl text-green-500" />
          <h2 className="text-2xl font-bold text-white">Le Tue Meditazioni</h2>
        </div>
        <div className="space-y-4">
          {stats.completedMeditations.map((meditation) => (
            <div
              key={meditation.id}
              className="flex items-center justify-between p-4 bg-gray-700/30 
                     rounded-xl hover:bg-gray-700/50 transition-all duration-300 
                     cursor-pointer"
            >
              <div>
                <h3 className="text-white font-medium">{meditation.name}</h3>
                <p className="text-sm text-gray-400">{meditation.sessions} sessioni</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-medium">{meditation.totalMinutes} min</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaStar className="text-2xl text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.achievements.map((achievement) => (
            <div
              key={achievement.id}
              onClick={() => onAchievementClick(achievement)}
              className="p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 
                     transition-all duration-300 clickable transform 
                     hover:scale-105"
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h3 className="text-white font-medium mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};