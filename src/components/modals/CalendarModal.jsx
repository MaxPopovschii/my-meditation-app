import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FaTimes, FaClock } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';

export const CalendarModal = ({ 
  onClose, 
  selectedDate, 
  setSelectedDate, 
  plannedSessions,
  onAddSession,
  onDeleteSession 
}) => {
  const [newSession, setNewSession] = useState({
    title: '',
    duration: 15,
    type: 'Respiro Consapevole',
    time: '08:00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const [hours, minutes] = newSession.time.split(':');
    const sessionDate = new Date(selectedDate);
    sessionDate.setHours(parseInt(hours), parseInt(minutes));

    onAddSession({
      ...newSession,
      date: sessionDate.toISOString()
    });

    setNewSession({
      title: '',
      duration: 15,
      type: 'Respiro Consapevole',
      time: '08:00'
    });
  };

  const sessionsForDay = plannedSessions.filter(session => 
    new Date(session.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 transform 
                   transition-all duration-300 animate-fade-up">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">Pianifica le tue sessioni</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full bg-gray-700/50 border-0 rounded-xl p-4"
              tileClassName={({ date }) => {
                const hasSession = plannedSessions.some(
                  session => new Date(session.date).toDateString() === date.toDateString()
                );
                return hasSession ? 'bg-green-500/20 rounded-full font-bold' : '';
              }}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-700/30 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                {selectedDate.toLocaleDateString('it-IT', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome della sessione"
                  value={newSession.title}
                  onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                  className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-2 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    value={newSession.time}
                    onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                    className="bg-gray-700/50 text-white rounded-lg px-4 py-2 
                           focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                  <div className="relative">
                    <input
                      type="number"
                      min="5"
                      max="120"
                      value={newSession.duration}
                      onChange={(e) => setNewSession({
                        ...newSession, 
                        duration: Math.max(5, Math.min(120, Number(e.target.value)))
                      })}
                      className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-2 
                             focus:ring-2 focus:ring-green-500 focus:outline-none"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 
                                 text-gray-400 text-sm">
                      min
                    </span>
                  </div>
                </div>

                <select
                  value={newSession.type}
                  onChange={(e) => setNewSession({...newSession, type: e.target.value})}
                  className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-2 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option>Respiro Consapevole</option>
                  <option>Meditazione Guidata</option>
                  <option>Body Scan</option>
                  <option>Mindfulness</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 
                         text-white py-2 px-4 rounded-lg transition-all duration-300 
                         hover:shadow-lg hover:shadow-green-500/20 hover:scale-105"
                >
                  Aggiungi Sessione
                </button>
              </form>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {sessionsForDay.map(session => (
                <div
                  key={session.id}
                  className="flex items-center justify-between bg-gray-700/30 p-4 
                         rounded-xl hover:bg-gray-700/50 transition-all duration-300 
                         group"
                >
                  <div>
                    <h4 className="text-white font-medium">{session.title}</h4>
                    <div className="text-sm text-gray-400 space-x-4">
                      <span>{new Date(session.date).toLocaleTimeString('it-IT', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                      <span>{session.type}</span>
                      <span>{session.duration} min</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteSession(session.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 
                           hover:text-red-500 transition-all duration-300"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              {sessionsForDay.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  Nessuna sessione pianificata per questo giorno
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};