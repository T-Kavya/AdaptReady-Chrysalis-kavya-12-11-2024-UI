// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const SearchResults = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { dishes } = location.state || { dishes: [] };

//   return (
//     <div>
//       <h2>Search Results</h2>
//       {dishes.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Origin</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dishes.map((dish) => (
//               <tr key={dish.id} onClick={() => navigate(`/dish/${dish.id}`)}>
//                 <td>{dish.name}</td>
//                 <td>{dish.diet}</td>
//                 <td>{dish.prep_time}</td>
//                 <td>{dish.cook_time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../scss/DishSearchDetails.scss'; // Custom CSS file for styling
import DishTable from './DishTable'

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dishes } = location.state || { dishes: [] };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of rows per page

  const totalPages = Math.ceil(dishes.length / itemsPerPage);

  // Get current page data
  const currentData = dishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="search-results">
              <DishTable  dishes={currentData} title="Search Results" />

      {/* <h2>Search Results</h2>
      {currentData.length > 0 ? (
        <>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Diet</th>
                <th>Prep Time</th>
                <th>Cook Time</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((dish) => (
                <tr
                >
                  <td>{dish.name}</td>
                  <td>{dish.diet}</td>
                  <td>{dish.prep_time}</td>
                  <td>{dish.cook_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No results found.</p>
      )} */}
    </div>
  );
};

export default SearchResults;
