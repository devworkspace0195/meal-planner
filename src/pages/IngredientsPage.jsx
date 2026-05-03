import { useState, useRef } from 'react';
import { RecipeCard } from '../components/RecipeCard/index.jsx';
import { useRecipes } from '../context/RecipeContext.jsx';
import t from '../locales/en.js';
import './IngredientsPage.css';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

async function fetchMealsByIngredient(ingredient) {
  const res = await fetch(
    `${BASE}/filter.php?i=${encodeURIComponent(ingredient.trim())}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.meals ?? [];
}

function intersectMeals(resultsPerIngredient) {
  if (resultsPerIngredient.length === 0) return [];
  const [first, ...rest] = resultsPerIngredient;
  return first.filter((meal) =>
    rest.every((list) => list.some((m) => m.idMeal === meal.idMeal))
  );
}

export default function IngredientsPage() {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const { toggleSave, isSaved } = useRecipes();

  function addIngredient() {
    const val = inputValue.trim();
    if (!val) return;
    if (ingredients.some((i) => i.toLowerCase() === val.toLowerCase())) {
      setInputValue('');
      return;
    }
    setIngredients((prev) => [...prev, val]);
    setInputValue('');
    setResults(null);
    inputRef.current?.focus();
  }

  function removeIngredient(name) {
    setIngredients((prev) => prev.filter((i) => i !== name));
    setResults(null);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addIngredient();
    if (e.key === 'Backspace' && inputValue === '' && ingredients.length > 0) {
      setIngredients((prev) => prev.slice(0, -1));
      setResults(null);
    }
  }

  async function handleSearch() {
    if (ingredients.length === 0) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const allResults = await Promise.all(
        ingredients.map((ing) => fetchMealsByIngredient(ing))
      );
      setResults(intersectMeals(allResults));
    } catch {
      setError(t.ingredients.error);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setIngredients([]);
    setResults(null);
    setError(null);
    inputRef.current?.focus();
  }

  return (
    <div className="ing-page">
      <div className="ing-page__header">
        <h1 className="ing-page__heading">{t.ingredients.heading}</h1>
        <p className="ing-page__subheading">{t.ingredients.subheading}</p>
      </div>

      <div className="ing-page__input-area">
        <div className="ing-page__tag-input">
          {ingredients.map((name) => (
            <span key={name} className="ing-page__tag">
              {name}
              <button
                className="ing-page__tag-remove"
                onClick={() => removeIngredient(name)}
                aria-label={`${t.ingredients.removeIngredient} ${name}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            className="ing-page__input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={ingredients.length === 0 ? t.ingredients.inputPlaceholder : ''}
            aria-label={t.ingredients.inputPlaceholder}
          />
        </div>

        <div className="ing-page__controls">
          <button
            className="ing-page__btn ing-page__btn--add"
            onClick={addIngredient}
            disabled={!inputValue.trim()}
          >
            {t.ingredients.addButton}
          </button>
          <button
            className="ing-page__btn ing-page__btn--find"
            onClick={handleSearch}
            disabled={ingredients.length === 0 || loading}
          >
            {loading ? t.ingredients.loading : t.ingredients.findButton}
          </button>
          {ingredients.length > 0 && (
            <button className="ing-page__btn ing-page__btn--clear" onClick={handleClear}>
              {t.ingredients.clearAll}
            </button>
          )}
        </div>
      </div>

      {error && <p className="ing-page__message ing-page__message--error">{error}</p>}

      {results !== null && (
        <div className="ing-page__results">
          <h2 className="ing-page__results-heading">{t.ingredients.resultsHeading}</h2>
          {results.length === 0 ? (
            <p className="ing-page__message">{t.ingredients.noResults}</p>
          ) : (
            <div className="ing-page__grid">
              {results.map((meal) => (
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
      )}

      {results === null && !loading && !error && ingredients.length === 0 && (
        <p className="ing-page__message">{t.ingredients.emptyState}</p>
      )}
    </div>
  );
}
