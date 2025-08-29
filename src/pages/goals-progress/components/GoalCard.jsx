import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GoalCard = ({ goal, onUpdate, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(goal.current);

  const getProgressPercentage = () => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        text: 'text-primary',
        progress: 'bg-primary',
        ring: 'ring-primary-100'
      },
      secondary: {
        bg: 'bg-secondary-50',
        text: 'text-secondary',
        progress: 'bg-secondary',
        ring: 'ring-secondary-100'
      },
      accent: {
        bg: 'bg-accent-50',
        text: 'text-accent',
        progress: 'bg-accent',
        ring: 'ring-accent-100'
      },
      warning: {
        bg: 'bg-warning-50',
        text: 'text-warning',
        progress: 'bg-warning',
        ring: 'ring-warning-100'
      },
      error: {
        bg: 'bg-error-50',
        text: 'text-error',
        progress: 'bg-error',
        ring: 'ring-error-100'
      },
      success: {
        bg: 'bg-success-50',
        text: 'text-success',
        progress: 'bg-success',
        ring: 'ring-success-100'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const handleQuickUpdate = (increment) => {
    const newValue = Math.max(0, goal.current + increment);
    onUpdate(goal.id, newValue);
  };

  const handleEditSubmit = () => {
    onUpdate(goal.id, parseFloat(editValue));
    setIsEditing(false);
  };

  const isCompleted = goal.current >= goal.target;
  const progressPercentage = getProgressPercentage();
  const colors = getColorClasses(goal.color);

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 transition-all duration-200 hover:shadow-light ${
      isCompleted ? 'ring-2 ' + colors.ring : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
            <Icon name={goal.icon} size={20} className={colors.text} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{goal.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span className="capitalize">{goal.type}</span>
              <span>•</span>
              <span className={getDifficultyColor(goal.difficulty)}>
                {goal.difficulty}
              </span>
              {goal.streak > 0 && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Flame" size={12} className="text-warning" />
                    <span>{goal.streak} day streak</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isCompleted && (
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
          )}
          <button
            onClick={() => onToggle(goal.id)}
            className="p-2 text-text-secondary hover:text-primary transition-colors duration-200"
          >
            <Icon name="MoreVertical" size={16} />
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-20 px-2 py-1 border border-border rounded text-sm"
                  step="0.1"
                  min="0"
                />
                <button
                  onClick={handleEditSubmit}
                  className="p-1 text-success hover:bg-success-50 rounded transition-colors duration-200"
                >
                  <Icon name="Check" size={14} />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 text-error hover:bg-error-50 rounded transition-colors duration-200"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-lg font-bold text-text-primary hover:text-primary transition-colors duration-200"
              >
                {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
              </button>
            )}
          </div>
          <span className="text-sm font-medium text-text-secondary">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-2 mb-3">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${colors.progress}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Quick Actions */}
        {!isEditing && goal.isActive && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuickUpdate(-1)}
                className="w-8 h-8 bg-surface-secondary hover:bg-border rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="Minus" size={14} />
              </button>
              <button
                onClick={() => handleQuickUpdate(1)}
                className={`w-8 h-8 ${colors.bg} hover:${colors.progress} hover:text-white rounded-full flex items-center justify-center transition-all duration-200`}
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>
            <span className="text-xs text-text-secondary">
              Updated {goal.lastUpdated}
            </span>
          </div>
        )}

        {/* Completed Goal Info */}
        {!goal.isActive && goal.completedDate && (
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} />
              <span>Completed on {new Date(goal.completedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Trophy" size={14} className="text-warning" />
              <span>{goal.streak} days</span>
            </div>
          </div>
        )}
      </div>

      {/* Achievement Badge */}
      {isCompleted && goal.isActive && (
        <div className="bg-success-50 border border-success-100 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Trophy" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Goal Achieved!</span>
          </div>
          <p className="text-xs text-success-700 mt-1">
            Great job! You've reached your {goal.type} target.
          </p>
        </div>
      )}
    </div>
  );
};

export default GoalCard;