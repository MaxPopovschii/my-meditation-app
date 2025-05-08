import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaRedo, FaArrowLeft } from 'react-icons/fa';
import { meditations } from '../data/meditations';

export default function MeditationSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meditation = meditations[id];

  if (!meditation) {
    return <div>Meditation not found</div>;
  }

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const audioRef = useRef(null);

  const duration = parseInt(meditation.duration) * 60; 

  useEffect(() => {
    setTimeLeft(duration);
    audioRef.current = new Audio(meditation.audioSrc);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [duration, meditation.audioSrc]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          audioRef.current.pause();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const togglePlay = () => {
    if (isRunning) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/meditations')}
          className="mb-8 text-gray-400 hover:text-white flex items-center gap-2 cursor-pointer 
                 transition-colors duration-300"
        >
          <FaArrowLeft /> Torna alle meditazioni
        </button>

        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl">{meditation.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{meditation.title}</h1>
              <p className="text-gray-400">{meditation.description}</p>
            </div>
          </div>

          <div className="relative mb-12">
            <div className="w-48 h-48 mx-auto rounded-full border-8 border-gray-700 flex items-center 
                       justify-center relative">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, #10B981 ${progress}%, transparent ${progress}%)`,
                  transform: 'rotate(-90deg)',
                }}
              />
              <div className="absolute inset-2 rounded-full bg-gray-800" />
              <div className="relative text-5xl font-mono text-white">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={togglePlay}
              className={`px-8 py-4 rounded-lg flex items-center gap-2 cursor-pointer 
                     transition-all duration-300 hover:scale-105 ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white transition-colors`}
            >
              {isRunning ? <><FaPause /> Pausa</> : <><FaPlay /> Inizia</>}
            </button>
            <button
              onClick={() => {
                setTimeLeft(duration);
                setIsRunning(false);
                audioRef.current.currentTime = 0;
              }}
              className="px-8 py-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-white 
                     flex items-center gap-2 cursor-pointer transition-all duration-300 
                     hover:scale-105"
            >
              <FaRedo /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}