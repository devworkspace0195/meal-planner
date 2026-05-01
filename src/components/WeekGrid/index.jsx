import { useState } from 'react';
import { Link } from 'react-router-dom';
import t from '../../locales/en.js';
import './WeekGrid.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function WeekGrid({ planner, onDrop, onRemove }) {
  const [dragOverDay, setDragOverDay] = useState(null);

  function handleDragOver(e, day) {
    e.preventDefault();
    setDragOverDay(day);
  }

  function handleDragLeave() {
    setDragOverDay(null);
  }

  function handleDrop(e, day) {
    e.preventDefault();
    setDragOverDay(null);
    try {
      const meal = JSON.parse(e.dataTransfer.getData('application/json'));
      onDrop(day, meal);
    } catch {
      // malformed drag data
    }
  }

  return (
    <div className="week-grid">
      {DAYS.map((day) => {
        const meal = planner[day] ?? null;
        const isOver = dragOverDay === day;

        return (
          <div
            key={day}
            className={`week-grid__slot${isOver ? ' week-grid__slot--over' : ''}`}
            onDragOver={(e) => handleDragOver(e, day)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, day)}
          >
            <span className="week-grid__day">{day}</span>

            {meal ? (
              <div className="week-grid__meal">
                <img
                  className="week-grid__meal-img"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                />
                <div className="week-grid__meal-info">
                  <Link
                    to={`/recipe/${meal.idMeal}`}
                    className="week-grid__meal-name"
                  >
                    {meal.strMeal}
                  </Link>
                  <button
                    className="week-grid__remove"
                    onClick={() => onRemove(day)}
                    aria-label={`${t.planner.removeMeal} ${meal.strMeal}`}
                  >
                    {t.planner.removeMeal}
                  </button>
                </div>
              </div>
            ) : (
              <p className="week-grid__empty">{t.planner.empty}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
