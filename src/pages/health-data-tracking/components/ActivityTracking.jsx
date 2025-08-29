import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ActivityTracking = ({ onSave, isLoading }) => {
  const [activityData, setActivityData] = useState({
    steps: '',
    exerciseType: '',
    duration: '',
    intensity: 'moderate',
    caloriesBurned: '',
    distance: '',
    notes: ''
  });

  const exerciseTypes = [
    'Walking', 'Running', 'Cycling', 'Swimming', 'Weightlifting',
    'Yoga', 'Pilates', 'Dancing', 'Basketball', 'Tennis',
    'Soccer', 'Hiking', 'Climbing', 'Other'
  ];

  const intensityLevels = [
    { value: 'light', label: 'Light', color: 'text-success', icon: 'Smile' },
    { value: 'moderate', label: 'Moderate', color: 'text-warning', icon: 'Zap' },
    { value: 'vigorous', label: 'Vigorous', color: 'text-error', icon: 'Flame' }
  ];

  const handleInputChange = (field, value) => {
    setActivityData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(activityData);
  };

  const isFormValid = activityData.steps || activityData.exerciseType;

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Activity" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-text-primary">Activity Tracking</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Steps Counter */}
        <div className="bg-primary-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Daily Steps
          </label>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="number"
                value={activityData.steps}
                onChange={(e) => handleInputChange('steps', e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 text-2xl font-semibold text-center border border-border rounded-md bg-surface focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
            </div>
            <div className="text-text-secondary">
              <Icon name="Footprints" size={24} />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary text-center">
            Goal: 10,000 steps
          </div>
        </div>

        {/* Exercise Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Exercise Type
          </label>
          <select
            value={activityData.exerciseType}
            onChange={(e) => handleInputChange('exerciseType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          >
            <option value="">Select exercise type</option>
            {exerciseTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Duration and Distance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={activityData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="30"
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Distance (km)
            </label>
            <input
              type="number"
              step="0.1"
              value={activityData.distance}
              onChange={(e) => handleInputChange('distance', e.target.value)}
              placeholder="5.0"
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Intensity Level */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Intensity Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {intensityLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => handleInputChange('intensity', level.value)}
                className={`flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all duration-200 ${
                  activityData.intensity === level.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark text-text-secondary'
                }`}
              >
                <Icon name={level.icon} size={20} className={level.color} />
                <span className="text-sm font-medium">{level.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calories Burned */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Calories Burned (optional)
          </label>
          <input
            type="number"
            value={activityData.caloriesBurned}
            onChange={(e) => handleInputChange('caloriesBurned', e.target.value)}
            placeholder="250"
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Notes (optional)
          </label>
          <textarea
            value={activityData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="How did you feel during the activity?"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="flex-1 bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Icon name="Save" size={16} />
                <span>Save Activity</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActivityData({
              steps: '', exerciseType: '', duration: '', intensity: 'moderate',
              caloriesBurned: '', distance: '', notes: ''
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

export default ActivityTracking;