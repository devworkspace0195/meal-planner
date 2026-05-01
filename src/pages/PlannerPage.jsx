import { useRecipes } from '../context/RecipeContext.jsx';
import { WeekGrid } from '../components/WeekGrid/index.jsx';
import t from '../locales/en.js';
import './PlannerPage.css';

export default function PlannerPage() {
  const { savedMeals, planner, assignToDay, removeFromDay } = useRecipes();

  function handleDragStart(e, meal) {
    e.dataTransfer.setData('application/json', JSON.stringify(meal));
    e.dataTransfer.effectAllowed = 'copy';
  }

  return (
    <div className="planner-page">
      <h1 className="planner-page__heading">{t.planner.heading}</h1>

      <div className="planner-page__layout">
        <aside className="planner-page__sidebar">
          <h2 className="planner-page__sidebar-title">{t.planner.sidebarHeading}</h2>

          {savedMeals.length === 0 ? (
            <p className="planner-page__no-saved">{t.planner.noSaved}</p>
          ) : (
            <>
              <p className="planner-page__hint">{t.planner.dragHint}</p>
              <ul className="planner-page__meal-list">
                {savedMeals.map((meal) => (
                  <li
                    key={meal.idMeal}
                    className="planner-page__meal-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, meal)}
                  >
                    <img
                      className="planner-page__meal-thumb"
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                    />
                    <span className="planner-page__meal-name">{meal.strMeal}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>

        <div className="planner-page__grid">
          <WeekGrid
            planner={planner}
            onDrop={assignToDay}
            onRemove={removeFromDay}
          />
        </div>
      </div>
    </div>
  );
}
