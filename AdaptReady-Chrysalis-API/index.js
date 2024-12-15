const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dishesData = require('./data/indian_food.json');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Utility to filter dishes by ingredients
const filterDishesByIngredients = (ingredients, dishes) => {
  return dishes.filter((dish) => {
    const dishIngredients = dish.ingredients.toLowerCase().split(',').map(i => i.trim());
    return ingredients.every((ingredient) => dishIngredients.includes(ingredient.toLowerCase()));
  });
};

// Get all dishes
app.get('/dishes', (req, res) => {
  res.json(dishesData);
});

// Suggest dishes based on ingredients
app.get('/suggest', (req, res) => {
  console.log("Request: ", req);
  const { ingredients } = req.body;

  console.log("ingredients: ", ingredients);
  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ message: 'Ingredients must be provided as an array' });
  }

  const possibleDishes = filterDishesByIngredients(ingredients, dishesData);
  res.json(possibleDishes);
});

// Get details for a specific dish by name
app.get('/dishes/:name', (req, res) => {
  const { name } = req.params;
  const dish = dishesData.find(d => d.name.toLowerCase() === name.toLowerCase());
  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
});

// Search dishes by name, ingredients, or origin
app.get('/search', (req, res) => {

  const { query } = req.query;
  console.log("Search API called with query:", query);

  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Query parameter is required and cannot be empty' });
  }

  const lowerQuery = query.trim().toLowerCase();

  const results = dishesData.filter((dish) =>
    dish.name.toLowerCase().includes(lowerQuery) ||
    dish.ingredients.join(' ').toLowerCase().includes(lowerQuery) ||
    dish.region.toLowerCase().includes(lowerQuery)
  );

  if (results.length === 0) {
    return res.status(404).json({ message: 'No dishes found matching the query' });
  }
  res.json(results);
});

app.get('/ingredients', (req, res) => {
  const allIngredients = new Set();
  dishesData.forEach((dish) => {
    dish.ingredients.forEach((ingredient) => {
      console.log(ingredient);
      allIngredients.add(ingredient)
    }
    );
  });
  res.json(Array.from(allIngredients));
});

// Endpoint to fetch details for a specific dish
app.get('/dish-details/:dish', (req, res) => {
  const dish = req.params.dish;
  const details = dishesData[dish];
  if (details) {
    res.json(details);
  } else {
    res.status(404).json({ error: 'Dish not found' });
  }
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// Get all dishes
app.get('/api/dishes', (req, res) => {
  res.json(dishesData);
});

// Get a specific dish
app.get('/api/dishes/:name', (req, res) => {
  const { name } = req.params;
  console.log(name);
  const dish = dishesData.find(d => d.name.toLowerCase() === name.toLowerCase());
  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
  // const result = dishesData.find(dish => d.id === parseInt(req.params.id));
  // if (!result) return res.status(404).send('Dish not found');
  // res.json(result);
});

// Find dishes by ingredients
app.post('/api/dishes/byIngredients', (req, res) => {
  const { ingredients } = req.body;
  // const possibleDishes = dishesData.filter(dish => 
  //   ingredients.every(ing => dish.ingredients.toLowerCase().includes(ing.toLowerCase()))
  // );
  const possibleDishes = dishesData.filter(dish =>
    ingredients.every(ing =>
      dish.ingredients.some(dishIng => dishIng.toLowerCase().includes(ing.toLowerCase()))
    ));
  res.json(possibleDishes);
});

const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));