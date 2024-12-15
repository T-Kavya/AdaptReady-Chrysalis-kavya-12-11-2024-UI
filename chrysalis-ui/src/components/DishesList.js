
import React, { useState, useEffect, useMemo } from "react";
import { getDishes, getDishDetails } from "../api/api";
import '../scss/DishesList.scss';
import DishTable from './DishTable'
import { Modal, Button, Checkbox,  Box, Typography, FormControlLabel } from "@mui/material";

const DishesList = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDishes, setFilteredDishes] = useState([]);

  const diet = ["vegetarian", "non vegetarian"];
  const flavor = ["spicy", "sweet", "bitter"];
  const course = ["main course", "snack", "dessert"];
  const region = [
    "East",
    "West",
    "North",
    "South",
    "North East",
    "Central",
  ];
  const state = [
    "Karnataka",
    "West Bengal",
    "Rajasthan",
    "Punjab",
    "Uttar Pradesh",
    "Odisha",
    "Uttarkhand",
    "Maharashtra",
    "Assam",
    "Bihar",
    "Andhra Pradesh",
    "Telangana",
    "Kerala",
    "Tamil Nadu",
    "Gujarat",
    "Tripura",
    "Manipur",
    "Nagaland",
    "NCT of Delhi",
    "Jammu & Kashmir",
    "Chattisgarh",
    "Haryana",
    "Goa",
    "Madhya Pradesh",
  ];


  useEffect(() => {
    const fetchDishes = async () => {
      const { data } = await getDishes();
      setDishes(data);
      setFilteredDishes(data);
      setLoading(false);
    };
    fetchDishes();
  }, []);

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  const categories = { diet, flavor, course, region, state };
  const handleCheckboxChange = (category, item) => {
    setCheckedItems((prevState) => {
      const categoryItems = prevState[category] || [];
      return {
        ...prevState,
        [category]: [...categoryItems, item],


      };

    });
    console.log("chaeckedItems: ", checkedItems);
  };


  const getFilteredDishes = () => {
    let newDishes = [];
    let diet = checkedItems.diet || [];
    let flavor_profile = checkedItems.flavor || [];
    let state = checkedItems.state || [];
    let course = checkedItems.course || [];
    let region = checkedItems.region || [];
    let prep_time = 1000;
    let cook_time = 1000;

    dishes.forEach(dish => {

      if ((diet.length == 0 || diet.includes(dish.diet)) &&
        (flavor_profile.length == 0 || flavor_profile.includes(dish.flavor_profile)) &&
        (state.length == 0 || state.includes(dish.state)) &&
        (course.length == 0 || course.includes(dish.course)) &&
        (region.length == 0 || state.includes(dish.region)) &&
        (prep_time == 0 || prep_time >= dish.prep_time) &&
        (cook_time == 0 || cook_time >= dish.cook_time)) {
        console.log(dish);
        newDishes.push(dish);
      }
      setFilteredDishes(newDishes);
    });

    closeModal();
  }

  const clearFilters = () => {
    setCheckedItems({});
    setFilteredDishes(dishes);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dishlist">
      <div>
        <div id='filter-button'>
          <Button variant="contained" onClick={openModal}>
            Filter Dishes
          </Button>
          <Button onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>

        <Modal open={isModalOpen} onClose={closeModal}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" gutterBottom>
              Filter
            </Typography>
            <div className="Diet">
              {Object.entries(categories).map(([categoryName, items]) => (
                <div key={categoryName} className="category" style={{ marginBottom: "16px" }}>
                  <Typography variant="subtitle1" component="h3" sx={{ fontWeight: "bold" }}>
                    {categoryName.toUpperCase()}
                  </Typography>
                  <div className="checkbox-grid" style={{ display: "grid", gap: "8px" }}>
                    {items.map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            id={`${categoryName}-${item}`}
                            checked={checkedItems[categoryName]?.includes(item) || false}
                            onChange={() => handleCheckboxChange(categoryName, item)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={getFilteredDishes}
              variant="contained"
              sx={{ mt: 2 }}
              color="success"
            >
              Apply
            </Button>
          </Box>
        </Modal>
      </div>
      <DishTable dishes={filteredDishes} title="Dish List" />
    </div>
  );

};

export default DishesList;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85vw",
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '80vh',
  overflow: 'auto'
};
