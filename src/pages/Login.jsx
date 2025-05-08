import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaMoon } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

// Mock user data - you can expand this as needed
const MOCK_USERS = [
  {
    email: 'maxpopovschii@gmail.com',
    password: 'Dominique1!',
    name: 'Max Popovschii'
  }, 
  {
    email: 'example@example.com',
    password: '123',
    name: 'Sergio Matarella'
  }
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check credentials against mock data
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);

      if (user) {
        // Store user data and update auth context
        const userData = {
          email: user.email,
          name: user.name
        };
        
        localStorage.setItem('user-token', 'mock-jwt-token');
        localStorage.setItem('user-data', JSON.stringify(userData));
        
        // Update auth context
        await login(userData);
        
        navigate('/');
      } else {
        setError('Email o password non validi');
      }
    } catch (err) {
      setError('Errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                    flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl 
                      border border-gray-700/50">
          <div className="text-center mb-8">
            <FaMoon className="w-12 h-12 text-green-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-white mb-2">Bentornato</h2>
            <p className="text-gray-400">Accedi al tuo percorso mindful</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                   text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white py-3 px-10 
                           rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="La tua email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white py-3 px-10 
                           rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="La tua password"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                       py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 
                       transition-all duration-300 hover:scale-[1.02] disabled:opacity-50
                       disabled:cursor-not-allowed"
            >
              {loading ? 'Accesso in corso...' : 'Accedi'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Non hai un account?{' '}
            <Link to="/register" className="text-green-500 hover:text-green-400">
              Registrati
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}