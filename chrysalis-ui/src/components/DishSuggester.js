import React, { useState, useMemo } from 'react';
import '../scss/DishSuggester.scss';
import { getDishDetails } from "../api/api";
import DishTable from './DishTable'


function DishSuggester() {
  const [ingredients, setIngredients] = useState([]);
  const [suggestedDishes, setSuggestedDishes] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const suggestDishes = () => {
    fetch('http://localhost:3001/api/dishes/byIngredients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    })
      .then((res) => res.json())
      .then((data) => setSuggestedDishes(data));
  };

  return (
    <div className="dish-suggester p-4">
      <h2 className="text-2xl font-bold mb-4">Dish Suggester</h2>
      <div className="ingredient-input mb-4">
        <input
          type="text"
          placeholder="Add ingredient"
          className="ingredient-input-field"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addIngredient(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>

      <div className="ingredients-list mb-4">
        {ingredients.map((ing) => (
          <span key={ing} className="ingredient-chip">
            {ing}
            <button
              onClick={() => removeIngredient(ing)}
              className="remove-ingredient-btn"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <button
        onClick={suggestDishes}
        className="suggest-dishes-btn"
      >
        Suggest Dishes
      </button>
      <DishTable dishes={suggestedDishes} title="Suggested Dishes" />
    </div>
  );
}

export default DishSuggester;
