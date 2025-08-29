import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const GoalProgressIndicator = ({ goals }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        text: 'text-primary',
        icon: 'text-primary',
        progress: 'bg-primary'
      },
      secondary: {
        bg: 'bg-secondary-50',
        text: 'text-secondary',
        icon: 'text-secondary',
        progress: 'bg-secondary'
      },
      accent: {
        bg: 'bg-accent-50',
        text: 'text-accent',
        icon: 'text-accent',
        progress: 'bg-accent'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const getMotivationalMessage = (percentage) => {
    if (percentage >= 100) return "🎉 Goal achieved! Great work!";
    if (percentage >= 80) return "💪 Almost there! Keep pushing!";
    if (percentage >= 50) return "🚀 You're halfway there!";
    if (percentage >= 25) return "📈 Good progress, keep going!";
    return "🌟 Every step counts!";
  };

  return (
    <div className="bg-surface rounded-lg shadow-light border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Goal Progress</h3>
        </div>
        <Link
          to="/goals-progress"
          className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200"
        >
          Manage goals
        </Link>
      </div>

      {/* Goals List */}
      <div className="p-4 space-y-4">
        {goals.map((goal) => {
          const colors = getColorClasses(goal.color);
          const isCompleted = goal.percentage >= 100;
          
          return (
            <div
              key={goal.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-light ${
                isCompleted 
                  ? 'bg-success-50 border-success-100' 
                  : `${colors.bg} border-border`
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${isCompleted ? 'bg-success' : 'bg-surface'}`}>
                  <Icon 
                    name={isCompleted ? 'CheckCircle' : goal.icon} 
                    size={16} 
                    className={isCompleted ? 'text-white' : colors.icon} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-text-primary">
                      {goal.title}
                    </h4>
                    <span className={`text-xs font-medium ${isCompleted ? 'text-success' : colors.text}`}>
                      {goal.percentage}%
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                      <span>{goal.current} / {goal.target}</span>
                      <span>{goal.timeframe}</span>
                    </div>
                    <div className="w-full bg-border-light rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-success' : colors.progress
                        }`}
                        style={{ width: `${Math.min(goal.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      {getMotivationalMessage(goal.percentage)}
                    </span>
                    {!isCompleted && (
                      <button className={`text-xs font-medium ${colors.text} hover:underline transition-all duration-200`}>
                        Adjust goal
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Goal */}
      <div className="p-4 border-t border-border">
        <Link
          to="/goals-progress"
          className="flex items-center justify-center space-x-2 w-full py-3 border-2 border-dashed border-border rounded-lg text-text-secondary hover:text-primary hover:border-primary transition-all duration-200"
        >
          <Icon name="Plus" size={16} />
          <span className="text-sm font-medium">Add new goal</span>
        </Link>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-surface-secondary rounded-b-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-text-primary">
              {goals.filter(g => g.percentage >= 100).length}
            </p>
            <p className="text-xs text-text-secondary">Completed</p>
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">
              {goals.filter(g => g.percentage >= 50 && g.percentage < 100).length}
            </p>
            <p className="text-xs text-text-secondary">In Progress</p>
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">
              {Math.round(goals.reduce((acc, goal) => acc + goal.percentage, 0) / goals.length)}%
            </p>
            <p className="text-xs text-text-secondary">Avg Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalProgressIndicator;