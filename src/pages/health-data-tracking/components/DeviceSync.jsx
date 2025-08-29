import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DeviceSync = ({ syncStatus, lastSyncTime, onSync }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const devices = [
    {
      id: 'appleHealth',
      name: 'Apple Health',
      icon: 'Smartphone',
      description: 'iPhone Health app integration',
      dataTypes: ['Steps', 'Heart Rate', 'Sleep', 'Workouts']
    },
    {
      id: 'googleFit',
      name: 'Google Fit',
      icon: 'Activity',
      description: 'Google Fit platform sync',
      dataTypes: ['Activity', 'Weight', 'Nutrition', 'Sleep']
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      icon: 'Watch',
      description: 'Fitbit device and app',
      dataTypes: ['Steps', 'Heart Rate', 'Sleep', 'Exercise']
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'connected':
        return { 
          color: 'text-success', 
          bg: 'bg-success-50', 
          icon: 'CheckCircle', 
          label: 'Connected' 
        };
      case 'syncing':
        return { 
          color: 'text-warning', 
          bg: 'bg-warning-50', 
          icon: 'RefreshCw', 
          label: 'Syncing...' 
        };
      case 'error':
        return { 
          color: 'text-error', 
          bg: 'bg-error-50', 
          icon: 'AlertCircle', 
          label: 'Error' 
        };
      case 'disconnected':
        return { 
          color: 'text-text-secondary', 
          bg: 'bg-surface-secondary', 
          icon: 'XCircle', 
          label: 'Disconnected' 
        };
      default:
        return { 
          color: 'text-text-secondary', 
          bg: 'bg-surface-secondary', 
          icon: 'Circle', 
          label: 'Unknown' 
        };
    }
  };

  const formatLastSync = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-surface rounded-lg shadow-light border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Smartphone" size={20} className="text-primary" />
            <div>
              <h3 className="text-sm font-medium text-text-primary">Device Sync</h3>
              <p className="text-xs text-text-secondary">
                Last sync: {formatLastSync(lastSyncTime)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Status Indicators */}
            <div className="flex space-x-1">
              {devices.map((device) => {
                const status = getStatusInfo(syncStatus[device.id] || 'disconnected');
                return (
                  <div
                    key={device.id}
                    className={`w-2 h-2 rounded-full ${status.bg} ${status.color}`}
                    title={`${device.name}: ${status.label}`}
                  />
                );
              })}
            </div>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-text-secondary" 
            />
          </div>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {devices.map((device) => {
            const deviceStatus = syncStatus[device.id] || 'disconnected';
            const statusInfo = getStatusInfo(deviceStatus);
            
            return (
              <div
                key={device.id}
                className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${statusInfo.bg}`}>
                    <Icon name={device.icon} size={16} className={statusInfo.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-text-primary">
                        {device.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Icon 
                          name={statusInfo.icon} 
                          size={12} 
                          className={`${statusInfo.color} ${deviceStatus === 'syncing' ? 'animate-spin' : ''}`}
                        />
                        <span className={`text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      {device.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {device.dataTypes.map((type) => (
                        <span
                          key={type}
                          className="text-xs px-2 py-0.5 bg-primary-50 text-primary rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {deviceStatus === 'connected' && (
                    <button
                      onClick={() => onSync(device.id)}
                      className="p-2 text-primary hover:bg-primary-50 rounded-md transition-colors duration-200"
                      title="Sync now"
                    >
                      <Icon name="RefreshCw" size={14} />
                    </button>
                  )}
                  
                  {deviceStatus === 'disconnected' && (
                    <button
                      onClick={() => onSync(device.id)}
                      className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                    >
                      Connect
                    </button>
                  )}
                  
                  {deviceStatus === 'error' && (
                    <button
                      onClick={() => onSync(device.id)}
                      className="px-3 py-1 text-xs bg-error text-white rounded-md hover:bg-error-700 transition-colors duration-200"
                    >
                      Retry
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Sync All Button */}
          <div className="pt-2 border-t border-border">
            <button
              onClick={() => onSync('all')}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
            >
              <Icon name="RefreshCw" size={16} />
              <span className="text-sm font-medium">Sync All Devices</span>
            </button>
          </div>
          
          {/* Sync Settings */}
          <div className="text-center">
            <button className="text-xs text-primary hover:text-primary-700 transition-colors duration-200">
              Manage sync settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceSync;