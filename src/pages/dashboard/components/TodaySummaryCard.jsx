import React from 'react';
import Icon from 'components/AppIcon';

const TodaySummaryCard = ({ metric }) => {
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
      },
      warning: {
        bg: 'bg-warning-50',
        text: 'text-warning',
        icon: 'text-warning',
        progress: 'bg-warning'
      },
      error: {
        bg: 'bg-error-50',
        text: 'text-error',
        icon: 'text-error',
        progress: 'bg-error'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const colors = getColorClasses(metric.color);

  return (
    <div className="bg-surface rounded-lg shadow-light border border-border p-4 hover:shadow-medium transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Icon name={metric.icon} size={20} className={colors.icon} />
        </div>
        <div className="text-right">
          <span className={`text-xs font-medium ${colors.text}`}>
            {metric.trend}
          </span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-text-primary">
          {metric.value}
        </h3>
        <p className="text-sm text-text-secondary">
          {metric.title}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
          <span>Target: {metric.target}</span>
          <span>{metric.percentage}%</span>
        </div>
        <div className="w-full bg-border-light rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${colors.progress}`}
            style={{ width: `${Math.min(metric.percentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TodaySummaryCard;