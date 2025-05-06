import { Link, useLocation } from 'react-router-dom';
import { GiMeditation } from 'react-icons/gi';
import { FaHome, FaClock, FaHeadphones } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome className="w-4 h-4" /> },
    { path: '/meditations', label: 'Meditazioni', icon: <GiMeditation className="w-4 h-4" /> },
    { path: '/timer', label: 'Timer', icon: <FaClock className="w-4 h-4" /> },
    { path: '/sounds', label: 'Suoni', icon: <FaHeadphones className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-white flex items-center gap-2 hover:text-green-400 
                     transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-2xl bg-gradient-to-r from-green-400 to-emerald-500 
                          text-transparent bg-clip-text">🧘</span>
            <span className="bg-gradient-to-r from-white to-gray-300 
                          text-transparent bg-clip-text">Meditazione</span>
          </Link>

          <div className="flex gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                  group relative overflow-hidden ${
                    location.pathname === item.path 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'text-gray-400 hover:text-white border border-transparent hover:border-gray-700'
                  }`}
              >
                <span className="relative z-10 transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="relative z-10 transform group-hover:translate-x-1 transition-transform">
                  {item.label}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
