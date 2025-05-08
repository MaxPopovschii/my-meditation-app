import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export const ProfileEditModal = ({ profile, onClose, onSave }) => {
  const [editedProfile, setEditedProfile] = useState(profile);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedProfile.name.trim()) {
      setError('Il nome è obbligatorio');
      return;
    }
    onSave(editedProfile);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 transform 
                   transition-all duration-300 animate-fade-up">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">Modifica Profilo</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <div>
            <label className="block text-gray-300 mb-2">Nome</label>
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => {
                setError('');
                setEditedProfile({...editedProfile, name: e.target.value});
              }}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 
                     focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Il tuo nome"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Avatar</label>
            <div className="grid grid-cols-5 gap-2">
              {['😌', '🧘', '🌱', '🌟', '🎯'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setEditedProfile({...editedProfile, avatar: emoji})}
                  className={`text-2xl p-2 rounded-lg transition-all duration-200 
                           ${editedProfile.avatar === emoji 
                             ? 'bg-green-500/20 scale-110' 
                             : 'hover:bg-gray-700/50'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={editedProfile.email}
              onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 
                     focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Obiettivo</label>
            <textarea
              value={editedProfile.goal}
              onChange={(e) => setEditedProfile({...editedProfile, goal: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 
                     focus:ring-2 focus:ring-green-500 focus:outline-none"
              rows="3"
              placeholder="Il tuo obiettivo di meditazione"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg 
                     hover:bg-gray-600 transition-colors duration-300"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 
                     text-white py-2 px-4 rounded-lg transition-all duration-300 
                     hover:shadow-lg hover:shadow-green-500/20 hover:scale-105"
            >
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};