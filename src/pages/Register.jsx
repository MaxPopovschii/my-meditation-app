import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaMoon } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Le password non coincidono');
    }

    try {
      setLoading(true);
      await register(formData.email, formData.password, formData.name);
      navigate('/login');
    } catch (err) {
      setError('Errore durante la registrazione: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700/50">
          <div className="text-center mb-8">
            <FaMoon className="w-12 h-12 text-green-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-white mb-2">Crea Account</h2>
            <p className="text-gray-400">Inizia il tuo viaggio mindful</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="name">Nome</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white py-3 px-10 
                           rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Il tuo nome"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white py-3 px-10 
                           rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="La tua email"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white py-3 px-10 
                           rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="La tua password"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2" htmlFor="confirmPassword">
                Conferma Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white py-3 px-10 
                           rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Conferma la password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 
                       rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 
                       transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 
                       disabled:cursor-not-allowed"
            >
              {loading ? 'Registrazione...' : 'Registrati'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Hai già un account?{' '}
            <Link to="/login" className="text-green-500 hover:text-green-400">
              Accedi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}