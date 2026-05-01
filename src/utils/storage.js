const KEYS = {
  savedMeals: 'savedMeals',
  planner: 'planner',
};

export function getSavedMeals() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.savedMeals) || '[]');
  } catch {
    return [];
  }
}

export function setSavedMeals(meals) {
  localStorage.setItem(KEYS.savedMeals, JSON.stringify(meals));
}

export function getPlanner() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.planner) || '{}');
  } catch {
    return {};
  }
}

export function setPlanner(planner) {
  localStorage.setItem(KEYS.planner, JSON.stringify(planner));
}
