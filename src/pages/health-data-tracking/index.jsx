import React, { useState, useEffect } from 'react';
import HeaderNavigation from 'components/ui/HeaderNavigation';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import QuickActionMenu from 'components/ui/QuickActionMenu';
import Icon from 'components/AppIcon';
import ActivityTracking from './components/ActivityTracking';
import VitalsTracking from './components/VitalsTracking';
import NutritionTracking from './components/NutritionTracking';
import SleepTracking from './components/SleepTracking';
import SymptomsTracking from './components/SymptomsTracking';
import DeviceSync from './components/DeviceSync';

const HealthDataTracking = () => {
  const [activeCategory, setActiveCategory] = useState('activity');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date(Date.now() - 300000));
  const [syncStatus, setSyncStatus] = useState({
    appleHealth: 'connected',
    googleFit: 'syncing',
    fitbit: 'disconnected'
  });

  const categories = [
    { id: 'activity', label: 'Activity', icon: 'Activity', color: 'text-primary' },
    { id: 'vitals', label: 'Vitals', icon: 'Heart', color: 'text-error' },
    { id: 'nutrition', label: 'Nutrition', icon: 'Apple', color: 'text-success' },
    { id: 'sleep', label: 'Sleep', icon: 'Moon', color: 'text-accent' },
    { id: 'symptoms', label: 'Symptoms', icon: 'AlertCircle', color: 'text-warning' }
  ];

  const handleDataSave = async (category, data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saving ${category} data:`, data);
      
      // Show success feedback
      const successEvent = new CustomEvent('showToast', {
        detail: { 
          message: `${category} data saved successfully!`, 
          type: 'success' 
        }
      });
      window.dispatchEvent(successEvent);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeviceSync = async (device) => {
    setSyncStatus(prev => ({ ...prev, [device]: 'syncing' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSyncStatus(prev => ({ ...prev, [device]: 'connected' }));
      setLastSyncTime(new Date());
      
      const successEvent = new CustomEvent('showToast', {
        detail: { 
          message: `${device} synced successfully!`, 
          type: 'success' 
        }
      });
      window.dispatchEvent(successEvent);
    } catch (error) {
      setSyncStatus(prev => ({ ...prev, [device]: 'error' }));
      console.error('Sync error:', error);
    }
  };

  const renderActiveCategory = () => {
    const commonProps = {
      onSave: (data) => handleDataSave(activeCategory, data),
      isLoading
    };

    switch (activeCategory) {
      case 'activity':
        return <ActivityTracking {...commonProps} />;
      case 'vitals':
        return <VitalsTracking {...commonProps} />;
      case 'nutrition':
        return <NutritionTracking {...commonProps} />;
      case 'sleep':
        return <SleepTracking {...commonProps} />;
      case 'symptoms':
        return <SymptomsTracking {...commonProps} />;
      default:
        return <ActivityTracking {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <main className="pt-16 pb-20 md:pb-8">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary font-heading">
                  Health Data Tracking
                </h1>
                <p className="text-text-secondary mt-1">
                  Log your health metrics and sync with connected devices
                </p>
              </div>
              
              {/* Sync Status - Desktop */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-sm text-text-secondary">
                  Last sync: {lastSyncTime.toLocaleTimeString()}
                </div>
                <button
                  onClick={() => handleDeviceSync('all')}
                  className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                >
                  <Icon name="RefreshCw" size={16} />
                  <span>Sync All</span>
                </button>
              </div>
            </div>

            {/* Device Sync Component */}
            <DeviceSync 
              syncStatus={syncStatus}
              lastSyncTime={lastSyncTime}
              onSync={handleDeviceSync}
            />
          </div>

          {/* Category Tabs */}
          <div className="mb-6">
            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden">
              <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      activeCategory === category.id
                        ? 'bg-primary text-white shadow-medium'
                        : 'bg-surface text-text-secondary hover:bg-surface-secondary border border-border'
                    }`}
                  >
                    <Icon 
                      name={category.icon} 
                      size={16} 
                      className={activeCategory === category.id ? 'text-white' : category.color}
                    />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-5 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-primary text-white shadow-medium'
                      : 'bg-surface text-text-secondary hover:bg-surface-secondary border border-border'
                  }`}
                >
                  <Icon 
                    name={category.icon} 
                    size={24} 
                    className={activeCategory === category.id ? 'text-white' : category.color}
                  />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Category Content */}
          <div className="bg-surface rounded-lg shadow-light border border-border">
            {renderActiveCategory()}
          </div>

          {/* Quick Stats - Mobile */}
          <div className="mt-6 md:hidden">
            <div className="bg-surface rounded-lg shadow-light border border-border p-4">
              <h3 className="text-sm font-medium text-text-primary mb-3">Today's Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">8,432</div>
                  <div className="text-xs text-text-secondary">Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-error">72</div>
                  <div className="text-xs text-text-secondary">BPM</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-success">1,847</div>
                  <div className="text-xs text-text-secondary">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-accent">7h 23m</div>
                  <div className="text-xs text-text-secondary">Sleep</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
      <QuickActionMenu />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-[1100] flex items-center justify-center fade-in">
          <div className="bg-surface rounded-lg p-6 shadow-large border border-border flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-primary font-medium">Saving data...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthDataTracking;