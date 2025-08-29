import React, { useState, useEffect } from 'react';
import HeaderNavigation from 'components/ui/HeaderNavigation';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import QuickActionMenu from 'components/ui/QuickActionMenu';
import Icon from 'components/AppIcon';
import GoalCard from './components/GoalCard';
import GoalCreationModal from './components/GoalCreationModal';
import ProgressChart from './components/ProgressChart';
import AchievementCelebration from './components/AchievementCelebration';

const GoalsProgress = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGoalType, setSelectedGoalType] = useState('fitness');
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementData, setAchievementData] = useState(null);

  // Mock goals data
  const goals = [
    {
      id: 1,
      title: 'Daily Steps',
      category: 'fitness',
      type: 'daily',
      target: 10000,
      current: 7500,
      unit: 'steps',
      streak: 5,
      icon: 'Footprints',
      color: 'primary',
      lastUpdated: '2 hours ago',
      difficulty: 'medium',
      isActive: true
    },
    {
      id: 2,
      title: 'Sleep Duration',
      category: 'sleep',
      type: 'daily',
      target: 8,
      current: 7.5,
      unit: 'hours',
      streak: 12,
      icon: 'Moon',
      color: 'accent',
      lastUpdated: '8 hours ago',
      difficulty: 'easy',
      isActive: true
    },
    {
      id: 3,
      title: 'Water Intake',
      category: 'nutrition',
      type: 'daily',
      target: 8,
      current: 6,
      unit: 'glasses',
      streak: 3,
      icon: 'Droplets',
      color: 'secondary',
      lastUpdated: '1 hour ago',
      difficulty: 'easy',
      isActive: true
    },
    {
      id: 4,
      title: 'Weekly Workouts',
      category: 'fitness',
      type: 'weekly',
      target: 5,
      current: 3,
      unit: 'sessions',
      streak: 2,
      icon: 'Dumbbell',
      color: 'warning',
      lastUpdated: 'Yesterday',
      difficulty: 'hard',
      isActive: true
    },
    {
      id: 5,
      title: 'Meditation',
      category: 'wellness',
      type: 'daily',
      target: 15,
      current: 15,
      unit: 'minutes',
      streak: 7,
      icon: 'Brain',
      color: 'accent',
      lastUpdated: '3 hours ago',
      difficulty: 'medium',
      isActive: true
    },
    {
      id: 6,
      title: 'Weight Loss',
      category: 'fitness',
      type: 'monthly',
      target: 2,
      current: 1.2,
      unit: 'kg',
      streak: 1,
      icon: 'Scale',
      color: 'error',
      lastUpdated: '1 day ago',
      difficulty: 'hard',
      isActive: true
    }
  ];

  const completedGoals = [
    {
      id: 7,
      title: 'Morning Routine',
      category: 'wellness',
      type: 'daily',
      target: 30,
      current: 30,
      unit: 'days',
      streak: 30,
      icon: 'Sun',
      color: 'success',
      completedDate: '2024-01-15',
      isActive: false
    },
    {
      id: 8,
      title: 'No Sugar Challenge',
      category: 'nutrition',
      type: 'weekly',
      target: 4,
      current: 4,
      unit: 'weeks',
      streak: 28,
      icon: 'Ban',
      color: 'secondary',
      completedDate: '2024-01-10',
      isActive: false
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', steps: 8500, sleep: 7.5, water: 8, workout: 1 },
    { day: 'Tue', steps: 9200, sleep: 8, water: 7, workout: 0 },
    { day: 'Wed', steps: 10500, sleep: 7, water: 8, workout: 1 },
    { day: 'Thu', steps: 7800, sleep: 8.5, water: 6, workout: 1 },
    { day: 'Fri', steps: 11200, sleep: 7.5, water: 9, workout: 0 },
    { day: 'Sat', steps: 12000, sleep: 9, water: 8, workout: 1 },
    { day: 'Sun', steps: 7500, sleep: 7.5, water: 6, workout: 0 }
  ];

  const goalCategories = [
    { id: 'fitness', label: 'Fitness', icon: 'Activity', color: 'primary' },
    { id: 'nutrition', label: 'Nutrition', icon: 'Apple', color: 'secondary' },
    { id: 'sleep', label: 'Sleep', icon: 'Moon', color: 'accent' },
    { id: 'wellness', label: 'Wellness', icon: 'Heart', color: 'warning' }
  ];

  useEffect(() => {
    // Check for completed goals and trigger celebration
    const recentlyCompleted = goals.find(goal => 
      goal.current >= goal.target && goal.streak === 1
    );
    
    if (recentlyCompleted) {
      setAchievementData(recentlyCompleted);
      setShowAchievement(true);
    }
  }, []);

  const handleCreateGoal = (goalData) => {
    console.log('Creating new goal:', goalData);
    setIsCreateModalOpen(false);
  };

  const handleGoalUpdate = (goalId, newValue) => {
    console.log('Updating goal:', goalId, 'with value:', newValue);
  };

  const handleGoalToggle = (goalId) => {
    console.log('Toggling goal:', goalId);
  };

  const getOverallProgress = () => {
    const activeGoals = goals.filter(goal => goal.isActive);
    const completedToday = activeGoals.filter(goal => 
      goal.current >= goal.target
    ).length;
    return Math.round((completedToday / activeGoals.length) * 100);
  };

  const getStreakStats = () => {
    const activeGoals = goals.filter(goal => goal.isActive);
    const totalStreak = activeGoals.reduce((sum, goal) => sum + goal.streak, 0);
    const avgStreak = Math.round(totalStreak / activeGoals.length);
    const longestStreak = Math.max(...activeGoals.map(goal => goal.streak));
    
    return { avgStreak, longestStreak, totalGoals: activeGoals.length };
  };

  const filteredGoals = activeTab === 'current' ? goals : completedGoals;
  const overallProgress = getOverallProgress();
  const streakStats = getStreakStats();

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <main className="pt-16 pb-20 md:pb-8">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-heading">
                  Goals & Progress
                </h1>
                <p className="text-text-secondary mt-1">
                  Track your health journey and celebrate achievements
                </p>
              </div>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Plus" size={18} />
                <span>New Goal</span>
              </button>
            </div>

            {/* Overall Progress Card */}
            <div className="bg-surface rounded-lg border border-border p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-border"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallProgress / 100)}`}
                        className="text-primary transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-text-primary">
                        {overallProgress}%
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">Today's Progress</h3>
                  <p className="text-text-secondary text-sm">
                    {goals.filter(g => g.isActive && g.current >= g.target).length} of {goals.filter(g => g.isActive).length} goals completed
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Flame" size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">Average Streak</h3>
                  <p className="text-2xl font-bold text-secondary">{streakStats.avgStreak}</p>
                  <p className="text-text-secondary text-sm">days</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-warning-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Trophy" size={24} className="text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">Longest Streak</h3>
                  <p className="text-2xl font-bold text-warning">{streakStats.longestStreak}</p>
                  <p className="text-text-secondary text-sm">days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-surface-secondary rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('current')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'current' ?'bg-surface text-primary shadow-light' :'text-text-secondary hover:text-primary'
              }`}
            >
              Current Goals ({goals.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'completed'
                  ? 'bg-surface text-primary shadow-light' :'text-text-secondary hover:text-primary'
              }`}
            >
              Completed ({completedGoals.length})
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Goals List */}
            <div className="lg:col-span-2">
              {activeTab === 'current' && (
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">Filter by Category</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedGoalType('all')}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedGoalType === 'all' ?'bg-primary text-white' :'bg-surface-secondary text-text-secondary hover:bg-border'
                      }`}
                    >
                      All Goals
                    </button>
                    {goalCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedGoalType(category.id)}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                          selectedGoalType === category.id
                            ? `bg-${category.color} text-white`
                            : 'bg-surface-secondary text-text-secondary hover:bg-border'
                        }`}
                      >
                        <Icon name={category.icon} size={14} />
                        <span>{category.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {filteredGoals
                  .filter(goal => selectedGoalType === 'all' || goal.category === selectedGoalType)
                  .map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      onUpdate={handleGoalUpdate}
                      onToggle={handleGoalToggle}
                    />
                  ))}
              </div>

              {filteredGoals.filter(goal => selectedGoalType === 'all' || goal.category === selectedGoalType).length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Target" size={48} className="text-text-tertiary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    {activeTab === 'current' ? 'No active goals' : 'No completed goals'}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {activeTab === 'current' ?'Start your health journey by creating your first goal' :'Complete some goals to see them here'
                    }
                  </p>
                  {activeTab === 'current' && (
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors duration-200"
                    >
                      <Icon name="Plus" size={16} />
                      <span>Create Goal</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Progress Chart Sidebar */}
            <div className="space-y-6">
              <ProgressChart data={weeklyProgress} />
              
              {/* Quick Stats */}
              <div className="bg-surface rounded-lg border border-border p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Goals this month</span>
                    <span className="font-semibold text-text-primary">{goals.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Completion rate</span>
                    <span className="font-semibold text-success">{overallProgress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Active streaks</span>
                    <span className="font-semibold text-warning">
                      {goals.filter(g => g.streak > 0).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Best category</span>
                    <span className="font-semibold text-primary">Fitness</span>
                  </div>
                </div>
              </div>

              {/* Motivation Card */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Keep it up!</h3>
                    <p className="text-sm text-text-secondary">You're doing great</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  You've maintained an average streak of {streakStats.avgStreak} days. 
                  Small consistent steps lead to big changes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
      <QuickActionMenu />

      {/* Goal Creation Modal */}
      {isCreateModalOpen && (
        <GoalCreationModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateGoal}
          categories={goalCategories}
        />
      )}

      {/* Achievement Celebration */}
      {showAchievement && achievementData && (
        <AchievementCelebration
          goal={achievementData}
          onClose={() => setShowAchievement(false)}
        />
      )}
    </div>
  );
};

export default GoalsProgress;