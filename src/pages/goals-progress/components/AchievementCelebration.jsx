import React, { useEffect, useState } from 'react';
import Icon from 'components/AppIcon';

const AchievementCelebration = ({ goal, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      color: ['#2563EB', '#059669', '#7C3AED', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 2
    }));
    setConfetti(particles);

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getAchievementMessage = () => {
    const messages = [
      "Fantastic work! You've crushed your goal!",
      "Amazing achievement! Keep up the great work!",
      "Goal completed! You're on fire!",
      "Incredible! Another milestone reached!",
      "Outstanding! Your dedication is paying off!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'from-primary to-primary-700',
      secondary: 'from-secondary to-secondary-700',
      accent: 'from-accent to-accent-700',
      warning: 'from-warning to-warning-700',
      error: 'from-error to-error-700',
      success: 'from-success to-success-700'
    };
    return colorMap[color] || colorMap.primary;
  };

  const shareAchievement = () => {
    const text = `🎉 Just completed my ${goal.title} goal! ${goal.current} ${goal.unit} achieved! #HealthGoals #HealthSync`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Goal Achievement',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      console.log('Achievement copied to clipboard!');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-75 z-[1400] flex items-center justify-center p-4">
        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map((particle) => (
            <div
              key={particle.id}
              className="absolute animate-bounce"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                backgroundColor: particle.color,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transform: `rotate(${particle.rotation}deg)`,
                animationDelay: `${particle.delay}s`,
                animationDuration: '3s',
                borderRadius: '2px'
              }}
            />
          ))}
        </div>

        {/* Achievement Modal */}
        <div className={`bg-surface rounded-2xl shadow-2xl border border-border max-w-md w-full transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${getColorClasses(goal.color)} p-6 rounded-t-2xl text-white text-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-white bg-opacity-10"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Trophy" size={32} color="white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Goal Achieved!</h2>
              <p className="text-white text-opacity-90">
                {getAchievementMessage()}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Goal Details */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className={`w-12 h-12 bg-${goal.color}-50 rounded-lg flex items-center justify-center`}>
                  <Icon name={goal.icon} size={20} className={`text-${goal.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{goal.title}</h3>
                  <p className="text-text-secondary">
                    {goal.current} / {goal.target} {goal.unit}
                  </p>
                </div>
              </div>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-secondary rounded-lg p-3">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Icon name="Flame" size={16} className="text-warning" />
                    <span className="text-lg font-bold text-text-primary">{goal.streak}</span>
                  </div>
                  <p className="text-xs text-text-secondary">Day Streak</p>
                </div>
                <div className="bg-surface-secondary rounded-lg p-3">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="text-lg font-bold text-text-primary">{goal.type}</span>
                  </div>
                  <p className="text-xs text-text-secondary">Goal Type</p>
                </div>
              </div>

              {/* Motivational Message */}
              <div className="bg-gradient-to-r from-success-50 to-secondary-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Sparkles" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Keep Going!</span>
                </div>
                <p className="text-sm text-text-secondary">
                  You're building amazing healthy habits. Every small step counts towards your bigger health journey!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={shareAchievement}
                className={`w-full bg-gradient-to-r ${getColorClasses(goal.color)} text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2`}
              >
                <Icon name="Share2" size={18} />
                <span>Share Achievement</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => console.log('Setting new goal')}
                  className="bg-surface-secondary text-text-primary py-2 px-4 rounded-lg font-medium hover:bg-border transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Icon name="Target" size={16} />
                  <span>New Goal</span>
                </button>
                <button
                  onClick={handleClose}
                  className="bg-surface-secondary text-text-primary py-2 px-4 rounded-lg font-medium hover:bg-border transition-colors duration-200"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementCelebration;