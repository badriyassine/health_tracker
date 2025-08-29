import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AIInsights = ({ patient }) => {
  const [selectedInsight, setSelectedInsight] = useState('anomalies');
  const [timeframe, setTimeframe] = useState('30days');

  // Mock AI insights data
  const anomalies = [
    {
      id: 1,
      type: 'cardiovascular',
      severity: 'high',
      title: 'Irregular Heart Rate Pattern Detected',
      description: 'Machine learning analysis detected irregular heart rate patterns during sleep hours. Pattern suggests possible sleep apnea or cardiac arrhythmia.',
      confidence: 87,
      detectedAt: '2024-01-15T02:30:00Z',
      recommendation: 'Recommend sleep study and 24-hour Holter monitor',
      dataPoints: ['Heart rate variability', 'Sleep quality metrics', 'Blood oxygen levels'],
      riskLevel: 'High'
    },
    {
      id: 2,
      type: 'metabolic',
      severity: 'medium',
      title: 'Blood Glucose Spike Pattern',
      description: 'AI classifier identified recurring post-meal glucose spikes exceeding 180 mg/dL. Pattern correlates with specific meal types and timing.',
      confidence: 92,
      detectedAt: '2024-01-14T14:45:00Z',
      recommendation: 'Review dietary habits and consider continuous glucose monitoring',
      dataPoints: ['Blood glucose readings', 'Meal timing', 'Activity levels'],
      riskLevel: 'Medium'
    },
    {
      id: 3,
      type: 'activity',
      severity: 'low',
      title: 'Sedentary Behavior Increase',
      description: 'Trend analysis shows 35% increase in sedentary time over the past 2 weeks. Correlates with decreased sleep quality.',
      confidence: 78,
      detectedAt: '2024-01-13T09:15:00Z',
      recommendation: 'Implement structured activity breaks and sleep hygiene protocol',
      dataPoints: ['Step count', 'Active minutes', 'Sleep duration'],
      riskLevel: 'Low'
    }
  ];

  const predictions = [
    {
      id: 1,
      type: 'cardiovascular',
      title: 'Hypertension Risk Assessment',
      prediction: 'Based on current trends, 73% probability of blood pressure exceeding 150/95 within next 30 days',
      confidence: 73,
      timeframe: '30 days',
      factors: ['Current BP trend', 'Medication adherence', 'Stress levels', 'Sleep quality'],
      recommendation: 'Consider medication adjustment and lifestyle interventions'
    },
    {
      id: 2,
      type: 'metabolic',
      title: 'Diabetes Progression Model',
      prediction: 'HbA1c likely to increase by 0.3-0.5% if current patterns continue',
      confidence: 81,
      timeframe: '90 days',
      factors: ['Glucose variability', 'Diet patterns', 'Exercise consistency', 'Weight trends'],
      recommendation: 'Intensify diabetes management and dietary counseling'
    },
    {
      id: 3,
      type: 'wellness',
      title: 'Sleep Quality Forecast',
      prediction: 'Sleep efficiency expected to improve by 15% with recommended interventions',
      confidence: 69,
      timeframe: '14 days',
      factors: ['Current sleep patterns', 'Activity levels', 'Stress indicators'],
      recommendation: 'Implement sleep hygiene protocol and monitor progress'
    }
  ];

  const recommendations = [
    {
      id: 1,
      category: 'Immediate Actions',
      priority: 'high',
      items: [
        {
          action: 'Schedule 24-hour Holter monitor',
          reason: 'Irregular heart rate patterns detected during sleep',
          urgency: 'Within 1 week'
        },
        {
          action: 'Review current medications',
          reason: 'Blood pressure trending upward despite current regimen',
          urgency: 'Next appointment'
        }
      ]
    },
    {
      id: 2,
      category: 'Lifestyle Interventions',
      priority: 'medium',
      items: [
        {
          action: 'Implement structured meal timing',
          reason: 'Post-meal glucose spikes correlate with irregular eating patterns',
          urgency: 'Within 2 weeks'
        },
        {
          action: 'Increase daily activity by 2000 steps',
          reason: 'Sedentary behavior increase affecting multiple health metrics',
          urgency: 'Gradual implementation'
        }
      ]
    },
    {
      id: 3,
      category: 'Monitoring Adjustments',
      priority: 'low',
      items: [
        {
          action: 'Add continuous glucose monitoring',
          reason: 'Better understanding of glucose variability patterns needed',
          urgency: 'Consider for next quarter'
        },
        {
          action: 'Sleep study evaluation',
          reason: 'Sleep quality affecting multiple health parameters',
          urgency: 'Schedule within 1 month'
        }
      ]
    }
  ];

  const insightTypes = [
    { id: 'anomalies', label: 'Anomaly Detection', icon: 'AlertTriangle' },
    { id: 'predictions', label: 'Predictive Models', icon: 'TrendingUp' },
    { id: 'recommendations', label: 'AI Recommendations', icon: 'Lightbulb' }
  ];

  const timeframes = [
    { id: '7days', label: '7 Days' },
    { id: '30days', label: '30 Days' },
    { id: '90days', label: '90 Days' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-surface-secondary border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const renderAnomalies = () => (
    <div className="space-y-4">
      {anomalies.map((anomaly) => (
        <div key={anomaly.id} className={`border rounded-lg p-6 ${getSeverityColor(anomaly.severity)}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={24} />
              <div>
                <h3 className="font-semibold text-lg mb-1">{anomaly.title}</h3>
                <p className="text-sm opacity-90 mb-2">{anomaly.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span>Confidence: {anomaly.confidence}%</span>
                  <span>Risk: {anomaly.riskLevel}</span>
                  <span>Detected: {new Date(anomaly.detectedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-medium mb-2">Data Points Analyzed</h4>
              <ul className="text-sm space-y-1">
                {anomaly.dataPoints.map((point, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Recommended Action</h4>
              <p className="text-sm">{anomaly.recommendation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPredictions = () => (
    <div className="space-y-4">
      {predictions.map((prediction) => (
        <div key={prediction.id} className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg text-text-primary mb-2">{prediction.title}</h3>
              <p className="text-text-secondary mb-3">{prediction.prediction}</p>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>Confidence: {prediction.confidence}%</span>
                <span>Timeframe: {prediction.timeframe}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 rounded-full border-4 border-primary-200 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{prediction.confidence}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Contributing Factors</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                {prediction.factors.map((factor, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="ArrowRight" size={14} />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-2">Recommendation</h4>
              <p className="text-sm text-text-secondary">{prediction.recommendation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      {recommendations.map((category) => (
        <div key={category.id} className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon 
              name={category.priority === 'high' ? 'AlertCircle' : category.priority === 'medium' ? 'Clock' : 'Info'} 
              size={20} 
              className={getPriorityColor(category.priority)} 
            />
            <h3 className="font-semibold text-lg text-text-primary">{category.category}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              category.priority === 'high' ? 'bg-error-50 text-error' :
              category.priority === 'medium'? 'bg-warning-50 text-warning' : 'bg-success-50 text-success'
            }`}>
              {category.priority.toUpperCase()} PRIORITY
            </span>
          </div>
          
          <div className="space-y-4">
            {category.items.map((item, index) => (
              <div key={index} className="border border-border-light rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-text-primary">{item.action}</h4>
                  <span className="text-xs text-text-secondary bg-surface-secondary px-2 py-1 rounded">
                    {item.urgency}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (selectedInsight) {
      case 'anomalies': return renderAnomalies();
      case 'predictions': return renderPredictions();
      case 'recommendations': return renderRecommendations();
      default: return renderAnomalies();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-text-primary">AI Health Insights</h2>
        
        <div className="flex items-center space-x-4">
          {/* Timeframe Selector */}
          <div className="flex bg-surface border border-border rounded-lg p-1">
            {timeframes.map((time) => (
              <button
                key={time.id}
                onClick={() => setTimeframe(time.id)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  timeframe === time.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-primary'
                }`}
              >
                {time.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Model Status */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="Brain" size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-primary">AI Analysis Status</h3>
            <p className="text-sm text-primary-700">
              Last updated: {new Date().toLocaleString()} • 
              Models: Cardiovascular Risk v2.1, Metabolic Trend v1.8, Activity Pattern v1.5
            </p>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-50 text-success">
              <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Insight Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insightTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedInsight(type.id)}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              selectedInsight === type.id
                ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary hover:bg-primary-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedInsight === type.id ? 'bg-primary' : 'bg-surface-secondary'
              }`}>
                <Icon 
                  name={type.icon} 
                  size={20} 
                  className={selectedInsight === type.id ? 'text-white' : 'text-text-secondary'} 
                />
              </div>
              <span className="font-medium text-text-primary">{type.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}

      {/* AI Disclaimer */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-warning mb-1">AI Analysis Disclaimer</h4>
            <p className="text-sm text-warning-700">
              These insights are generated by machine learning models and should be used as clinical decision support tools only. 
              All recommendations require clinical validation and should not replace professional medical judgment. 
              Model accuracy may vary based on data quality and individual patient factors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;