import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';

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

function App() {
  return (
    <Router>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <main className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meditations" element={<Meditations />} />
              <Route path="/meditation/:id" element={<MeditationSession />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/sounds" element={<Sounds />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
