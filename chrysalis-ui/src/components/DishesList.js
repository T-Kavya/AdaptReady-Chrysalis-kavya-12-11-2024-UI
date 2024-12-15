
import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Collapse,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { getDishes, getDishDetails } from "../api/api"; // Assuming `getDishDetails` is the API for fetching details
import '../scss/DishesList.scss'; import Paper from '@mui/material/Paper';
import DishTable from './DishTable'
// import Modal from 'react-modal';
import { Modal, Button, Checkbox, FormControlLabel } from "@mui/material";



const DishesList = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState({});
  const [filteredDishes, setFilteredDishes] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

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

  const recordsAfterPagingAndSorting = useMemo(() => {
    return stableSort(
      dishes,
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }, [dishes, order, orderBy, page, rowsPerPage]);

  const handleRowExpand = async (dishId) => {
    if (expandedRow === dishId) {
      setExpandedRow(null); // Collapse if already expanded
    } else {
      setExpandedRow(dishId); // Expand this row
      if (!expandedDetails[dishId]) {
        try {
          const { data } = await getDishDetails(dishId); // Fetch details if not cached
          setExpandedDetails((prev) => ({ ...prev, [dishId]: data }));
        } catch (error) {
          console.error("Failed to fetch dish details:", error);
        }
      }
    }
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
    <div class="dishlist">


      {/* <div>
        <button onClick={openModal}>Open Modal</button>

        {isModalOpen && (
          <div style={modalStyle}>
            <div style={modalContentStyle}>
              <h2>Filter</h2>
              <div className="Diet">
                {Object.entries(categories).map(([categoryName, items]) => (
                  <div key={categoryName} className="category">
                    <h3 className="category-title">
                      {categoryName.toUpperCase()}
                    </h3>
                    <div className="checkbox-grid">
                      {items.flat().map((item) => (
                        <div key={item} className="checkbox-item">
                          <input
                            type="checkbox"
                            id={`${categoryName}-${item}`}
                            name={item}
                            checked={checkedItems[categoryName]?.[item] || false}
                            onChange={() => {
                              handleCheckboxChange(categoryName, item);
                              console.log("Checked Items: ", categoryName, item);
                            }}
                          />
                          <label htmlFor={`${categoryName}-${item}`}>
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p>This is a modal content.</p>
              <button onClick={closeModal}>Close Modal</button>
            </div>
          </div>
        )}
      </div> */}

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

      {/* <TableContainer component={Paper}>
        
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.disableSorting ? (
                    headCell.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleSortRequest(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {recordsAfterPagingAndSorting.map((dish) => (
              <React.Fragment key={dish.id}>
                <TableRow hover>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleRowExpand(dish.name)}
                    >
                      {expandedRow === dish.name ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{dish.name}</TableCell>
                  <TableCell>{dish.diet}</TableCell>
                  <TableCell>{dish.prep_time}</TableCell>
                  <TableCell>{dish.cook_time}</TableCell>
                  <TableCell>{dish.region}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedRow === dish.name} timeout="auto" unmountOnExit className="details-collapse">
                      <Box className="details-box">
                        <fieldset className="details-fieldset">
                          <legend>
                            <Typography variant="h6" className="details-title">
                              {dish.name}
                            </Typography>
                          </legend>
                          <div className="details-grid">
                            <div className="details-item">
                              <strong>Ingredients:</strong>
                              <span>{dish.ingredients.join(', ')}</span>
                            </div>
                            <div className="details-item">
                              <strong>Diet:</strong>
                              <span>{dish.diet}</span>
                            </div>
                            <div className="details-item">
                              <strong>Prep Time:</strong>
                              <span>{dish.prep_time} mins</span>
                            </div>
                            <div className="details-item">
                              <strong>Cooking Time:</strong>
                              <span>{dish.cook_time} mins</span>
                            </div>
                            <div className="details-item">
                              <strong>Flavor:</strong>
                              <span>{dish.flavor_profile}</span>
                            </div>
                            <div className="details-item">
                              <strong>Course:</strong>
                              <span>{dish.course}</span>
                            </div>
                            <div className="details-item">
                              <strong>State:</strong>
                              <span>{dish.state}</span>
                            </div>
                            <div className="details-item">
                              <strong>Region:</strong>
                              <span>{dish.region}</span>
                            </div>
                          </div>
                        </fieldset>
                      </Box>
                      {/* </Box> */}

      {/* </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      {/* <TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={rowsPerPage}
        count={dishes.length}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          if(parseInt(event.target.value, 10) > 0) {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }
          
        }}
      /> */}

      {/* </CardContent>
       </Card>   */}



    </div>
  );

};

export default DishesList;
// const modalStyle = {
//   // position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   maxHeight: "60vh",
//   backgroundColor: "white",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   overFlow: "auto",
//   position: 'absolute',
//   zIndex: '32'
// };

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

const modalContentStyle = {
  backgroundColor: "#fff",
  // padding: "20px",
  borderRadius: "5px",
  width: "100vw",
  maxHeight: "100vh",
  textAlign: "center",
};

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// // interface Dish {
// //   id: number;
// //   name: string;
// //   diet: string;
// //   prep_time: string;
// //   cook_time: string;
// //   state: string;
// // }

// function DishesList() {
//   const [dishes, setDishes] = useState([]);
//   const [page, setPage] = useState(1);
//   const [sortBy, setSortBy] = useState('name');
//   const [filterDiet, setFilterDiet] = useState('');

//   useEffect(() => {
//     fetch(`http://localhost:3001/api/dishes?page=${page}&sortBy=${sortBy}&diet=${filterDiet}`)
//       .then(res => res.json())
//       .then(data => setDishes(data));
//   }, [page, sortBy, filterDiet]);

//   return (
//     <div className="dishes-list">
//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => setSortBy('name')}>Name</th>
//             <th onClick={() => setSortBy('prep_time')}>Prep Time</th>
//             <th onClick={() => setSortBy('cook_time')}>Cook Time</th>
//             <th>
//               <select onChange={(e) => setFilterDiet(e.target.value)}>
//                 <option value="">All</option>
//                 <option value="vegetarian">Vegetarian</option>
//                 <option value="non-vegetarian">Non-Vegetarian</option>
//               </select>
//             </th>
//             <th>State</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dishes.map(dish => (
//             <tr key={dish.name}>
//               <td><Link to={`/dish/${dish.name}`}>{dish.name}</Link></td>
//               <td>{dish.prep_time}</td>
//               <td>{dish.cook_time}</td>
//               <td>{dish.diet}</td>
//               <td>{dish.state}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         <button onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>
//         <span>Page {page}</span>
//         <button onClick={() => setPage(p => p + 1)}>Next</button>
//       </div>
//     </div>
//   );
// }

// export default DishesList;