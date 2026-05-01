import { createContext, useContext, useState } from 'react';
import { getSavedMeals, setSavedMeals, getPlanner, setPlanner } from '../utils/storage.js';

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [savedMeals, setSavedMealsState] = useState(() => getSavedMeals());
  const [planner, setPlannerState] = useState(() => getPlanner());

  function toggleSave(meal) {
    setSavedMealsState((prev) => {
      const exists = prev.some((m) => m.idMeal === meal.idMeal);
      const next = exists
        ? prev.filter((m) => m.idMeal !== meal.idMeal)
        : [...prev, meal];
      setSavedMeals(next);
      return next;
    });
  }

  function isSaved(mealId) {
    return savedMeals.some((m) => m.idMeal === mealId);
  }

  function assignToDay(day, meal) {
    setPlannerState((prev) => {
      const next = { ...prev, [day]: meal };
      setPlanner(next);
      return next;
    });
  }

  function removeFromDay(day) {
    setPlannerState((prev) => {
      const next = { ...prev };
      delete next[day];
      setPlanner(next);
      return next;
    });
  }

  return (
    <RecipeContext.Provider value={{ savedMeals, toggleSave, isSaved, planner, assignToDay, removeFromDay }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error('useRecipes must be used inside RecipeProvider');
  return ctx;
}
