import React from 'react';
import { FaCalendar } from 'react-icons/fa';

export const CalendarButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-600 
             text-white p-4 rounded-full shadow-lg hover:shadow-green-500/20 
             transition-all duration-300 transform hover:scale-110 z-50"
    aria-label="Open Calendar"
  >
    <FaCalendar className="text-2xl" />
  </button>
);