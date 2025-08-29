import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const AIInsightsPanel = () => {
  const insights = [
    {
      id: 'sleep-pattern',
      type: 'achievement',
      title: 'Sleep Pattern Improvement',
      message: `Your sleep quality has improved by 15% this week. The consistent bedtime routine you've established is showing positive results.`,confidence: 92,actionable: true,priority: 'high',icon: 'TrendingUp',color: 'success'
    },
    {
      id: 'heart-rate-anomaly',type: 'alert',title: 'Heart Rate Variability',message: `Detected elevated resting heart rate during afternoon hours. Consider stress management techniques or consult your healthcare provider.`,confidence: 87,actionable: true,priority: 'medium',icon: 'AlertTriangle',color: 'warning'
    },
    {
      id: 'activity-recommendation',type: 'recommendation',title: 'Activity Optimization',message: `Based on your activity patterns, adding 15 minutes of morning cardio could help you reach your daily step goal more consistently.`,confidence: 78,actionable: true,priority: 'low',icon: 'Target',color: 'primary'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: {
        bg: 'bg-success-50',
        text: 'text-success',
        icon: 'text-success',
        border: 'border-success-100'
      },
      warning: {
        bg: 'bg-warning-50',
        text: 'text-warning',
        icon: 'text-warning',
        border: 'border-warning-100'
      },
      primary: {
        bg: 'bg-primary-50',
        text: 'text-primary',
        icon: 'text-primary',
        border: 'border-primary-100'
      },
      error: {
        bg: 'bg-error-50',
        text: 'text-error',
        icon: 'text-error',
        border: 'border-error-100'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-surface rounded-lg shadow-light border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">AI Health Insights</h3>
        </div>
        <Link
          to="/ai-health-insights"
          className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200"
        >
          View all
        </Link>
      </div>

      {/* Insights List */}
      <div className="p-4 space-y-4">
        {insights.map((insight) => {
          const colors = getColorClasses(insight.color);
          
          return (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${colors.bg} ${colors.border} hover:shadow-light transition-shadow duration-200`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-surface`}>
                  <Icon name={insight.icon} size={16} className={colors.icon} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-text-primary">
                      {insight.title}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={12} className="text-accent" />
                      <span className="text-xs text-text-secondary">
                        {insight.confidence}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3">
                    {insight.message}
                  </p>
                  
                  {insight.actionable && (
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                        {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                      </span>
                      <button className={`text-xs font-medium ${colors.text} hover:underline transition-all duration-200`}>
                        Take action
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-surface-secondary rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <span className="text-sm text-text-secondary">
              Powered by AI Health Analytics
            </span>
          </div>
          <Link
            to="/ai-health-insights"
            className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200"
          >
            <span>Get personalized coaching</span>
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;