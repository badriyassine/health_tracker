import React from 'react';
import Icon from 'components/AppIcon';

const PatientOverview = ({ patient }) => {
  const vitalCards = [
    {
      label: 'Blood Pressure',
      value: patient.vitals.bloodPressure,
      unit: 'mmHg',
      icon: 'Heart',
      status: 'warning',
      range: 'Normal: <120/80',
      trend: 'up'
    },
    {
      label: 'Heart Rate',
      value: patient.vitals.heartRate,
      unit: 'BPM',
      icon: 'Activity',
      status: 'normal',
      range: 'Normal: 60-100',
      trend: 'stable'
    },
    {
      label: 'Weight',
      value: patient.vitals.weight,
      unit: 'lbs',
      icon: 'Scale',
      status: 'normal',
      range: 'BMI: ' + patient.vitals.bmi,
      trend: 'down'
    },
    {
      label: 'Blood Glucose',
      value: patient.vitals.glucose || 'N/A',
      unit: 'mg/dL',
      icon: 'Droplets',
      status: patient.vitals.glucose > 140 ? 'error' : 'normal',
      range: 'Normal: 70-140',
      trend: 'up'
    }
  ];

  const activityMetrics = [
    {
      label: 'Daily Steps',
      value: patient.recentActivity.steps.toLocaleString(),
      target: '10,000',
      percentage: (patient.recentActivity.steps / 10000) * 100,
      icon: 'Footprints'
    },
    {
      label: 'Sleep Duration',
      value: patient.recentActivity.sleepHours + 'h',
      target: '8h',
      percentage: (patient.recentActivity.sleepHours / 8) * 100,
      icon: 'Moon'
    },
    {
      label: 'Exercise Time',
      value: patient.recentActivity.exerciseMinutes + 'min',
      target: '60min',
      percentage: (patient.recentActivity.exerciseMinutes / 60) * 100,
      icon: 'Dumbbell'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'error': return 'text-error bg-error-50 border-error-200';
      case 'warning': return 'text-warning bg-warning-50 border-warning-200';
      case 'normal': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-surface-secondary border-border';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-error';
      case 'down': return 'text-success';
      case 'stable': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Patient Alerts */}
      {patient.alerts.length > 0 && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <h3 className="font-semibold text-error">Active Alerts</h3>
          </div>
          <div className="space-y-2">
            {patient.alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-error">{alert.message}</span>
                <span className="text-sm text-error-700">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vital Signs */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Current Vital Signs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitalCards.map((vital, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getStatusColor(vital.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <Icon name={vital.icon} size={20} />
                <Icon 
                  name={getTrendIcon(vital.trend)} 
                  size={16} 
                  className={getTrendColor(vital.trend)} 
                />
              </div>
              <div className="mb-1">
                <span className="text-2xl font-bold">{vital.value}</span>
                {vital.unit && <span className="text-sm ml-1">{vital.unit}</span>}
              </div>
              <p className="text-sm font-medium mb-1">{vital.label}</p>
              <p className="text-xs opacity-75">{vital.range}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Overview */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activityMetrics.map((metric, index) => (
            <div key={index} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Icon name={metric.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{metric.label}</p>
                  <p className="text-sm text-text-secondary">Target: {metric.target}</p>
                </div>
              </div>
              
              <div className="mb-2">
                <span className="text-2xl font-bold text-text-primary">{metric.value}</span>
              </div>
              
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric.percentage >= 100 ? 'bg-success' : 
                    metric.percentage >= 70 ? 'bg-warning' : 'bg-primary'
                  }`}
                  style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {metric.percentage.toFixed(0)}% of target
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex items-center space-x-2 p-3 bg-surface border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-all duration-200">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Send Message</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-surface border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-all duration-200">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Schedule</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-surface border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-all duration-200">
            <Icon name="FileText" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Add Note</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-surface border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-all duration-200">
            <Icon name="Download" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Export Data</span>
          </button>
        </div>
      </div>

      {/* Patient Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-4">
          <h4 className="font-semibold text-text-primary mb-3">Patient Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Medical Record Number:</span>
              <span className="text-text-primary font-medium">{patient.mrn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Primary Condition:</span>
              <span className="text-text-primary font-medium">{patient.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Last Visit:</span>
              <span className="text-text-primary font-medium">
                {new Date(patient.lastVisit).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Status:</span>
              <span className="text-text-primary font-medium">{patient.status}</span>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <h4 className="font-semibold text-text-primary mb-3">Access Permissions</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Access Level:</span>
              <span className="text-text-primary font-medium">{patient.accessLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Granted Date:</span>
              <span className="text-text-primary font-medium">
                {new Date(patient.lastVisit).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Expires:</span>
              <span className="text-text-primary font-medium">
                {new Date(patient.accessExpiry).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Data Scope:</span>
              <span className="text-text-primary font-medium">
                {patient.accessLevel === 'Full Access' ? 'All Health Data' : 'Limited Vitals'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;