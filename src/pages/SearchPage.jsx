import { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar/index.jsx';
import { RecipeCard } from '../components/RecipeCard/index.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { useRecipes } from '../context/RecipeContext.jsx';
import t from '../locales/en.js';
import './SearchPage.css';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const { toggleSave, isSaved } = useRecipes();

  const searchUrl = useMemo(() => {
    if (category) return `${BASE}/filter.php?c=${encodeURIComponent(category)}`;
    if (query.trim()) return `${BASE}/search.php?s=${encodeURIComponent(query.trim())}`;
    return `${BASE}/search.php?s=chicken`;
  }, [query, category]);

  const { data: searchData, loading, error } = useFetch(searchUrl);
  const { data: catData } = useFetch(`${BASE}/categories.php`);

  const meals = searchData?.meals ?? [];
  const categories = catData?.categories?.map((c) => c.strCategory) ?? [];

  return (
    <div className="search-page">
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />

      <div className="search-page__status">
        {loading && <p className="search-page__message">{t.search.loading}</p>}
        {error && <p className="search-page__message search-page__message--error">{t.search.error}</p>}
        {!loading && !error && meals.length === 0 && (
          <p className="search-page__message">{t.search.resultsEmpty}</p>
        )}
      </div>

      <div className="search-page__grid">
        {meals.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            meal={meal}
            isSaved={isSaved(meal.idMeal)}
            onSave={toggleSave}
          />
        ))}
      </div>
    </div>
  );
}
