// // src/components/DishDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getDishDetails } from '../api/api';

// const DishDetails = () => {
//   const { id } = useParams();
//   const [dish, setDish] = useState(null);

//   useEffect(() => {
//     const fetchDishDetails = async () => {
//       console.log(id);
//       const { data } = await getDishDetails(id);
//       setDish(data);
//     };
//     fetchDishDetails();
//   }, [id]);

//   if (!dish) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{dish.name}</h1>
//       <p><b>Ingredients:</b> {dish.ingredients.join(', ')}</p>
//       <p><b>Diet:</b> {dish.diet}</p>
//       <p><b>Prep Time:</b> {dish.prep_time} minutes</p>
//       <p><b>Cooking Time:</b> {dish.cook_time} minutes</p>
//       <p><b>Flavor:</b> {dish.flavor}</p>
//       <p><b>Course:</b> {dish.course}</p>
//       <p><b>State:</b> {dish.state}</p>
//       <p><b>Region:</b> {dish.region}</p>
//     </div>
//   );
// };

// export default DishDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// interface Dish {
//   id: number;
//   name: string;
//   ingredients: string;
//   diet: string;
//   prep_time: string;
//   cook_time: string;
//   flavor_profile: string;
//   course: string;
//   state: string;
//   region: string;
// }

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