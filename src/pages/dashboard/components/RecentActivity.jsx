import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'exercise',
      title: 'Morning Run',
      description: '5.2 km in 28 minutes',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      source: 'Apple Watch',
      icon: 'Activity',
      color: 'primary',
      metrics: {
        distance: '5.2 km',
        duration: '28 min',
        calories: '312 kcal',
        avgHeartRate: '145 bpm'
      }
    },
    {
      id: 2,
      type: 'nutrition',
      title: 'Breakfast Logged',
      description: 'Oatmeal with berries and almonds',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      source: 'Manual Entry',
      icon: 'Utensils',
      color: 'secondary',
      metrics: {
        calories: '420 kcal',
        protein: '15g',
        carbs: '65g',
        fat: '12g'
      }
    },
    {
      id: 3,
      type: 'health',
      title: 'Blood Pressure Reading',
      description: '118/76 mmHg - Normal range',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      source: 'Smart Blood Pressure Monitor',
      icon: 'Heart',
      color: 'success',
      metrics: {
        systolic: '118 mmHg',
        diastolic: '76 mmHg',
        pulse: '72 bpm'
      }
    },
    {
      id: 4,
      type: 'sleep',
      title: 'Sleep Analysis Complete',
      description: '7h 23m with 92% quality score',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      source: 'Sleep Tracker',
      icon: 'Moon',
      color: 'accent',
      metrics: {
        duration: '7h 23m',
        quality: '92%',
        deepSleep: '2h 15m',
        remSleep: '1h 45m'
      }
    },
    {
      id: 5,
      type: 'medication',
      title: 'Medication Taken',
      description: 'Vitamin D3 - 1000 IU',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      source: 'Medication Reminder',
      icon: 'Pill',
      color: 'warning',
      metrics: {
        dosage: '1000 IU',
        frequency: 'Daily',
        nextDue: 'Tomorrow 9:00 AM'
      }
    }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        text: 'text-primary',
        icon: 'text-primary'
      },
      secondary: {
        bg: 'bg-secondary-50',
        text: 'text-secondary',
        icon: 'text-secondary'
      },
      accent: {
        bg: 'bg-accent-50',
        text: 'text-accent',
        icon: 'text-accent'
      },
      warning: {
        bg: 'bg-warning-50',
        text: 'text-warning',
        icon: 'text-warning'
      },
      success: {
        bg: 'bg-success-50',
        text: 'text-success',
        icon: 'text-success'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-light border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
          View all
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {[
          { key: 'all', label: 'All', count: activities.length },
          { key: 'exercise', label: 'Exercise', count: activities.filter(a => a.type === 'exercise').length },
          { key: 'nutrition', label: 'Nutrition', count: activities.filter(a => a.type === 'nutrition').length },
          { key: 'health', label: 'Health', count: activities.filter(a => a.type === 'health').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
              filter === tab.key
                ? 'text-primary border-primary bg-primary-50' :'text-text-secondary border-transparent hover:text-primary hover:bg-primary-50'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-1 text-xs">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icon name="Activity" size={32} className="text-text-tertiary mb-2" />
            <p className="text-text-secondary">No recent activity</p>
          </div>
        ) : (
          filteredActivities.map((activity) => {
            const colors = getColorClasses(activity.color);
            
            return (
              <div
                key={activity.id}
                className="p-4 border-b border-border-light hover:bg-surface-secondary transition-colors duration-200 last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <Icon name={activity.icon} size={16} className={colors.icon} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-text-primary">
                        {activity.title}
                      </h4>
                      <span className="text-xs text-text-tertiary">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-2">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Icon name="Smartphone" size={12} className="text-text-tertiary" />
                        <span className="text-xs text-text-tertiary">
                          {activity.source}
                        </span>
                      </div>
                      
                      <button className="text-xs text-primary hover:text-primary-700 font-medium transition-colors duration-200">
                        View details
                      </button>
                    </div>
                    
                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(activity.metrics).slice(0, 2).map(([key, value]) => (
                        <span
                          key={key}
                          className="text-xs bg-surface-secondary text-text-secondary px-2 py-1 rounded-full"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-surface-secondary rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Sync" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              Auto-sync enabled
            </span>
          </div>
          <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
            Sync now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;