import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Meditations = lazy(() => import('./pages/Meditations'));
const Timer = lazy(() => import('./pages/Timer'));
const Sounds = lazy(() => import('./pages/Sounds'));
const MeditationSession = lazy(() => import('./pages/MeditationSession'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Auth Route component
const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              } />
              <Route path="/register" element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              } />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Navbar />
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/meditations" element={
                <ProtectedRoute>
                  <Navbar />
                  <Meditations />
                </ProtectedRoute>
              } />
              <Route path="/meditation/:id" element={
                <ProtectedRoute>
                  <Navbar />
                  <MeditationSession />
                </ProtectedRoute>
              } />
              <Route path="/timer" element={
                <ProtectedRoute>
                  <Navbar />
                  <Timer />
                </ProtectedRoute>
              } />
              <Route path="/sounds" element={
                <ProtectedRoute>
                  <Navbar />
                  <Sounds />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Navbar />
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
