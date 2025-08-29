import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from 'components/AppIcon';

const ActivityReports = ({ patient }) => {
  const [selectedReport, setSelectedReport] = useState('weekly');
  const [activityType, setActivityType] = useState('steps');

  // Mock activity data
  const weeklyData = [
    { day: 'Mon', steps: 8500, exercise: 45, sleep: 6.5, calories: 2200 },
    { day: 'Tue', steps: 12000, exercise: 60, sleep: 7.8, calories: 2400 },
    { day: 'Wed', steps: 6800, exercise: 30, sleep: 6.2, calories: 2100 },
    { day: 'Thu', steps: 9200, exercise: 50, sleep: 7.0, calories: 2300 },
    { day: 'Fri', steps: 11500, exercise: 65, sleep: 7.5, calories: 2500 },
    { day: 'Sat', steps: 15000, exercise: 90, sleep: 8.2, calories: 2600 },
    { day: 'Sun', steps: 7200, exercise: 35, sleep: 7.8, calories: 2000 }
  ];

  const monthlyData = [
    { week: 'Week 1', avgSteps: 9500, avgExercise: 52, avgSleep: 7.1 },
    { week: 'Week 2', avgSteps: 10200, avgExercise: 58, avgSleep: 6.8 },
    { week: 'Week 3', avgSteps: 8800, avgExercise: 45, avgSleep: 7.3 },
    { week: 'Week 4', avgSteps: 11000, avgExercise: 62, avgSleep: 7.0 }
  ];

  const sleepQualityData = [
    { name: 'Deep Sleep', value: 25, color: '#3B82F6' },
    { name: 'Light Sleep', value: 45, color: '#60A5FA' },
    { name: 'REM Sleep', value: 20, color: '#93C5FD' },
    { name: 'Awake', value: 10, color: '#DBEAFE' }
  ];

  const exerciseTypeData = [
    { type: 'Walking', minutes: 180, percentage: 45 },
    { type: 'Running', minutes: 90, percentage: 22.5 },
    { type: 'Cycling', minutes: 60, percentage: 15 },
    { type: 'Swimming', minutes: 40, percentage: 10 },
    { type: 'Strength', minutes: 30, percentage: 7.5 }
  ];

  const activityMetrics = [
    {
      id: 'steps',
      label: 'Daily Steps',
      icon: 'Footprints',
      current: patient.recentActivity.steps,
      target: 10000,
      unit: 'steps',
      color: '#3B82F6'
    },
    {
      id: 'exercise',
      label: 'Exercise Time',
      icon: 'Dumbbell',
      current: patient.recentActivity.exerciseMinutes,
      target: 60,
      unit: 'minutes',
      color: '#10B981'
    },
    {
      id: 'sleep',
      label: 'Sleep Duration',
      icon: 'Moon',
      current: patient.recentActivity.sleepHours,
      target: 8,
      unit: 'hours',
      color: '#8B5CF6'
    },
    {
      id: 'calories',
      label: 'Calories Burned',
      icon: 'Flame',
      current: 2300,
      target: 2500,
      unit: 'kcal',
      color: '#F59E0B'
    }
  ];

  const reportTypes = [
    { id: 'weekly', label: 'Weekly Report' },
    { id: 'monthly', label: 'Monthly Report' },
    { id: 'quarterly', label: 'Quarterly Report' }
  ];

  const getActivityData = () => {
    return selectedReport === 'weekly' ? weeklyData : monthlyData;
  };

  const getDataKey = () => {
    if (selectedReport === 'weekly') {
      switch (activityType) {
        case 'steps': return 'steps';
        case 'exercise': return 'exercise';
        case 'sleep': return 'sleep';
        case 'calories': return 'calories';
        default: return 'steps';
      }
    } else {
      switch (activityType) {
        case 'steps': return 'avgSteps';
        case 'exercise': return 'avgExercise';
        case 'sleep': return 'avgSleep';
        default: return 'avgSteps';
      }
    }
  };

  const selectedMetric = activityMetrics.find(m => m.id === activityType);
  const achievementRate = Math.round((selectedMetric?.current / selectedMetric?.target) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-text-primary">Activity Reports</h2>
        
        <div className="flex items-center space-x-4">
          {/* Report Type Selector */}
          <div className="flex bg-surface border border-border rounded-lg p-1">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedReport === type.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-primary'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activityMetrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => setActivityType(metric.id)}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              activityType === metric.id
                ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary hover:bg-primary-50'
            }`}
          >
            <div className="text-center">
              <div className={`inline-flex p-3 rounded-lg mb-2 ${
                activityType === metric.id ? 'bg-primary' : 'bg-surface-secondary'
              }`}>
                <Icon 
                  name={metric.icon} 
                  size={24} 
                  className={activityType === metric.id ? 'text-white' : 'text-text-secondary'} 
                />
              </div>
              <p className="font-medium text-text-primary">{metric.label}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">
                {metric.current}{metric.unit === 'hours' ? 'h' : ''}
              </p>
              <p className="text-sm text-text-secondary">
                Target: {metric.target}{metric.unit === 'hours' ? 'h' : ''}
              </p>
              <div className="w-full bg-border rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min((metric.current / metric.target) * 100, 100)}%`,
                    backgroundColor: metric.color
                  }}
                ></div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Activity Chart */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            {selectedMetric?.label} Trend
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedMetric?.color }}
              ></div>
              <span>{selectedMetric?.label}</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getActivityData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey={selectedReport === 'weekly' ? 'day' : 'week'}
                stroke="#6B7280"
              />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                formatter={(value) => [
                  `${value} ${selectedMetric?.unit === 'hours' ? 'hours' : selectedMetric?.unit}`,
                  selectedMetric?.label
                ]}
              />
              <Bar 
                dataKey={getDataKey()} 
                fill={selectedMetric?.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sleep Quality Breakdown */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Sleep Quality Analysis</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sleepQualityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sleepQualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            {sleepQualityData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-text-secondary">{item.name}</span>
                <span className="text-sm font-medium text-text-primary">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Type Distribution */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Exercise Type Distribution</h3>
          
          <div className="space-y-4">
            {exerciseTypeData.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name="Activity" size={16} className="text-primary" />
                  </div>
                  <span className="font-medium text-text-primary">{exercise.type}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-text-secondary">{exercise.minutes} min</span>
                  <div className="w-20 bg-border rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${exercise.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-text-primary w-10">
                    {exercise.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Activity Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex p-4 bg-success-50 rounded-lg mb-3">
              <Icon name="TrendingUp" size={32} className="text-success" />
            </div>
            <h4 className="font-semibold text-text-primary mb-1">Weekly Progress</h4>
            <p className="text-2xl font-bold text-success mb-1">+15%</p>
            <p className="text-sm text-text-secondary">Compared to last week</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex p-4 bg-primary-50 rounded-lg mb-3">
              <Icon name="Target" size={32} className="text-primary" />
            </div>
            <h4 className="font-semibold text-text-primary mb-1">Goals Achieved</h4>
            <p className="text-2xl font-bold text-primary mb-1">5/7</p>
            <p className="text-sm text-text-secondary">This week</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex p-4 bg-warning-50 rounded-lg mb-3">
              <Icon name="Clock" size={32} className="text-warning" />
            </div>
            <h4 className="font-semibold text-text-primary mb-1">Active Time</h4>
            <p className="text-2xl font-bold text-warning mb-1">6.2h</p>
            <p className="text-sm text-text-secondary">Daily average</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={24} className="text-accent mt-1" />
          <div>
            <h3 className="font-semibold text-accent mb-2">Clinical Recommendations</h3>
            <ul className="space-y-2 text-sm text-accent-700">
              <li>• Patient shows good exercise consistency but sleep quality needs improvement</li>
              <li>• Consider sleep hygiene counseling to increase deep sleep percentage</li>
              <li>• Step count is below target - recommend gradual increase to 10,000 daily steps</li>
              <li>• Exercise variety is good, maintain current routine with slight intensity increase</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityReports;