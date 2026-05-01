import { useRecipes } from '../context/RecipeContext.jsx';
import { RecipeCard } from '../components/RecipeCard/index.jsx';
import t from '../locales/en.js';
import './SavedPage.css';

export default function SavedPage() {
  const { savedMeals, toggleSave, isSaved } = useRecipes();

  return (
    <div className="saved-page">
      <h1 className="saved-page__heading">{t.saved.heading}</h1>

      {savedMeals.length === 0 ? (
        <p className="saved-page__empty">{t.saved.empty}</p>
      ) : (
        <div className="saved-page__grid">
          {savedMeals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              isSaved={isSaved(meal.idMeal)}
              onSave={toggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
}
