import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GoalCreationModal = ({ isOpen, onClose, onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'fitness',
    type: 'daily',
    target: '',
    unit: '',
    difficulty: 'medium',
    reminderEnabled: true,
    reminderTime: '09:00'
  });

  const [errors, setErrors] = useState({});

  const goalTypes = [
    { id: 'daily', label: 'Daily', description: 'Complete every day' },
    { id: 'weekly', label: 'Weekly', description: 'Complete within a week' },
    { id: 'monthly', label: 'Monthly', description: 'Complete within a month' }
  ];

  const difficultyLevels = [
    { id: 'easy', label: 'Easy', color: 'text-success', description: 'Gentle start' },
    { id: 'medium', label: 'Medium', color: 'text-warning', description: 'Balanced challenge' },
    { id: 'hard', label: 'Hard', color: 'text-error', description: 'Push your limits' }
  ];

  const commonGoals = {
    fitness: [
      { title: 'Daily Steps', target: 10000, unit: 'steps' },
      { title: 'Workout Sessions', target: 3, unit: 'sessions' },
      { title: 'Active Minutes', target: 30, unit: 'minutes' },
      { title: 'Calories Burned', target: 500, unit: 'calories' }
    ],
    nutrition: [
      { title: 'Water Intake', target: 8, unit: 'glasses' },
      { title: 'Fruits & Vegetables', target: 5, unit: 'servings' },
      { title: 'Calorie Limit', target: 2000, unit: 'calories' },
      { title: 'Protein Intake', target: 100, unit: 'grams' }
    ],
    sleep: [
      { title: 'Sleep Duration', target: 8, unit: 'hours' },
      { title: 'Bedtime Consistency', target: 7, unit: 'days' },
      { title: 'Sleep Quality', target: 80, unit: 'score' }
    ],
    wellness: [
      { title: 'Meditation', target: 15, unit: 'minutes' },
      { title: 'Gratitude Journal', target: 1, unit: 'entry' },
      { title: 'Screen-free Time', target: 2, unit: 'hours' },
      { title: 'Deep Breathing', target: 5, unit: 'minutes' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCommonGoalSelect = (goal) => {
    setFormData(prev => ({
      ...prev,
      title: goal.title,
      target: goal.target,
      unit: goal.unit
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Goal title is required';
    }
    
    if (!formData.target || formData.target <= 0) {
      newErrors.target = 'Target must be greater than 0';
    }
    
    if (!formData.unit.trim()) {
      newErrors.unit = 'Unit is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const goalData = {
      ...formData,
      target: parseFloat(formData.target),
      id: Date.now(),
      current: 0,
      streak: 0,
      isActive: true,
      icon: categories.find(c => c.id === formData.category)?.icon || 'Target',
      color: categories.find(c => c.id === formData.category)?.color || 'primary',
      lastUpdated: 'Just now'
    };
    
    onSubmit(goalData);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[1200] fade-in" />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[1300] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-large border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-text-primary">Create New Goal</h2>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                        formData.category === category.id
                          ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark text-text-secondary'
                      }`}
                    >
                      <Icon name={category.icon} size={20} />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Common Goals */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Quick Templates
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {commonGoals[formData.category]?.map((goal, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleCommonGoalSelect(goal)}
                      className="text-left p-3 rounded-lg border border-border hover:border-primary hover:bg-primary-50 transition-all duration-200"
                    >
                      <div className="font-medium text-text-primary">{goal.title}</div>
                      <div className="text-sm text-text-secondary">
                        {goal.target} {goal.unit}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Goal Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                      errors.title
                        ? 'border-error ring-2 ring-error-100' :'border-border focus:border-primary focus:ring-2 focus:ring-primary-100'
                    }`}
                    placeholder="e.g., Daily Steps"
                  />
                  {errors.title && (
                    <p className="text-error text-xs mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Goal Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                  >
                    {goalTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Target Value *
                  </label>
                  <input
                    type="number"
                    name="target"
                    value={formData.target}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                      errors.target
                        ? 'border-error ring-2 ring-error-100' :'border-border focus:border-primary focus:ring-2 focus:ring-primary-100'
                    }`}
                    placeholder="e.g., 10000"
                    min="0"
                    step="0.1"
                  />
                  {errors.target && (
                    <p className="text-error text-xs mt-1">{errors.target}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Unit *
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                      errors.unit
                        ? 'border-error ring-2 ring-error-100' :'border-border focus:border-primary focus:ring-2 focus:ring-primary-100'
                    }`}
                    placeholder="e.g., steps, hours, glasses"
                  />
                  {errors.unit && (
                    <p className="text-error text-xs mt-1">{errors.unit}</p>
                  )}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, difficulty: level.id }))}
                      className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                        formData.difficulty === level.id
                          ? 'border-primary bg-primary-50' :'border-border hover:border-border-dark'
                      }`}
                    >
                      <div className={`font-medium ${level.color}`}>{level.label}</div>
                      <div className="text-xs text-text-secondary mt-1">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reminder Settings */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-text-primary">
                    Enable Reminders
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="reminderEnabled"
                      checked={formData.reminderEnabled}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                {formData.reminderEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Reminder Time
                    </label>
                    <input
                      type="time"
                      name="reminderTime"
                      value={formData.reminderTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-700 transition-colors duration-200"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalCreationModal;