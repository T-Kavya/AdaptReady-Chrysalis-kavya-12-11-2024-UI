import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function DishDetails() {
  const [dish, setDish] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/dishes/${name}`)
      .then(res => res.json())
      .then(data => setDish(data));
  }, [name]);

  if (!dish) return <div>Loading...</div>;

  return (
    <div className="dish-details">
      <h2>{dish.name}</h2>
      <p><strong>Ingredients:</strong> {dish.ingredients}</p>
      <p><strong>Diet:</strong> {dish.diet}</p>
      <p><strong>Prep Time:</strong> {dish.prep_time}</p>
      <p><strong>Cook Time:</strong> {dish.cook_time}</p>
      <p><strong>Flavor:</strong> {dish.flavor_profile}</p>
      <p><strong>Course:</strong> {dish.course}</p>
      <p><strong>State:</strong> {dish.state}</p>
      <p><strong>Region:</strong> {dish.region}</p>
    </div>
  );
}

export default DishDetails;