import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from 'components/AppIcon';

const ProgressChart = ({ data }) => {
  const [chartType, setChartType] = useState('line');
  const [selectedMetric, setSelectedMetric] = useState('steps');

  const metrics = [
    { key: 'steps', label: 'Steps', color: '#2563EB', unit: 'steps' },
    { key: 'sleep', label: 'Sleep', color: '#7C3AED', unit: 'hours' },
    { key: 'water', label: 'Water', color: '#059669', unit: 'glasses' },
    { key: 'workout', label: 'Workouts', color: '#F59E0B', unit: 'sessions' }
  ];

  const currentMetric = metrics.find(m => m.key === selectedMetric);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-medium">
          <p className="text-text-primary font-medium">{label}</p>
          <p className="text-text-secondary">
            <span className="font-medium" style={{ color: currentMetric.color }}>
              {value} {currentMetric.unit}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const getAverageValue = () => {
    const total = data.reduce((sum, day) => sum + day[selectedMetric], 0);
    return (total / data.length).toFixed(1);
  };

  const getBestDay = () => {
    const best = data.reduce((max, day) => 
      day[selectedMetric] > max[selectedMetric] ? day : max
    );
    return best;
  };

  const getTrend = () => {
    const firstHalf = data.slice(0, Math.ceil(data.length / 2));
    const secondHalf = data.slice(Math.ceil(data.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, day) => sum + day[selectedMetric], 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, day) => sum + day[selectedMetric], 0) / secondHalf.length;
    
    const change = ((secondAvg - firstAvg) / firstAvg) * 100;
    return {
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      percentage: Math.abs(change).toFixed(1)
    };
  };

  const trend = getTrend();
  const bestDay = getBestDay();

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Weekly Progress</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`p-1.5 rounded transition-colors duration-200 ${
              chartType === 'line' ?'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-50'
            }`}
          >
            <Icon name="TrendingUp" size={16} />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-1.5 rounded transition-colors duration-200 ${
              chartType === 'bar' ?'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-50'
            }`}
          >
            <Icon name="BarChart3" size={16} />
          </button>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedMetric === metric.key
                ? 'text-white' :'bg-surface-secondary text-text-secondary hover:bg-border'
            }`}
            style={{
              backgroundColor: selectedMetric === metric.key ? metric.color : undefined
            }}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={currentMetric.color}
                strokeWidth={3}
                dot={{ fill: currentMetric.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: currentMetric.color, strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={selectedMetric}
                fill={currentMetric.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-text-primary">
            {getAverageValue()}
          </div>
          <div className="text-xs text-text-secondary">
            Avg {currentMetric.unit}
          </div>
        </div>
        
        <div>
          <div className="text-lg font-bold text-text-primary">
            {bestDay[selectedMetric]}
          </div>
          <div className="text-xs text-text-secondary">
            Best ({bestDay.day})
          </div>
        </div>
        
        <div>
          <div className={`flex items-center justify-center space-x-1 text-lg font-bold ${
            trend.direction === 'up' ? 'text-success' : 
            trend.direction === 'down' ? 'text-error' : 'text-text-secondary'
          }`}>
            <Icon 
              name={
                trend.direction === 'up' ? 'TrendingUp' : 
                trend.direction === 'down' ? 'TrendingDown' : 'Minus'
              } 
              size={16} 
            />
            <span>{trend.percentage}%</span>
          </div>
          <div className="text-xs text-text-secondary">
            Weekly trend
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;