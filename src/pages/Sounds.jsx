import { useRef, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaWater } from 'react-icons/fa';
import { RiSoundModuleFill } from 'react-icons/ri';

export default function Sounds() {
  const sounds = [
    { name: 'Pioggia', src: '/sounds/rain.mp3', icon: '🌧️' },
    { name: 'Fuoco', src: '/sounds/fire.mp3', icon: '🔥' },
    { name: 'Bosco', src: '/sounds/forest.mp3', icon: '🌳' },
    { name: 'Onde', src: '/sounds/waves.mp3', icon: '🌊' },
    { name: 'Meditazione', src: '/sounds/meditation.mp3', icon: '🧘' },
  ];

  const audioRefs = useRef([]);
  const [playing, setPlaying] = useState(Array(sounds.length).fill(false));
  const [volumes, setVolumes] = useState(Array(sounds.length).fill(0.5));

  const toggleSound = (index) => {
    const newState = [...playing];
    newState[index] = !newState[index];
    setPlaying(newState);

    const audio = audioRefs.current[index];
    if (audio) {
      newState[index] ? audio.play() : audio.pause();
    }
  };

  const handleVolumeChange = (index, value) => {
    const newVolumes = [...volumes];
    newVolumes[index] = value;
    setVolumes(newVolumes);

    const audio = audioRefs.current[index];
    if (audio) {
      audio.volume = value;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animation: `wave ${Math.random() * 5 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <RiSoundModuleFill className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-wave" />
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 
                        text-transparent bg-clip-text">
            Suoni Rilassanti
          </h2>
          <p className="text-xl text-gray-400">
            Crea la tua atmosfera perfetta miscelando diversi suoni ambientali
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sounds.map((sound, i) => (
            <div
              key={i}
              className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-lg 
                       hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-500 
                       hover:scale-105 group animate-fade-up border border-gray-700/50 
                       cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => toggleSound(i)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300 
                                relative animate-wave cursor-pointer" 
                        style={{ animationDelay: `${i * 0.2}s` }}>
                    {sound.icon}
                  </span>
                  <span className="text-2xl font-medium bg-gradient-to-r from-white to-gray-300 
                                text-transparent bg-clip-text group-hover:from-blue-400 
                                group-hover:to-purple-400 transition-all duration-300 cursor-pointer">
                    {sound.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSound(i);
                  }}
                  className={`p-4 rounded-full transition-all duration-300 relative 
                           hover:scale-110 pulse-ring cursor-pointer ${
                    playing[i]
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {playing[i] ? <FaPause /> : <FaPlay />}
                </button>
              </div>

              <div className="flex items-center space-x-4 relative">
                <FaVolumeUp className={`transition-colors duration-300 cursor-pointer
                                    ${playing[i] ? 'text-blue-400' : 'text-gray-400'}`} />
                <div className="relative w-full h-2 bg-gray-700/50 rounded-full overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                              blur-sm transform -translate-x-full animate-wave" 
                       style={{ animationDelay: '1s' }} />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volumes[i]}
                    onChange={(e) => handleVolumeChange(i, parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                             transition-all duration-300"
                    style={{ width: `${volumes[i] * 100}%` }}
                  />
                </div>
              </div>

              <audio
                loop
                src={sound.src}
                ref={(el) => (audioRefs.current[i] = el)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
