import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useFetch } from '../hooks/useFetch.js';
import t from '../locales/en.js';
import './RecipeDetailPage.css';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient: ingredient.trim(), measure: measure?.trim() || '' });
    }
  }
  return ingredients;
}

export default function RecipeDetailPage() {
  const { id } = useParams();

  const url = useMemo(() => `${BASE}/lookup.php?i=${encodeURIComponent(id)}`, [id]);
  const { data, loading, error } = useFetch(url);

  const meal = data?.meals?.[0] ?? null;

  const savedIds = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('savedIds') || '[]');
    } catch {
      return [];
    }
  }, []);

  const isSaved = savedIds.includes(id);

  function handleSave() {
    try {
      const current = JSON.parse(localStorage.getItem('savedIds') || '[]');
      const next = current.includes(id)
        ? current.filter((s) => s !== id)
        : [...current, id];
      localStorage.setItem('savedIds', JSON.stringify(next));
      window.location.reload();
    } catch {
      // localStorage unavailable
    }
  }

  if (loading) {
    return <p className="detail-status">{t.recipeDetail.loading}</p>;
  }

  if (error) {
    return <p className="detail-status detail-status--error">{t.recipeDetail.error}</p>;
  }

  if (!meal) {
    return <p className="detail-status">{t.recipeDetail.notFound}</p>;
  }

  const ingredients = getIngredients(meal);

  return (
    <div className="detail">
      <Link to="/search" className="detail__back">{t.recipeDetail.backToSearch}</Link>

      <div className="detail__hero">
        <img
          className="detail__img"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <div className="detail__header">
          <h1 className="detail__title">{meal.strMeal}</h1>
          <div className="detail__meta">
            {meal.strCategory && <span className="detail__tag">{meal.strCategory}</span>}
            {meal.strArea && <span className="detail__tag">{meal.strArea}</span>}
          </div>
          <div className="detail__actions">
            <button
              className={`detail__btn detail__btn--${isSaved ? 'saved' : 'save'}`}
              onClick={handleSave}
              aria-pressed={isSaved}
            >
              {isSaved ? t.recipeDetail.savedRecipe : t.recipeDetail.saveRecipe}
            </button>
            {meal.strYoutube && (
              <a
                className="detail__btn detail__btn--video"
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.recipeDetail.watchVideo}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="detail__body">
        <section className="detail__section">
          <h2 className="detail__section-title">{t.recipeDetail.ingredients}</h2>
          <ul className="detail__ingredients">
            {ingredients.map(({ ingredient, measure }) => (
              <li key={ingredient} className="detail__ingredient">
                <span className="detail__ingredient-name">{ingredient}</span>
                {measure && <span className="detail__ingredient-measure">{measure}</span>}
              </li>
            ))}
          </ul>
        </section>

        <section className="detail__section">
          <h2 className="detail__section-title">{t.recipeDetail.instructions}</h2>
          <p className="detail__instructions">{meal.strInstructions}</p>
        </section>
      </div>
    </div>
  );
}
