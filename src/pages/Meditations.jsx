import { useNavigate } from 'react-router-dom';
import { FaPlay, FaClock, FaTag, FaLeaf } from 'react-icons/fa';
import { meditations } from '../data/meditations';
import { MeditationIcon } from '../components/MeditationIcon';

export default function Meditations() {
  const navigate = useNavigate();

  const handleSelect = (index) => {
    navigate(`/meditation/${index}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <FaLeaf className="w-12 h-12 text-green-500 mx-auto mb-6 animate-float animate-glow" />
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Meditazioni Guidate
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Scegli tra le nostre meditazioni guidate per iniziare il tuo viaggio verso la pace interiore
          </p>
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meditations.map((m, i) => (
            <div 
              key={i} 
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg 
                       hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 
                       hover:scale-105 group animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`h-52 bg-gradient-to-br ${m.gradient} flex items-center justify-center 
                             group-hover:opacity-90 transition-all duration-500 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                <div className="text-white transform group-hover:scale-110 group-hover:rotate-3 
                             transition-transform duration-500 relative z-10">
                  <MeditationIcon name={m.iconName} className="w-16 h-16 animate-glow" />
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 
                             transition-colors duration-300">
                  {m.title}
                </h3>
                <p className="text-gray-400 mb-6 text-lg">{m.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-400 mb-8">
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-green-500" />
                    {m.duration} min
                  </div>
                  <div className="flex items-center">
                    <FaTag className="mr-2 text-green-500" />
                    {m.theme}
                  </div>
                </div>

                <button 
                  onClick={() => handleSelect(i)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                           py-4 px-6 rounded-xl flex items-center justify-center gap-3 
                           transition-all duration-500 transform hover:scale-105 
                           hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FaPlay className="transition-transform group-hover:translate-x-1" />
                    <span className="text-lg font-semibold">Inizia</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
