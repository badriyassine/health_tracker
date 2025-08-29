import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import HeaderNavigation from 'components/ui/HeaderNavigation';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import QuickActionMenu from 'components/ui/QuickActionMenu';
import TodaySummaryCard from './components/TodaySummaryCard';
import WeeklyTrendChart from './components/WeeklyTrendChart';
import AIInsightsPanel from './components/AIInsightsPanel';
import RecentActivity from './components/RecentActivity';
import GoalProgressIndicator from './components/GoalProgressIndicator';
import EmergencyAlert from './components/EmergencyAlert';

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  // Mock data for today's summary
  const todaysSummary = [
    {
      id: 'steps',
      title: 'Steps',
      value: '8,247',
      target: '10,000',
      percentage: 82,
      icon: 'Footprints',
      color: 'primary',
      trend: '+12%',
      unit: 'steps'
    },
    {
      id: 'heart-rate',
      title: 'Heart Rate',
      value: '72',
      target: '60-100',
      percentage: 85,
      icon: 'Heart',
      color: 'error',
      trend: 'Normal',
      unit: 'bpm'
    },
    {
      id: 'sleep',
      title: 'Sleep',
      value: '7h 23m',
      target: '8h',
      percentage: 92,
      icon: 'Moon',
      color: 'accent',
      trend: '+15min',
      unit: 'hours'
    },
    {
      id: 'calories',
      title: 'Calories',
      value: '1,847',
      target: '2,200',
      percentage: 84,
      icon: 'Flame',
      color: 'warning',
      trend: '-3%',
      unit: 'kcal'
    }
  ];

  // Mock data for weekly trends
  const weeklyTrends = [
    {
      id: 'activity',
      title: 'Activity Trends',
      type: 'line',
      data: [
        { day: 'Mon', steps: 8500, calories: 2100 },
        { day: 'Tue', steps: 9200, calories: 2250 },
        { day: 'Wed', steps: 7800, calories: 1950 },
        { day: 'Thu', steps: 10500, calories: 2400 },
        { day: 'Fri', steps: 8900, calories: 2150 },
        { day: 'Sat', steps: 12000, calories: 2600 },
        { day: 'Sun', steps: 8247, calories: 1847 }
      ]
    },
    {
      id: 'sleep',
      title: 'Sleep Quality',
      type: 'bar',
      data: [
        { day: 'Mon', duration: 7.5, quality: 85 },
        { day: 'Tue', duration: 8.2, quality: 92 },
        { day: 'Wed', duration: 6.8, quality: 78 },
        { day: 'Thu', duration: 7.9, quality: 88 },
        { day: 'Fri', duration: 7.2, quality: 82 },
        { day: 'Sat', duration: 8.5, quality: 95 },
        { day: 'Sun', duration: 7.4, quality: 87 }
      ]
    },
    {
      id: 'heart-rate',
      title: 'Heart Rate Variability',
      type: 'area',
      data: [
        { day: 'Mon', resting: 68, avg: 75, max: 145 },
        { day: 'Tue', resting: 70, avg: 78, max: 152 },
        { day: 'Wed', resting: 69, avg: 74, max: 138 },
        { day: 'Thu', resting: 71, avg: 82, max: 165 },
        { day: 'Fri', resting: 67, avg: 76, max: 148 },
        { day: 'Sat', resting: 72, avg: 85, max: 172 },
        { day: 'Sun', resting: 72, avg: 77, max: 142 }
      ]
    }
  ];

  // Mock data for goals
  const goals = [
    {
      id: 'daily-steps',
      title: 'Daily Steps Goal',
      current: 8247,
      target: 10000,
      percentage: 82,
      timeframe: 'Today',
      icon: 'Target',
      color: 'primary'
    },
    {
      id: 'weekly-exercise',
      title: 'Weekly Exercise',
      current: 4,
      target: 5,
      percentage: 80,
      timeframe: 'This Week',
      icon: 'Activity',
      color: 'secondary'
    },
    {
      id: 'weight-loss',
      title: 'Weight Loss',
      current: 3.2,
      target: 5,
      percentage: 64,
      timeframe: 'This Month',
      icon: 'TrendingDown',
      color: 'accent'
    }
  ];

  // Mock emergency alert
  const emergencyAlert = {
    id: 'heart-rate-spike',
    type: 'warning',
    title: 'Heart Rate Spike Detected',
    message: 'Your heart rate reached 185 BPM during your workout. Consider taking a break and monitoring your intensity.',
    timestamp: new Date(Date.now() - 300000),
    severity: 'medium',
    dismissed: false
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <main className="pt-16 pb-20 md:pb-8">
        {/* Emergency Alert */}
        {!emergencyAlert.dismissed && (
          <EmergencyAlert alert={emergencyAlert} />
        )}

        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary font-heading">
                Good morning, John
              </h1>
              <p className="text-text-secondary mt-1">
                Here's your health overview for today
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-text-tertiary">Last sync</p>
                <p className="text-sm text-text-secondary">
                  {lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary-50 disabled:opacity-50"
              >
                <Icon 
                  name="RefreshCw" 
                  size={20} 
                  className={isRefreshing ? 'animate-spin' : ''} 
                />
              </button>
            </div>
          </div>

          {/* Today's Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {todaysSummary.map((metric) => (
              <TodaySummaryCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 mb-8">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {weeklyTrends.map((trend) => (
                <WeeklyTrendChart key={trend.id} trend={trend} />
              ))}
            </div>

            {/* Right Column - Insights & Activity */}
            <div className="space-y-6">
              <AIInsightsPanel />
              <GoalProgressIndicator goals={goals} />
              <RecentActivity />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Quick Actions */}
            <div className="bg-surface rounded-lg shadow-light border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-3">
                <Link
                  to="/health-data-tracking"
                  className="flex flex-col items-center space-y-2 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                >
                  <Icon name="Utensils" size={24} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Log Food</span>
                </Link>
                
                <Link
                  to="/health-data-tracking"
                  className="flex flex-col items-center space-y-2 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                >
                  <Icon name="Activity" size={24} className="text-secondary" />
                  <span className="text-sm font-medium text-secondary">Record Activity</span>
                </Link>
                
                <Link
                  to="/health-data-tracking"
                  className="flex flex-col items-center space-y-2 p-4 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors duration-200"
                >
                  <Icon name="Plus" size={24} className="text-accent" />
                  <span className="text-sm font-medium text-accent">Add Measurement</span>
                </Link>
              </div>
            </div>

            {/* AI Insights */}
            <AIInsightsPanel />

            {/* Goal Progress */}
            <GoalProgressIndicator goals={goals} />

            {/* Weekly Trends */}
            {weeklyTrends.map((trend) => (
              <WeeklyTrendChart key={trend.id} trend={trend} />
            ))}

            {/* Recent Activity */}
            <RecentActivity />
          </div>

          {/* Health Tips Section */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 mt-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary rounded-lg">
                <Icon name="Lightbulb" size={24} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Daily Health Tip
                </h3>
                <p className="text-text-secondary mb-4">
                  Stay hydrated! Aim for 8 glasses of water throughout the day. Proper hydration 
                  supports your cardiovascular health and helps maintain optimal energy levels.
                </p>
                <Link
                  to="/ai-health-insights"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  <span>Get personalized insights</span>
                  <Icon name="ArrowRight" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
      <QuickActionMenu />
    </div>
  );
};

export default Dashboard;