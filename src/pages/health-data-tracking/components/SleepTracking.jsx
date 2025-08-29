import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SleepTracking = ({ onSave, isLoading }) => {
  const [sleepData, setSleepData] = useState({
    bedTime: '',
    wakeTime: '',
    sleepQuality: 3,
    sleepDuration: '',
    timeToFallAsleep: '',
    nightWakeups: '',
    notes: ''
  });

  const sleepQualityLevels = [
    { value: 1, label: 'Poor', icon: 'Frown', color: 'text-error' },
    { value: 2, label: 'Fair', icon: 'Meh', color: 'text-warning' },
    { value: 3, label: 'Good', icon: 'Smile', color: 'text-success' },
    { value: 4, label: 'Great', icon: 'Laugh', color: 'text-primary' },
    { value: 5, label: 'Excellent', icon: 'Heart', color: 'text-accent' }
  ];

  const handleInputChange = (field, value) => {
    setSleepData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateSleepDuration = (bedTime, wakeTime) => {
    if (!bedTime || !wakeTime) return '';
    
    const bed = new Date(`2024-01-01T${bedTime}`);
    let wake = new Date(`2024-01-01T${wakeTime}`);
    
    // If wake time is earlier than bed time, assume it's the next day
    if (wake < bed) {
      wake = new Date(`2024-01-02T${wakeTime}`);
    }
    
    const diffMs = wake - bed;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const handleTimeChange = (field, value) => {
    handleInputChange(field, value);
    
    if (field === 'bedTime' && sleepData.wakeTime) {
      const duration = calculateSleepDuration(value, sleepData.wakeTime);
      handleInputChange('sleepDuration', duration);
    } else if (field === 'wakeTime' && sleepData.bedTime) {
      const duration = calculateSleepDuration(sleepData.bedTime, value);
      handleInputChange('sleepDuration', duration);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(sleepData);
  };

  const getSleepQualityColor = (quality) => {
    const level = sleepQualityLevels.find(l => l.value === quality);
    return level ? level.color : 'text-text-secondary';
  };

  const isFormValid = sleepData.bedTime && sleepData.wakeTime;

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Moon" size={20} className="text-accent" />
        <h2 className="text-lg font-semibold text-text-primary">Sleep Tracking</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sleep Times */}
        <div className="bg-accent-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-text-primary mb-4">Sleep Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bedtime
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={sleepData.bedTime}
                  onChange={(e) => handleTimeChange('bedTime', e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200"
                />
                <Icon name="Moon" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Wake Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={sleepData.wakeTime}
                  onChange={(e) => handleTimeChange('wakeTime', e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200"
                />
                <Icon name="Sun" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warning" />
              </div>
            </div>
          </div>
          
          {/* Sleep Duration Display */}
          {sleepData.sleepDuration && (
            <div className="mt-4 p-3 bg-surface rounded-md border border-border">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Clock" size={16} className="text-accent" />
                <span className="text-lg font-semibold text-text-primary">
                  {sleepData.sleepDuration}
                </span>
                <span className="text-sm text-text-secondary">total sleep</span>
              </div>
            </div>
          )}
        </div>

        {/* Sleep Quality */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Sleep Quality
          </label>
          <div className="grid grid-cols-5 gap-2">
            {sleepQualityLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => handleInputChange('sleepQuality', level.value)}
                className={`flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all duration-200 ${
                  sleepData.sleepQuality === level.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark text-text-secondary'
                }`}
              >
                <Icon 
                  name={level.icon} 
                  size={20} 
                  className={sleepData.sleepQuality === level.value ? 'text-primary' : level.color}
                />
                <span className="text-xs font-medium">{level.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sleep Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Time to Fall Asleep (minutes)
            </label>
            <input
              type="number"
              value={sleepData.timeToFallAsleep}
              onChange={(e) => handleInputChange('timeToFallAsleep', e.target.value)}
              placeholder="15"
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Night Wakeups
            </label>
            <input
              type="number"
              value={sleepData.nightWakeups}
              onChange={(e) => handleInputChange('nightWakeups', e.target.value)}
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Sleep Environment */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">Sleep Environment</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              type="button"
              className="flex flex-col items-center space-y-1 p-2 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Thermometer" size={16} className="text-primary" />
              <span className="text-xs">Temperature</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center space-y-1 p-2 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Volume2" size={16} className="text-primary" />
              <span className="text-xs">Noise Level</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center space-y-1 p-2 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Lightbulb" size={16} className="text-primary" />
              <span className="text-xs">Light</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center space-y-1 p-2 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Coffee" size={16} className="text-primary" />
              <span className="text-xs">Caffeine</span>
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Sleep Notes (optional)
          </label>
          <textarea
            value={sleepData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="How did you feel when you woke up? Any dreams or disturbances?"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="flex-1 bg-accent text-white py-3 px-4 rounded-md font-medium hover:bg-accent-700 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Icon name="Save" size={16} />
                <span>Log Sleep</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setSleepData({
              bedTime: '', wakeTime: '', sleepQuality: 3, sleepDuration: '',
              timeToFallAsleep: '', nightWakeups: '', notes: ''
            })}
            className="px-4 py-3 border border-border rounded-md text-text-secondary hover:bg-surface-secondary transition-colors duration-200"
          >
            <Icon name="RotateCcw" size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SleepTracking;