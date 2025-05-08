import { useState, useEffect } from 'react';
import { FaCalendar } from 'react-icons/fa';
import { AchievementModal } from '../components/modals/AchievementModal';
import { CalendarModal } from '../components/modals/CalendarModal';
import { ProfileEditModal } from '../components/modals/ProfileEditModal';
import { ProfileHeader } from '../components/sections/ProfileHeader';
import { StatsGrid } from '../components/sections/StatsGrid';
import { ProgressSection } from '../components/sections/ProgressSection';
import { SAMPLE_MEDITATIONS, ENHANCED_ACHIEVEMENTS, INITIAL_PLANNED_SESSIONS } from '../constants/profileData';
import { useStatsStorage } from '../hooks/useStatsStorage';
import { useActivitySimulation } from '../hooks/useActivitySimulation';

export default function Profile() {
  // State declarations with proper initial values
  const [stats, setStats] = useState(() => ({
    totalSessions: 28,
    totalMinutes: 400,
    streak: 5,
    lastSession: new Date().toISOString(),
    completedMeditations: SAMPLE_MEDITATIONS,
    achievements: ENHANCED_ACHIEVEMENTS,
    level: 3,
    experience: 75
  }));

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [plannedSessions, setPlannedSessions] = useState(INITIAL_PLANNED_SESSIONS);
  const [userProfile, setUserProfile] = useState({
    name: 'Il Tuo Percorso Mindful',
    avatar: '😌',
    goal: 'Traccia il tuo progresso e celebra i tuoi successi',
    email: 'user@example.com'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Use hooks
  useStatsStorage(stats, setStats);
  useActivitySimulation(setStats);

  // Update effect for animations
  useEffect(() => {
    if (stats.totalSessions > 0) {
      setIsUpdating(true);
      const timeout = setTimeout(() => setIsUpdating(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [stats]);

  // Handle profile update
  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setIsEditingProfile(false);
  };

  // Handle achievement click
  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
  };

  // Handle session planning
  const handleAddSession = (newSession) => {
    setPlannedSessions(prev => [...prev, { ...newSession, id: Date.now() }]);
  };

  // Handle session deletion
  const handleDeleteSession = (sessionId) => {
    setPlannedSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      {/* Ambient Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-green-500/5 rounded-full blur-3xl animate-float"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Calendar Button */}
        <button
          onClick={() => setShowCalendar(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-600 
                   text-white p-4 rounded-full shadow-lg hover:shadow-green-500/20 
                   transition-all duration-300 transform hover:scale-110 z-50"
        >
          <FaCalendar className="text-2xl" />
        </button>

        {/* Profile Header */}
        <ProfileHeader
          userProfile={userProfile}
          stats={stats}
          onEditClick={() => setIsEditingProfile(true)}
        />

        {/* Stats Grid */}
        <StatsGrid stats={stats} isUpdating={isUpdating} />

        {/* Progress Section */}
        <ProgressSection
          stats={stats}
          isUpdating={isUpdating}
          onAchievementClick={handleAchievementClick}
        />

        {/* Modals */}
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}

        {showCalendar && (
          <CalendarModal
            onClose={() => setShowCalendar(false)}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            plannedSessions={plannedSessions}
            onAddSession={handleAddSession}
            onDeleteSession={handleDeleteSession}
          />
        )}

        {isEditingProfile && (
          <ProfileEditModal
            profile={userProfile}
            onClose={() => setIsEditingProfile(false)}
            onSave={handleProfileUpdate}
          />
        )}
      </div>
    </div>
  );
}