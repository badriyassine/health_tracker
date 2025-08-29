import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const EmergencyAlert = ({ alert }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed || alert.dismissed) return null;

  const getSeverityClasses = (severity) => {
    const severityMap = {
      high: {
        bg: 'bg-error-50',
        border: 'border-error-200',
        text: 'text-error',
        icon: 'text-error',
        button: 'bg-error text-white hover:bg-error-700'
      },
      medium: {
        bg: 'bg-warning-50',
        border: 'border-warning-200',
        text: 'text-warning',
        icon: 'text-warning',
        button: 'bg-warning text-white hover:bg-warning-700'
      },
      low: {
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        text: 'text-primary',
        icon: 'text-primary',
        button: 'bg-primary text-white hover:bg-primary-700'
      }
    };
    return severityMap[severity] || severityMap.medium;
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'AlertTriangle';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return timestamp.toLocaleDateString();
  };

  const classes = getSeverityClasses(alert.severity);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  const handleAction = () => {
    console.log('Taking action for alert:', alert.id);
  };

  return (
    <div className={`mx-4 sm:mx-6 lg:mx-8 mt-4 p-4 rounded-lg border-2 ${classes.bg} ${classes.border} shadow-medium animate-pulse`}>
      <div className="flex items-start space-x-3">
        {/* Alert Icon */}
        <div className="flex-shrink-0">
          <div className="p-2 bg-surface rounded-lg">
            <Icon 
              name={getAlertIcon(alert.type)} 
              size={20} 
              className={classes.icon} 
            />
          </div>
        </div>

        {/* Alert Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm font-semibold ${classes.text}`}>
              {alert.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-text-tertiary">
                {formatTimestamp(alert.timestamp)}
              </span>
              <button
                onClick={handleDismiss}
                className="p-1 text-text-tertiary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          </div>
          
          <p className="text-sm text-text-secondary mb-3">
            {alert.message}
          </p>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAction}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-all duration-200 ${classes.button}`}
            >
              Take Action
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-xs font-medium text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-surface-secondary transition-all duration-200"
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Severity Indicator */}
        <div className="flex-shrink-0">
          <div className={`w-3 h-3 rounded-full ${alert.severity === 'high' ? 'bg-error' : alert.severity === 'medium' ? 'bg-warning' : 'bg-primary'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;