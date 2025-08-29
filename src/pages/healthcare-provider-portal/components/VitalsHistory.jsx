import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const VitalsHistory = ({ patient }) => {
  const [selectedMetric, setSelectedMetric] = useState('bloodPressure');
  const [timeRange, setTimeRange] = useState('7days');

  // Mock historical data
  const vitalsData = {
    bloodPressure: [
      { date: '2024-01-09', systolic: 142, diastolic: 88, time: '08:00' },
      { date: '2024-01-10', systolic: 145, diastolic: 92, time: '08:15' },
      { date: '2024-01-11', systolic: 138, diastolic: 85, time: '08:30' },
      { date: '2024-01-12', systolic: 140, diastolic: 87, time: '08:00' },
      { date: '2024-01-13', systolic: 148, diastolic: 95, time: '08:45' },
      { date: '2024-01-14', systolic: 144, diastolic: 90, time: '08:20' },
      { date: '2024-01-15', systolic: 145, diastolic: 92, time: '08:30' }
    ],
    heartRate: [
      { date: '2024-01-09', value: 72, time: '08:00' },
      { date: '2024-01-10', value: 78, time: '08:15' },
      { date: '2024-01-11', value: 75, time: '08:30' },
      { date: '2024-01-12', value: 80, time: '08:00' },
      { date: '2024-01-13', value: 76, time: '08:45' },
      { date: '2024-01-14', value: 74, time: '08:20' },
      { date: '2024-01-15', value: 78, time: '08:30' }
    ],
    weight: [
      { date: '2024-01-09', value: 187, time: '08:00' },
      { date: '2024-01-10', value: 186, time: '08:15' },
      { date: '2024-01-11', value: 185, time: '08:30' },
      { date: '2024-01-12', value: 185, time: '08:00' },
      { date: '2024-01-13', value: 184, time: '08:45' },
      { date: '2024-01-14', value: 185, time: '08:20' },
      { date: '2024-01-15', value: 185, time: '08:30' }
    ],
    glucose: [
      { date: '2024-01-09', value: 145, time: '08:00' },
      { date: '2024-01-10', value: 165, time: '08:15' },
      { date: '2024-01-11', value: 155, time: '08:30' },
      { date: '2024-01-12', value: 148, time: '08:00' },
      { date: '2024-01-13', value: 172, time: '08:45' },
      { date: '2024-01-14', value: 158, time: '08:20' },
      { date: '2024-01-15', value: 165, time: '08:30' }
    ]
  };

  const metrics = [
    {
      id: 'bloodPressure',
      label: 'Blood Pressure',
      icon: 'Heart',
      unit: 'mmHg',
      normalRange: '< 120/80',
      color: '#EF4444'
    },
    {
      id: 'heartRate',
      label: 'Heart Rate',
      icon: 'Activity',
      unit: 'BPM',
      normalRange: '60-100',
      color: '#3B82F6'
    },
    {
      id: 'weight',
      label: 'Weight',
      icon: 'Scale',
      unit: 'lbs',
      normalRange: 'BMI 18.5-24.9',
      color: '#10B981'
    },
    {
      id: 'glucose',
      label: 'Blood Glucose',
      icon: 'Droplets',
      unit: 'mg/dL',
      normalRange: '70-140',
      color: '#F59E0B'
    }
  ];

  const timeRanges = [
    { id: '7days', label: '7 Days' },
    { id: '30days', label: '30 Days' },
    { id: '90days', label: '90 Days' },
    { id: '1year', label: '1 Year' }
  ];

  const selectedMetricData = metrics.find(m => m.id === selectedMetric);
  const chartData = vitalsData[selectedMetric] || [];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getAverageValue = (data) => {
    if (selectedMetric === 'bloodPressure') {
      const avgSystolic = data.reduce((sum, item) => sum + item.systolic, 0) / data.length;
      const avgDiastolic = data.reduce((sum, item) => sum + item.diastolic, 0) / data.length;
      return `${Math.round(avgSystolic)}/${Math.round(avgDiastolic)}`;
    }
    const avg = data.reduce((sum, item) => sum + item.value, 0) / data.length;
    return Math.round(avg);
  };

  const getLatestValue = (data) => {
    if (data.length === 0) return 'N/A';
    const latest = data[data.length - 1];
    if (selectedMetric === 'bloodPressure') {
      return `${latest.systolic}/${latest.diastolic}`;
    }
    return latest.value;
  };

  const isValueNormal = (value, metric) => {
    switch (metric) {
      case 'bloodPressure':
        return value.systolic < 120 && value.diastolic < 80;
      case 'heartRate':
        return value.value >= 60 && value.value <= 100;
      case 'glucose':
        return value.value >= 70 && value.value <= 140;
      default:
        return true;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-text-primary">Vitals History</h2>
        
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex bg-surface border border-border rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  timeRange === range.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-primary'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => setSelectedMetric(metric.id)}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              selectedMetric === metric.id
                ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary hover:bg-primary-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${selectedMetric === metric.id ? 'bg-primary' : 'bg-surface-secondary'}`}>
                <Icon 
                  name={metric.icon} 
                  size={20} 
                  className={selectedMetric === metric.id ? 'text-white' : 'text-text-secondary'} 
                />
              </div>
              <div className="text-left">
                <p className="font-medium text-text-primary">{metric.label}</p>
                <p className="text-sm text-text-secondary">{metric.normalRange}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-secondary">Latest Reading</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {getLatestValue(chartData)} {selectedMetricData?.unit}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {chartData.length > 0 && formatDate(chartData[chartData.length - 1].date)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BarChart3" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-text-secondary">Average ({timeRange})</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {getAverageValue(chartData)} {selectedMetricData?.unit}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Based on {chartData.length} readings
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-success" />
            <span className="text-sm font-medium text-text-secondary">Normal Range</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {selectedMetricData?.normalRange}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Clinical reference
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            {selectedMetricData?.label} Trend
          </h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Info" size={16} />
            <span>Normal range: {selectedMetricData?.normalRange}</span>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {selectedMetric === 'bloodPressure' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#6B7280"
                />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  labelFormatter={(value) => formatDate(value)}
                  formatter={(value, name) => [
                    `${value} mmHg`,
                    name === 'systolic' ? 'Systolic' : 'Diastolic'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#6B7280"
                />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  labelFormatter={(value) => formatDate(value)}
                  formatter={(value) => [`${value} ${selectedMetricData?.unit}`, selectedMetricData?.label]}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={selectedMetricData?.color} 
                  strokeWidth={2}
                  dot={{ fill: selectedMetricData?.color, strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Readings Table */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">Detailed Readings</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Value</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {chartData.map((reading, index) => (
                <tr key={index} className="hover:bg-surface-secondary transition-colors duration-200">
                  <td className="px-4 py-3 text-sm text-text-primary">
                    {new Date(reading.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {reading.time}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">
                    {selectedMetric === 'bloodPressure' 
                      ? `${reading.systolic}/${reading.diastolic} mmHg`
                      : `${reading.value} ${selectedMetricData?.unit}`
                    }
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      isValueNormal(reading, selectedMetric)
                        ? 'bg-success-50 text-success' :'bg-warning-50 text-warning'
                    }`}>
                      {isValueNormal(reading, selectedMetric) ? 'Normal' : 'Elevated'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {index === chartData.length - 1 && !isValueNormal(reading, selectedMetric) 
                      ? 'Monitor closely' :'Regular reading'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VitalsHistory;