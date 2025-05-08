import { useState, useEffect, useCallback } from 'react';
import { FaPlay, FaPause, FaRedo, FaBell, FaVolumeMute, FaVolumeUp, FaMoon, FaLeaf } from 'react-icons/fa';

export default function Timer() {
  const [minutes, setMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPresets, setShowPresets] = useState(false);

  const presets = [
    { time: 5, label: '5 min' },
    { time: 10, label: '10 min' },
    { time: 15, label: '15 min' },
    { time: 20, label: '20 min' },
    { time: 30, label: '30 min' },
  ];

  const playSound = useCallback(() => {
    if (soundEnabled) {
      const audio = new Audio('../../public/sounds/notification.mp3');
      audio.play();
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setShowNotification(true);
          playSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, playSound]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(minutes * 60);
    setShowNotification(false);
  };

  const progress = (timeLeft / (minutes * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl 
                         top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-green-500/20 rounded-full animate-breathe"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-800/40 p-12 rounded-3xl shadow-2xl w-full max-w-md relative backdrop-blur-xl 
                    border border-gray-700/50 hover:shadow-green-500/10 transition-all duration-500">
        {/* Controls Header with cursor-pointer */}
        <div className="absolute top-4 right-4 flex gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 rounded-xl hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer"
          >
            {soundEnabled ? 
              <FaVolumeUp className="text-green-500 w-5 h-5 group-hover:scale-110 transition-transform cursor-pointer" /> : 
              <FaVolumeMute className="text-gray-400 w-5 h-5 group-hover:scale-110 transition-transform cursor-pointer" />
            }
          </button>
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="p-3 rounded-xl hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer"
          >
            <FaBell className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform cursor-pointer" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <FaLeaf className="text-green-500 w-8 h-8 animate-spin-slow" />
          <h2 className="text-3xl font-bold text-white">Timer di Meditazione</h2>
        </div>

        {/* Presets Grid with cursor-pointer */}
        {showPresets && (
          <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-up">
            {presets.map((preset) => (
              <button
                key={preset.time}
                onClick={() => {
                  setMinutes(preset.time);
                  setTimeLeft(preset.time * 60);
                  setShowPresets(false);
                }}
                className="bg-gray-700/50 hover:bg-gray-600/50 text-white py-3 px-4 rounded-xl text-sm 
                         transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-600/50
                         backdrop-blur-sm cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}

        {/* Timer Circle with cursor-pointer */}
        <div className="relative mb-12 group cursor-pointer">
          <div className="w-56 h-56 mx-auto rounded-full border-8 border-gray-700/50 flex items-center 
                       justify-center relative overflow-hidden pulse-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 animate-spin-slow" />
            <div 
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                background: `conic-gradient(from 0deg, ${isRunning ? '#10B981' : '#374151'} ${progress}%, transparent ${progress}%)`,
                transform: 'rotate(-90deg)',
              }}
            />
            <div className="absolute inset-2 rounded-full bg-gray-800/90 backdrop-blur-xl" />
            <div className="relative text-6xl font-mono text-white transition-all duration-300 
                          group-hover:scale-110 group-hover:text-green-400">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Slider with cursor-pointer */}
        <div className="mb-10">
          <label className="block mb-3 text-gray-300 flex items-center justify-between cursor-pointer">
            <span className="text-lg">Durata della Meditazione</span>
            <span className="text-sm text-gray-400">1-60 min</span>
          </label>
          <input
            type="range"
            min={1}
            max={60}
            value={minutes}
            onChange={(e) => {
              const val = Number(e.target.value);
              setMinutes(val);
              setTimeLeft(val * 60);
            }}
            className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer 
                     accent-green-500 hover:accent-green-400 transition-all duration-300"
          />
          <div className="text-center text-gray-400 mt-3 text-lg">{minutes} minuti</div>
        </div>

        {/* Control Buttons with cursor-pointer */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-medium
                     transition-all duration-500 hover:scale-105 relative overflow-hidden group cursor-pointer ${
              isRunning 
                ? 'bg-red-500/80 hover:bg-red-600/80' 
                : 'bg-green-500/80 hover:bg-green-600/80'
            } backdrop-blur-sm`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isRunning ? <><FaPause /> Pausa</> : <><FaPlay /> Avvia</>}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                         translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
          <button
            onClick={resetTimer}
            className="flex items-center gap-2 bg-gray-600/50 hover:bg-gray-700/50 px-8 py-4 rounded-xl 
                     transition-all duration-300 hover:scale-105 backdrop-blur-sm text-lg font-medium cursor-pointer"
          >
            <FaRedo className="text-gray-300" /> Reset
          </button>
        </div>

        {/* Enhanced Notification */}
        {showNotification && (
          <div className="mt-8 p-6 bg-green-500/20 backdrop-blur-sm border border-green-500/30 
                       text-white rounded-xl text-center animate-bounce shadow-lg">
            <FaMoon className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <p className="text-xl font-medium">Meditazione Completata! 🎉</p>
            <p className="text-gray-300 mt-2">Momento di riflettere sulla tua esperienza</p>
          </div>
        )}
      </div>
    </div>
  );
}
