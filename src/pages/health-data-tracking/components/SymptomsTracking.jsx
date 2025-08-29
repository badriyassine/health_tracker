import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SymptomsTracking = ({ onSave, isLoading }) => {
  const [symptomsData, setSymptomsData] = useState({
    symptoms: [],
    severity: 3,
    duration: '',
    triggers: [],
    location: '',
    notes: ''
  });

  const commonSymptoms = [
    { id: 'headache', label: 'Headache', icon: 'Brain', color: 'text-error' },
    { id: 'fatigue', label: 'Fatigue', icon: 'Battery', color: 'text-warning' },
    { id: 'nausea', label: 'Nausea', icon: 'Waves', color: 'text-success' },
    { id: 'dizziness', label: 'Dizziness', icon: 'RotateCw', color: 'text-primary' },
    { id: 'chest-pain', label: 'Chest Pain', icon: 'Heart', color: 'text-error' },
    { id: 'shortness-breath', label: 'Shortness of Breath', icon: 'Wind', color: 'text-accent' },
    { id: 'stomach-pain', label: 'Stomach Pain', icon: 'Circle', color: 'text-warning' },
    { id: 'back-pain', label: 'Back Pain', icon: 'User', color: 'text-error' },
    { id: 'joint-pain', label: 'Joint Pain', icon: 'Zap', color: 'text-warning' },
    { id: 'fever', label: 'Fever', icon: 'Thermometer', color: 'text-error' },
    { id: 'cough', label: 'Cough', icon: 'Mic', color: 'text-primary' },
    { id: 'anxiety', label: 'Anxiety', icon: 'AlertTriangle', color: 'text-accent' }
  ];

  const severityLevels = [
    { value: 1, label: 'Mild', color: 'text-success', bg: 'bg-success-50' },
    { value: 2, label: 'Mild-Moderate', color: 'text-success', bg: 'bg-success-50' },
    { value: 3, label: 'Moderate', color: 'text-warning', bg: 'bg-warning-50' },
    { value: 4, label: 'Moderate-Severe', color: 'text-error', bg: 'bg-error-50' },
    { value: 5, label: 'Severe', color: 'text-error', bg: 'bg-error-50' }
  ];

  const commonTriggers = [
    'Stress', 'Weather', 'Food', 'Exercise', 'Sleep', 'Medication',
    'Hormones', 'Allergies', 'Alcohol', 'Caffeine', 'Screen Time', 'Travel'
  ];

  const handleSymptomToggle = (symptomId) => {
    setSymptomsData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(id => id !== symptomId)
        : [...prev.symptoms, symptomId]
    }));
  };

  const handleTriggerToggle = (trigger) => {
    setSymptomsData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  const handleInputChange = (field, value) => {
    setSymptomsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(symptomsData);
  };

  const getSeverityInfo = (severity) => {
    return severityLevels.find(level => level.value === severity) || severityLevels[2];
  };

  const isFormValid = symptomsData.symptoms.length > 0;

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="AlertCircle" size={20} className="text-warning" />
        <h2 className="text-lg font-semibold text-text-primary">Symptoms Tracking</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Symptom Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Select Symptoms
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {commonSymptoms.map((symptom) => (
              <button
                key={symptom.id}
                type="button"
                onClick={() => handleSymptomToggle(symptom.id)}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                  symptomsData.symptoms.includes(symptom.id)
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark text-text-secondary'
                }`}
              >
                <Icon 
                  name={symptom.icon} 
                  size={16} 
                  className={symptomsData.symptoms.includes(symptom.id) ? 'text-primary' : symptom.color}
                />
                <span className="text-sm font-medium">{symptom.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Severity Scale */}
        <div className="bg-warning-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Severity Level
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Pain Scale (1-5)</span>
              <span className={`text-sm font-medium ${getSeverityInfo(symptomsData.severity).color}`}>
                {getSeverityInfo(symptomsData.severity).label}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={symptomsData.severity}
              onChange={(e) => handleInputChange('severity', parseInt(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-secondary">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>
        </div>

        {/* Duration and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Duration
            </label>
            <select
              value={symptomsData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            >
              <option value="">Select duration</option>
              <option value="few-minutes">Few minutes</option>
              <option value="30-minutes">30 minutes</option>
              <option value="1-hour">1 hour</option>
              <option value="few-hours">Few hours</option>
              <option value="half-day">Half day</option>
              <option value="full-day">Full day</option>
              <option value="multiple-days">Multiple days</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Location (if applicable)
            </label>
            <input
              type="text"
              value={symptomsData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g., left temple, lower back"
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Possible Triggers */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Possible Triggers (optional)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {commonTriggers.map((trigger) => (
              <button
                key={trigger}
                type="button"
                onClick={() => handleTriggerToggle(trigger)}
                className={`px-3 py-2 text-sm rounded-md border transition-all duration-200 ${
                  symptomsData.triggers.includes(trigger)
                    ? 'border-secondary bg-secondary-50 text-secondary' :'border-border hover:border-border-dark text-text-secondary'
                }`}
              >
                {trigger}
              </button>
            ))}
          </div>
        </div>

        {/* Body Map - Simplified */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">Body Areas</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="flex flex-col items-center space-y-1 p-3 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Brain" size={20} className="text-primary" />
              <span className="text-xs">Head</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center space-y-1 p-3 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Heart" size={20} className="text-primary" />
              <span className="text-xs">Chest</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center space-y-1 p-3 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Circle" size={20} className="text-primary" />
              <span className="text-xs">Abdomen</span>
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Additional Notes
          </label>
          <textarea
            value={symptomsData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Describe your symptoms in detail, what makes them better or worse, any patterns you've noticed..."
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
          />
        </div>

        {/* Emergency Warning */}
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-error mb-1">Emergency Symptoms</p>
              <p className="text-text-secondary">
                If you're experiencing severe chest pain, difficulty breathing, sudden severe headache, 
                or other emergency symptoms, seek immediate medical attention.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="flex-1 bg-warning text-white py-3 px-4 rounded-md font-medium hover:bg-warning-700 focus:ring-2 focus:ring-warning-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Icon name="Save" size={16} />
                <span>Log Symptoms</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setSymptomsData({
              symptoms: [], severity: 3, duration: '', triggers: [],
              location: '', notes: ''
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

export default SymptomsTracking;