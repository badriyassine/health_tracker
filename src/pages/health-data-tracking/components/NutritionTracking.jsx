import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NutritionTracking = ({ onSave, isLoading }) => {
  const [nutritionData, setNutritionData] = useState({
    foodItem: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    portion: '',
    mealType: 'breakfast',
    notes: ''
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast', icon: 'Coffee', color: 'text-warning' },
    { value: 'lunch', label: 'Lunch', icon: 'Sun', color: 'text-primary' },
    { value: 'dinner', label: 'Dinner', icon: 'Moon', color: 'text-accent' },
    { value: 'snack', label: 'Snack', icon: 'Apple', color: 'text-success' }
  ];

  const commonFoods = [
    { name: 'Banana (medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
    { name: 'Apple (medium)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 },
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    { name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5 },
    { name: 'Greek Yogurt (1 cup)', calories: 130, protein: 23, carbs: 9, fat: 0.4, fiber: 0 },
    { name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5 }
  ];

  const handleInputChange = (field, value) => {
    setNutritionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFoodSearch = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const filtered = commonFoods.filter(food =>
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectFood = (food) => {
    setNutritionData(prev => ({
      ...prev,
      foodItem: food.name,
      calories: food.calories.toString(),
      protein: food.protein.toString(),
      carbs: food.carbs.toString(),
      fat: food.fat.toString(),
      fiber: food.fiber.toString(),
      portion: '1 serving'
    }));
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(nutritionData);
  };

  const isFormValid = nutritionData.foodItem && nutritionData.calories;

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Apple" size={20} className="text-success" />
        <h2 className="text-lg font-semibold text-text-primary">Nutrition Tracking</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meal Type Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Meal Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mealTypes.map((meal) => (
              <button
                key={meal.value}
                type="button"
                onClick={() => handleInputChange('mealType', meal.value)}
                className={`flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all duration-200 ${
                  nutritionData.mealType === meal.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark text-text-secondary'
                }`}
              >
                <Icon name={meal.icon} size={20} className={meal.color} />
                <span className="text-sm font-medium">{meal.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Food Search */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Food Item
          </label>
          <div className="relative">
            <input
              type="text"
              value={nutritionData.foodItem}
              onChange={(e) => {
                handleInputChange('foodItem', e.target.value);
                handleFoodSearch(e.target.value);
              }}
              placeholder="Search for food or enter manually"
              className="w-full px-3 py-2 pr-10 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Icon name="Search" size={16} className="text-text-secondary" />
              )}
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 bg-surface border border-border rounded-md shadow-medium max-h-48 overflow-y-auto">
              {searchResults.map((food, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectFood(food)}
                  className="w-full px-3 py-2 text-left hover:bg-surface-secondary transition-colors duration-200 border-b border-border-light last:border-b-0"
                >
                  <div className="font-medium text-text-primary">{food.name}</div>
                  <div className="text-xs text-text-secondary">
                    {food.calories} cal • {food.protein}g protein • {food.carbs}g carbs
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Portion Size */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Portion Size
          </label>
          <input
            type="text"
            value={nutritionData.portion}
            onChange={(e) => handleInputChange('portion', e.target.value)}
            placeholder="1 cup, 100g, 1 piece, etc."
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          />
        </div>

        {/* Nutrition Facts */}
        <div className="bg-success-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">Nutrition Facts</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Calories
              </label>
              <input
                type="number"
                value={nutritionData.calories}
                onChange={(e) => handleInputChange('calories', e.target.value)}
                placeholder="0"
                className="w-full px-2 py-1 text-sm border border-border rounded bg-surface focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={nutritionData.protein}
                onChange={(e) => handleInputChange('protein', e.target.value)}
                placeholder="0"
                className="w-full px-2 py-1 text-sm border border-border rounded bg-surface focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Carbs (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={nutritionData.carbs}
                onChange={(e) => handleInputChange('carbs', e.target.value)}
                placeholder="0"
                className="w-full px-2 py-1 text-sm border border-border rounded bg-surface focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={nutritionData.fat}
                onChange={(e) => handleInputChange('fat', e.target.value)}
                placeholder="0"
                className="w-full px-2 py-1 text-sm border border-border rounded bg-surface focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Fiber (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={nutritionData.fiber}
                onChange={(e) => handleInputChange('fiber', e.target.value)}
                placeholder="0"
                className="w-full px-2 py-1 text-sm border border-border rounded bg-surface focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">Quick Add</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 p-3 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Camera" size={16} className="text-primary" />
              <span className="text-sm">Scan Barcode</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center space-x-2 p-3 bg-surface border border-border rounded-md hover:bg-primary-50 hover:border-primary transition-all duration-200"
            >
              <Icon name="Image" size={16} className="text-primary" />
              <span className="text-sm">Photo Food</span>
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Notes (optional)
          </label>
          <textarea
            value={nutritionData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="How did this meal make you feel?"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="flex-1 bg-success text-white py-3 px-4 rounded-md font-medium hover:bg-success-700 focus:ring-2 focus:ring-success-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Icon name="Save" size={16} />
                <span>Log Food</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setNutritionData({
              foodItem: '', calories: '', protein: '', carbs: '', fat: '',
              fiber: '', portion: '', mealType: 'breakfast', notes: ''
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

export default NutritionTracking;