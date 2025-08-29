import React, { useState, useRef, useEffect } from 'react';
import HeaderNavigation from 'components/ui/HeaderNavigation';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import QuickActionMenu from 'components/ui/QuickActionMenu';
import Icon from 'components/AppIcon';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AIHealthInsights = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [privacySettings, setPrivacySettings] = useState({
    aiAnalysis: 'full',
    dataSharing: 'limited',
    recommendations: 'personalized'
  });
  const chatEndRef = useRef(null);

  // Mock data for insights
  const priorityInsights = [
    {
      id: 1,
      type: 'alert',
      severity: 'high',
      title: 'Sleep Quality Declining',
      summary: 'Your sleep quality has decreased by 23% over the past week',
      details: `Analysis of your sleep patterns shows increased restlessness and reduced deep sleep phases. This correlates with elevated stress indicators and irregular bedtime schedules.

Key findings:
• Average deep sleep reduced from 2.1 to 1.6 hours
• Sleep efficiency dropped from 87% to 72%
• 3 nights with sleep interruptions >30 minutes

Recommended actions:
• Establish consistent bedtime routine
• Limit screen time 1 hour before sleep
• Consider relaxation techniques`,
      confidence: 94,
      dataPoints: 847,
      lastUpdated: '2 hours ago',
      actionable: true
    },
    {
      id: 2,
      type: 'achievement',
      severity: 'positive',
      title: 'Cardiovascular Improvement',
      summary: 'Your resting heart rate has improved by 8 BPM this month',
      details: `Consistent exercise routine and improved sleep quality have contributed to significant cardiovascular improvements.

Progress metrics:
• Resting HR: 72 → 64 BPM (11% improvement)
• HRV increased by 15ms
• Recovery time improved by 23%

This improvement indicates enhanced cardiovascular fitness and stress management.`,
      confidence: 91,
      dataPoints: 1240,
      lastUpdated: '4 hours ago',
      actionable: false
    },
    {
      id: 3,
      type: 'trend',
      severity: 'medium',
      title: 'Activity Pattern Shift',
      summary: 'Your most active hours have shifted from morning to evening',
      details: `Analysis shows a significant change in your daily activity distribution over the past month.

Pattern changes:
• Morning activity (6-10 AM): Decreased 34%
• Evening activity (6-10 PM): Increased 45%
• Peak activity now occurs at 7 PM vs previous 8 AM

This shift may impact sleep quality and energy levels throughout the day.`,
      confidence: 88,
      dataPoints: 2156,
      lastUpdated: '6 hours ago',
      actionable: true
    }
  ];

  const trendAnalysis = [
    { date: '2024-01-01', sleepQuality: 85, heartRate: 72, activity: 8500, stress: 3 },
    { date: '2024-01-02', sleepQuality: 82, heartRate: 74, activity: 9200, stress: 4 },
    { date: '2024-01-03', sleepQuality: 78, heartRate: 71, activity: 7800, stress: 5 },
    { date: '2024-01-04', sleepQuality: 75, heartRate: 73, activity: 8900, stress: 6 },
    { date: '2024-01-05', sleepQuality: 72, heartRate: 70, activity: 9500, stress: 4 },
    { date: '2024-01-06', sleepQuality: 69, heartRate: 68, activity: 8200, stress: 7 },
    { date: '2024-01-07', sleepQuality: 71, heartRate: 69, activity: 8800, stress: 5 }
  ];

  const correlationData = [
    { metric: 'Sleep Quality', correlation: 0.87, impact: 'High', description: 'Strong positive correlation with next-day energy levels' },
    { metric: 'Exercise Intensity', correlation: 0.72, impact: 'Medium', description: 'Moderate correlation with mood improvements' },
    { metric: 'Stress Levels', correlation: -0.65, impact: 'High', description: 'Negative correlation with sleep quality' },
    { metric: 'Nutrition Score', correlation: 0.58, impact: 'Medium', description: 'Positive correlation with energy stability' }
  ];

  const recommendations = [
    {
      id: 1,
      category: 'Sleep',
      title: 'Optimize Sleep Environment',
      description: 'Create ideal conditions for restorative sleep',
      difficulty: 'Easy',
      impact: 'High',
      estimatedTime: '1 week',
      actions: [
        'Set bedroom temperature to 65-68°F',
        'Use blackout curtains or eye mask',
        'Remove electronic devices from bedroom',
        'Invest in comfortable mattress and pillows'
      ],
      evidence: 'Studies show optimal sleep environment can improve sleep quality by 23%'
    },
    {
      id: 2,
      category: 'Exercise',
      title: 'Morning Movement Routine',
      description: 'Establish consistent morning activity to boost energy',
      difficulty: 'Medium',
      impact: 'High',
      estimatedTime: '2 weeks',
      actions: [
        'Start with 10-minute morning walk',
        'Add light stretching or yoga',
        'Gradually increase to 20-30 minutes',
        'Track energy levels throughout day'
      ],
      evidence: 'Morning exercise increases energy levels by 20% and improves mood'
    },
    {
      id: 3,
      category: 'Nutrition',
      title: 'Hydration Optimization',
      description: 'Improve hydration patterns for better performance',
      difficulty: 'Easy',
      impact: 'Medium',
      estimatedTime: '3 days',
      actions: [
        'Drink 16oz water upon waking',
        'Set hourly hydration reminders',
        'Monitor urine color for hydration status',
        'Reduce caffeine after 2 PM'
      ],
      evidence: 'Proper hydration improves cognitive function by 12%'
    }
  ];

  const initialChatMessages = [
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your AI Health Coach. I've analyzed your recent health data and I'm here to help you understand your patterns and improve your wellness.

Based on your data, I notice some interesting trends we should discuss. What would you like to know about your health today?`,
      timestamp: new Date(Date.now() - 300000),
      sources: []
    }
  ];

  useEffect(() => {
    setChatMessages(initialChatMessages);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(chatInput),
        timestamp: new Date(),
        sources: ['Sleep Foundation Study 2024', 'American Heart Association Guidelines', 'Your Personal Health Data']
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (input) => {
    const responses = {
      'heart rate': `Based on your recent data, your heart rate patterns show positive improvements. Your resting heart rate has decreased from 72 to 64 BPM over the past month, indicating improved cardiovascular fitness.

The elevation you mentioned might be related to:
• Increased stress levels (correlation: -0.65)
• Changes in sleep quality
• Caffeine intake timing
• Exercise intensity

I recommend monitoring your heart rate during different activities and noting any patterns with stress or sleep quality.`,
      'sleep': `Your sleep analysis reveals some concerning trends. Sleep quality has declined 23% this week, with key factors being:

• Reduced deep sleep phases (2.1 → 1.6 hours)
• Lower sleep efficiency (87% → 72%)
• Increased nighttime disruptions

The correlation between your sleep and next-day energy is very strong (0.87). Improving your sleep environment and establishing a consistent bedtime routine could significantly impact your overall wellness.`,
      'default': `I understand you're looking for insights about your health. Based on your recent data patterns, I can provide personalized analysis on:

• Sleep quality and optimization strategies
• Heart rate variability and cardiovascular health
• Activity patterns and energy levels
• Stress management techniques
• Nutrition and hydration optimization

What specific aspect would you like me to analyze in detail?`
    };

    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('heart') || lowerInput.includes('rate')) return responses['heart rate'];
    if (lowerInput.includes('sleep')) return responses['sleep'];
    return responses['default'];
  };

  const handleExportReport = () => {
    console.log('Generating FHIR-compliant report...');
    // Simulate report generation
    setTimeout(() => {
      alert('Health insights report generated successfully. Check your downloads folder.');
    }, 1500);
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'alert': return 'AlertTriangle';
      case 'achievement': return 'Trophy';
      case 'trend': return 'TrendingUp';
      default: return 'Info';
    }
  };

  const getInsightColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'positive': return 'text-success';
      case 'medium': return 'text-warning';
      default: return 'text-primary';
    }
  };

  const getInsightBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error-50 border-error-200';
      case 'positive': return 'bg-success-50 border-success-200';
      case 'medium': return 'bg-warning-50 border-warning-200';
      default: return 'bg-primary-50 border-primary-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-success bg-success-50';
      case 'Medium': return 'text-warning bg-warning-50';
      case 'Hard': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-surface-secondary';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-success bg-success-50';
      case 'Medium': return 'text-warning bg-warning-50';
      case 'Low': return 'text-text-secondary bg-surface-secondary';
      default: return 'text-text-secondary bg-surface-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <main className="pt-16 pb-20 md:pb-8">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary font-heading">
                AI Health Insights
              </h1>
              <p className="text-text-secondary mt-1">
                Personalized analysis and recommendations powered by AI
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={handleExportReport}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Download" size={16} />
                <span className="hidden sm:inline">Export Report</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-md text-text-secondary hover:text-primary hover:border-primary transition-all duration-200">
                <Icon name="Settings" size={16} />
                <span className="hidden sm:inline">Privacy</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-border mb-6">
            {[
              { key: 'insights', label: 'Priority Insights', icon: 'Brain' },
              { key: 'trends', label: 'Trend Analysis', icon: 'TrendingUp' },
              { key: 'recommendations', label: 'Recommendations', icon: 'Target' },
              { key: 'coach', label: 'AI Coach', icon: 'MessageCircle' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'text-primary border-primary bg-primary-50' :'text-text-secondary border-transparent hover:text-primary hover:border-primary hover:bg-primary-50'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Priority Insights Tab */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              {/* Priority Insights Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {priorityInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`card p-6 border-l-4 cursor-pointer hover:shadow-medium transition-all duration-200 ${getInsightBg(insight.severity)}`}
                    onClick={() => setSelectedInsight(insight)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2 rounded-lg ${getInsightBg(insight.severity)}`}>
                        <Icon
                          name={getInsightIcon(insight.type)}
                          size={20}
                          className={getInsightColor(insight.severity)}
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-text-secondary">Confidence</div>
                        <div className="text-sm font-semibold text-text-primary">
                          {insight.confidence}%
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {insight.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4">
                      {insight.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-text-tertiary">
                      <span>{insight.dataPoints} data points</span>
                      <span>{insight.lastUpdated}</span>
                    </div>
                    
                    {insight.actionable && (
                      <div className="mt-3 pt-3 border-t border-border-light">
                        <span className="inline-flex items-center space-x-1 text-xs text-primary font-medium">
                          <Icon name="ArrowRight" size={12} />
                          <span>View recommendations</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Detailed Insight Modal */}
              {selectedInsight && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[1200] flex items-center justify-center p-4 fade-in">
                  <div className="bg-surface rounded-lg shadow-large max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getInsightBg(selectedInsight.severity)}`}>
                            <Icon
                              name={getInsightIcon(selectedInsight.type)}
                              size={20}
                              className={getInsightColor(selectedInsight.severity)}
                            />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-text-primary">
                              {selectedInsight.title}
                            </h2>
                            <p className="text-text-secondary text-sm">
                              Confidence: {selectedInsight.confidence}% • {selectedInsight.dataPoints} data points
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedInsight(null)}
                          className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
                        >
                          <Icon name="X" size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="prose max-w-none text-text-primary">
                        <p className="whitespace-pre-line">{selectedInsight.details}</p>
                      </div>
                      
                      {selectedInsight.actionable && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <button
                            onClick={() => {
                              setSelectedInsight(null);
                              setActiveTab('recommendations');
                            }}
                            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                          >
                            <Icon name="Target" size={16} />
                            <span>View Recommendations</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Trend Analysis Tab */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              {/* Trend Visualization */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Health Metrics Trends (Last 7 Days)
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#6B7280"
                        fontSize={12}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis stroke="#6B7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sleepQuality" 
                        stroke="#2563EB" 
                        strokeWidth={2}
                        name="Sleep Quality (%)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="heartRate" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        name="Heart Rate (BPM)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="stress" 
                        stroke="#F59E0B" 
                        strokeWidth={2}
                        name="Stress Level (1-10)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Correlation Analysis */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Metric Correlations
                </h3>
                <div className="space-y-4">
                  {correlationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-text-primary">{item.metric}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                            {item.impact} Impact
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-text-primary">
                          {item.correlation > 0 ? '+' : ''}{item.correlation}
                        </div>
                        <div className="text-xs text-text-secondary">Correlation</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary-50 rounded-lg">
                          <Icon name="Target" size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-text-primary">
                            {rec.title}
                          </h3>
                          <p className="text-text-secondary text-sm">{rec.category}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                          {rec.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(rec.impact)}`}>
                          {rec.impact} Impact
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary mb-4">{rec.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-text-primary mb-2">Action Steps:</h4>
                      <ul className="space-y-2">
                        {rec.actions.map((action, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                            <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">
                          <Icon name="Clock" size={14} className="inline mr-1" />
                          {rec.estimatedTime}
                        </span>
                        <button className="text-primary hover:text-primary-700 font-medium transition-colors duration-200">
                          Start Plan
                        </button>
                      </div>
                      <p className="text-xs text-text-tertiary mt-2 italic">
                        {rec.evidence}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Coach Tab */}
          {activeTab === 'coach' && (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <div className="card h-[600px] flex flex-col">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <Icon name="Brain" size={20} color="white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">AI Health Coach</h3>
                        <p className="text-sm text-text-secondary">Ask me anything about your health</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`p-3 rounded-lg ${
                              message.type === 'user' ?'bg-primary text-white' :'bg-surface-secondary text-text-primary'
                            }`}
                          >
                            <p className="whitespace-pre-line">{message.content}</p>
                            {message.sources && message.sources.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-border-light">
                                <p className="text-xs opacity-75">Sources:</p>
                                <ul className="text-xs opacity-75 mt-1">
                                  {message.sources.map((source, index) => (
                                    <li key={index}>• {source}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-text-tertiary mt-1 px-3">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-surface-secondary p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  
                  <form onSubmit={handleChatSubmit} className="p-4 border-t border-border">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about your health patterns, symptoms, or get recommendations..."
                        className="flex-1 px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim() || isTyping}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <Icon name="Send" size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Quick Questions & Privacy Settings */}
              <div className="space-y-6">
                {/* Quick Questions */}
                <div className="card p-4">
                  <h4 className="font-semibold text-text-primary mb-3">Quick Questions</h4>
                  <div className="space-y-2">
                    {[
                      'Why is my heart rate elevated?',
                      'How can I improve my sleep?',
                      'What affects my energy levels?',
                      'Are my stress levels normal?'
                    ].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setChatInput(question)}
                        className="w-full text-left p-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-all duration-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Privacy Settings */}
                <div className="card p-4">
                  <h4 className="font-semibold text-text-primary mb-3">AI Analysis Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Analysis Depth
                      </label>
                      <select
                        value={privacySettings.aiAnalysis}
                        onChange={(e) => setPrivacySettings(prev => ({ ...prev, aiAnalysis: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm"
                      >
                        <option value="basic">Basic Insights</option>
                        <option value="standard">Standard Analysis</option>
                        <option value="full">Full AI Analysis</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Data Sharing
                      </label>
                      <select
                        value={privacySettings.dataSharing}
                        onChange={(e) => setPrivacySettings(prev => ({ ...prev, dataSharing: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm"
                      >
                        <option value="none">No Sharing</option>
                        <option value="limited">Limited Sharing</option>
                        <option value="full">Full Sharing</option>
                      </select>
                    </div>
                    
                    <div className="pt-3 border-t border-border">
                      <div className="flex items-center space-x-2 text-xs text-text-secondary">
                        <Icon name="Shield" size={12} />
                        <span>HIPAA Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomTabNavigation />
      <QuickActionMenu />
    </div>
  );
};

export default AIHealthInsights;