import t from '../../locales/en.js';
import './SearchBar.css';

export function SearchBar({ query, onQueryChange, category, onCategoryChange, categories }) {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={t.search.placeholder}
        aria-label={t.search.placeholder}
      />
      <select
        className="search-bar__select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label={t.search.filterLabel}
      >
        <option value="">{t.search.filterDefault}</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
