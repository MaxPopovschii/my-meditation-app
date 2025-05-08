import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FaHome,
  FaClock,
  FaHeadphones,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaLeaf
} from 'react-icons/fa';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white">Mindful</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" icon={<FaHome />} text="Home" />
            <NavLink to="/meditations" icon={<FaLeaf />} text="Meditazioni" />
            <NavLink to="/timer" icon={<FaClock />} text="Timer" />
            <NavLink to="/sounds" icon={<FaHeadphones />} text="Suoni" />
            
            {/* Profile Dropdown */}
            <div className="relative ml-3" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white 
                         px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
              >
                <FaUser className="w-5 h-5" />
                <span>{user?.name || 'Profilo'}</span>
              </button>

              {/* Dropdown Menu with improved visibility */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg 
                              bg-gray-800 ring-1 ring-black ring-opacity-5 z-50
                              transform opacity-100 scale-100 transition-all duration-200">
                  <div className="py-1" role="menu">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 
                               hover:bg-gray-700 hover:text-white transition-colors duration-150"
                      onClick={() => setIsProfileOpen(false)}
                      role="menuitem"
                    >
                      <FaUser className="mr-2 w-4 h-4" />
                      Il mio profilo
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 
                               hover:bg-gray-700 hover:text-white transition-colors duration-150"
                      role="menuitem"
                    >
                      <FaSignOutAlt className="mr-2 w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" icon={<FaHome />} text="Home" />
            <MobileNavLink to="/meditations" icon={<FaLeaf />} text="Meditazioni" />
            <MobileNavLink to="/timer" icon={<FaClock />} text="Timer" />
            <MobileNavLink to="/sounds" icon={<FaHeadphones />} text="Suoni" />
            <MobileNavLink to="/profile" icon={<FaUser />} text="Profilo" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium 
                       text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// Helper components for navigation links
const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-gray-300 hover:text-white 
               px-3 py-2 rounded-md text-sm font-medium"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-gray-300 hover:text-white 
               block px-3 py-2 rounded-md text-base font-medium"
  >
    {icon}
    <span>{text}</span>
  </Link>
);
