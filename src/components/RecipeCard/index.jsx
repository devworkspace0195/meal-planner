import { Link } from 'react-router-dom';
import t from '../../locales/en.js';
import './RecipeCard.css';

export function RecipeCard({ meal, isSaved, onSave }) {
  if (!meal) return null;

  return (
    <article className="recipe-card">
      <Link to={`/recipe/${meal.idMeal}`} className="recipe-card__link">
        <img
          className="recipe-card__img"
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
        />
      </Link>
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{meal.strMeal}</h3>
        {meal.strCategory && (
          <span className="recipe-card__meta">{meal.strCategory}</span>
        )}
        <div className="recipe-card__actions">
          <Link to={`/recipe/${meal.idMeal}`} className="recipe-card__btn">
            {t.search.viewRecipe}
          </Link>
          <button
            className={`recipe-card__btn recipe-card__btn--${isSaved ? 'saved' : 'save'}`}
            onClick={() => onSave(meal)}
            aria-pressed={isSaved}
          >
            {isSaved ? t.search.savedLabel : t.search.saveLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
