import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GiMeditation, GiLotus, GiNightSky } from 'react-icons/gi';
import { FaHeadphones, FaClock, FaLeaf, FaWater, FaMoon, FaSun, FaYinYang, FaStarOfLife } from 'react-icons/fa';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  // Debounced scroll handler with throttling
  const handleScroll = useCallback(() => {
    let ticking = false;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        setScrollY(window.pageYOffset * 0.5); // Reduced multiplier for smoother effect
        ticking = false;
      });
      ticking = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Memoize positions to prevent recalculation
  const { starsPositions, particlesPositions } = useMemo(() => ({
    starsPositions: Array(30).fill().map(() => ({ // Reduced number of stars
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
    })),
    particlesPositions: Array(20).fill().map(() => ({ // Reduced number of particles
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    })),
  }), []);

  // Memoize transform styles
  const getTransformStyle = useCallback((multiplier = 0.3) => {
    const yOffset = Math.min(scrollY * multiplier, 60); // Limited max translation
    return {
      transform: `translate3d(0, ${yOffset}px, 0)`, // Using translate3d for hardware acceleration
      willChange: 'transform',
    };
  }, [scrollY]);

  const features = [
    {
      icon: <GiMeditation className="w-8 h-8" />,
      title: "Meditazioni Guidate",
      description: "Scopri la nostra collezione di meditazioni per ogni momento",
      link: "/meditations",
      gradient: "from-green-500 to-emerald-700"
    },
    {
      icon: <FaHeadphones className="w-8 h-8" />,
      title: "Suoni Rilassanti",
      description: "Immergiti in ambienti sonori naturali e rilassanti",
      link: "/sounds",
      gradient: "from-blue-500 to-indigo-700"
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "Timer Personalizzato",
      description: "Imposta il tuo timer per sessioni di meditazione libera",
      link: "/timer",
      gradient: "from-purple-500 to-violet-700"
    }
  ];

  return (
    <div className="min-h-screen cosmic-background overflow-hidden">
      {/* Optimized Stars Background */}
      <div className="fixed inset-0 pointer-events-none">
        {starsPositions.map((pos, i) => (
          <FaStarOfLife
            key={i}
            className="absolute text-white/20"
            style={{
              ...pos,
              fontSize: pos.size,
              ...getTransformStyle(0.2),
            }}
          />
        ))}
      </div>

      {/* Hero Section with Optimized Animation */}
      <div className="relative min-h-[90vh] flex items-center justify-center">
        <div 
          className="relative z-10 text-center px-4 py-20" 
          style={getTransformStyle(0.1)}
        >
          <div className="text-green-500 text-8xl mb-12 relative">
            <GiLotus className="inline-block animate-float animate-glow transform hover:scale-110 transition-transform duration-300" />
            <div className="absolute -inset-8 bg-green-500 opacity-20 blur-2xl rounded-full" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-white 
                           relative inline-block transform hover:scale-105 transition-all duration-300">
              Trova la Tua
            </span>{" "}
            <span className="text-green-400 relative inline-block group transform hover:scale-105 transition-all duration-300">
              Pace Interiore
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent 
                             transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed
                     opacity-0 animate-fadeIn hover:text-gray-200 transition-colors duration-300"
             style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            Inizia il tuo viaggio verso la consapevolezza e il benessere mentale
          </p>
          <Link
            to="/meditations"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-16 py-6 rounded-xl 
                     text-xl font-semibold transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] 
                     hover:scale-110 hover:from-green-400 hover:to-emerald-500 relative overflow-hidden group
                     transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-3">
              Inizia Ora
              <FaLeaf className="inline-block transition-transform group-hover:rotate-[360deg] duration-700" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Link>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group bg-gray-800/30 backdrop-blur-xl rounded-2xl p-10 
                       hover:bg-gray-800/50 transition-all duration-500 hover:scale-105
                       hover:shadow-[0_0_50px_rgba(0,0,0,0.3)] transform hover:-translate-y-2"
            >
              <div className={`inline-block p-6 rounded-xl bg-gradient-to-br ${feature.gradient} 
                            mb-8 group-hover:scale-110 transition-transform duration-500
                            shadow-lg group-hover:shadow-2xl animate-glow`}>
                {feature.icon}
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4 group-hover:text-green-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Enhanced Quote Section */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg py-32">
        <div className="max-w-4xl mx-auto px-4 text-center transform hover:scale-105 transition-transform duration-500">
          <FaWater className="text-green-500 text-6xl mx-auto mb-12 animate-float animate-glow" />
          <blockquote className="text-4xl md:text-5xl text-gray-200 italic leading-relaxed mb-8">
            "La pace viene dall'interno. Non cercarla all'esterno."
          </blockquote>
          <cite className="text-gray-400 mt-8 block text-xl">- Buddha</cite>
        </div>
      </div>
    </div>
  );
}
