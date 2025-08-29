import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const quickActions = [
    {
      id: 'log-weight',
      label: 'Log Weight',
      icon: 'Scale',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      action: () => handleQuickLog('weight')
    },
    {
      id: 'log-blood-pressure',
      label: 'Blood Pressure',
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error-50',
      action: () => handleQuickLog('blood-pressure')
    },
    {
      id: 'log-glucose',
      label: 'Blood Glucose',
      icon: 'Droplets',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      action: () => handleQuickLog('glucose')
    },
    {
      id: 'log-medication',
      label: 'Medication',
      icon: 'Pill',
      color: 'text-secondary',
      bgColor: 'bg-secondary-50',
      action: () => handleQuickLog('medication')
    },
    {
      id: 'log-mood',
      label: 'Mood',
      icon: 'Smile',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      action: () => handleQuickLog('mood')
    },
    {
      id: 'sync-devices',
      label: 'Sync Devices',
      icon: 'Smartphone',
      color: 'text-text-secondary',
      bgColor: 'bg-surface-secondary',
      action: () => handleSyncDevices()
    }
  ];

  const handleQuickLog = async (type) => {
    setIsLoading(true);
    setIsOpen(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/health-data-tracking', { state: { quickLog: type } });
    } catch (error) {
      console.error('Quick log error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncDevices = async () => {
    setIsLoading(true);
    setIsOpen(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Devices synced successfully');
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-[1000] md:hidden">
        <div className="relative" ref={menuRef}>
          {/* Quick Action Menu */}
          {isOpen && (
            <div className="absolute bottom-16 right-0 w-48 bg-surface rounded-lg shadow-large border border-border fade-in">
              <div className="p-2">
                <div className="text-xs font-medium text-text-secondary px-3 py-2 border-b border-border mb-2">
                  Quick Actions
                </div>
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    disabled={isLoading}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary rounded-md transition-all duration-200 disabled:opacity-50"
                  >
                    <div className={`p-1.5 rounded-md ${action.bgColor}`}>
                      <Icon name={action.icon} size={14} className={action.color} />
                    </div>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main FAB */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            disabled={isLoading}
            className={`w-14 h-14 bg-primary text-white rounded-full shadow-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center disabled:opacity-50 ${
              isOpen ? 'rotate-45' : ''
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Icon name="Plus" size={24} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Quick Actions Sidebar */}
      <div className="hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2 z-[1000]">
        <div className="bg-surface rounded-lg shadow-light border border-border p-3 space-y-3">
          <div className="text-xs font-medium text-text-secondary text-center mb-3">
            Quick Log
          </div>
          {quickActions.slice(0, 4).map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              disabled={isLoading}
              className={`w-12 h-12 rounded-lg ${action.bgColor} hover:scale-105 transition-all duration-200 flex items-center justify-center group disabled:opacity-50 relative`}
              title={action.label}
            >
              <Icon name={action.icon} size={20} className={action.color} />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {action.label}
              </div>
            </button>
          ))}
          
          {/* Sync Button */}
          <div className="pt-2 border-t border-border">
            <button
              onClick={handleSyncDevices}
              disabled={isLoading}
              className="w-12 h-12 rounded-lg bg-surface-secondary hover:bg-border-light hover:scale-105 transition-all duration-200 flex items-center justify-center group disabled:opacity-50 relative"
              title="Sync Devices"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-text-secondary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Icon name="RefreshCw" size={16} className="text-text-secondary" />
              )}
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Sync Devices
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-[1100] flex items-center justify-center fade-in">
          <div className="bg-surface rounded-lg p-6 shadow-large border border-border flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-primary font-medium">Processing...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionMenu;