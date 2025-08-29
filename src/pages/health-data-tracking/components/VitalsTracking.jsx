import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const VitalsTracking = ({ onSave, isLoading }) => {
  const [vitalsData, setVitalsData] = useState({
    heartRate: '',
    systolicBP: '',
    diastolicBP: '',
    weight: '',
    temperature: '',
    oxygenSaturation: '',
    notes: ''
  });

  const handleInputChange = (field, value) => {
    setVitalsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(vitalsData);
  };

  const getHeartRateStatus = (hr) => {
    if (!hr) return null;
    const rate = parseInt(hr);
    if (rate < 60) return { status: 'Low', color: 'text-warning', bg: 'bg-warning-50' };
    if (rate > 100) return { status: 'High', color: 'text-error', bg: 'bg-error-50' };
    return { status: 'Normal', color: 'text-success', bg: 'bg-success-50' };
  };

  const getBPStatus = (sys, dia) => {
    if (!sys || !dia) return null;
    const systolic = parseInt(sys);
    const diastolic = parseInt(dia);
    
    if (systolic >= 140 || diastolic >= 90) {
      return { status: 'High', color: 'text-error', bg: 'bg-error-50' };
    }
    if (systolic < 90 || diastolic < 60) {
      return { status: 'Low', color: 'text-warning', bg: 'bg-warning-50' };
    }
    return { status: 'Normal', color: 'text-success', bg: 'bg-success-50' };
  };

  const heartRateStatus = getHeartRateStatus(vitalsData.heartRate);
  const bpStatus = getBPStatus(vitalsData.systolicBP, vitalsData.diastolicBP);
  const isFormValid = vitalsData.heartRate || vitalsData.systolicBP || vitalsData.weight;

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Heart" size={20} className="text-error" />
        <h2 className="text-lg font-semibold text-text-primary">Vital Signs</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Heart Rate */}
        <div className="bg-error-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Heart Rate (BPM)
          </label>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="number"
                value={vitalsData.heartRate}
                onChange={(e) => handleInputChange('heartRate', e.target.value)}
                placeholder="72"
                className="w-full px-4 py-3 text-2xl font-semibold text-center border border-border rounded-md bg-surface focus:ring-2 focus:ring-error-500 focus:border-error-500 transition-all duration-200"
              />
            </div>
            <div className="text-error">
              <Icon name="Heart" size={24} />
            </div>
          </div>
          {heartRateStatus && (
            <div className={`mt-2 px-2 py-1 rounded text-xs font-medium text-center ${heartRateStatus.bg} ${heartRateStatus.color}`}>
              {heartRateStatus.status}
            </div>
          )}
        </div>

        {/* Blood Pressure */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Blood Pressure (mmHg)
          </label>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="number"
                value={vitalsData.systolicBP}
                onChange={(e) => handleInputChange('systolicBP', e.target.value)}
                placeholder="120"
                className="w-full px-3 py-2 text-center border border-border rounded-md bg-surface focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
              <div className="text-xs text-text-secondary text-center mt-1">Systolic</div>
            </div>
            <div className="text-text-secondary font-bold text-xl">/</div>
            <div className="flex-1">
              <input
                type="number"
                value={vitalsData.diastolicBP}
                onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
                placeholder="80"
                className="w-full px-3 py-2 text-center border border-border rounded-md bg-surface focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
              <div className="text-xs text-text-secondary text-center mt-1">Diastolic</div>
            </div>
          </div>
          {bpStatus && (
            <div className={`mt-2 px-2 py-1 rounded text-xs font-medium text-center ${bpStatus.bg} ${bpStatus.color}`}>
              Blood Pressure: {bpStatus.status}
            </div>
          )}
        </div>

        {/* Weight and Temperature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Weight (kg)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={vitalsData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="70.5"
                className="w-full px-3 py-2 pr-10 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
              <Icon name="Scale" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Temperature (°C)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={vitalsData.temperature}
                onChange={(e) => handleInputChange('temperature', e.target.value)}
                placeholder="36.5"
                className="w-full px-3 py-2 pr-10 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
              <Icon name="Thermometer" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            </div>
          </div>
        </div>

        {/* Oxygen Saturation */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Oxygen Saturation (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={vitalsData.oxygenSaturation}
              onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
              placeholder="98"
              min="0"
              max="100"
              className="w-full px-3 py-2 pr-10 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
            <Icon name="Wind" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          </div>
          <div className="mt-1 text-xs text-text-secondary">
            Normal range: 95-100%
          </div>
        </div>

        {/* Quick Measurement Buttons */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 p-3 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Smartphone" size={16} className="text-primary" />
              <span className="text-sm">Measure HR</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center space-x-2 p-3 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Camera" size={16} className="text-primary" />
              <span className="text-sm">Scan Device</span>
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Notes (optional)
          </label>
          <textarea
            value={vitalsData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Any symptoms or observations?"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="flex-1 bg-error text-white py-3 px-4 rounded-md font-medium hover:bg-error-700 focus:ring-2 focus:ring-error-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Icon name="Save" size={16} />
                <span>Save Vitals</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setVitalsData({
              heartRate: '', systolicBP: '', diastolicBP: '', weight: '',
              temperature: '', oxygenSaturation: '', notes: ''
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

export default VitalsTracking;