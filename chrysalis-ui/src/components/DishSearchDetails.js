import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../scss/DishSearchDetails.scss';
import DishTable from './DishTable'

const SearchResults = () => {
  const location = useLocation();
  const { dishes } = location.state || { dishes: [] };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const currentData = dishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="search-results">
      <DishTable  dishes={currentData} title="Search Results" />
    </div>
  );
};

export default SearchResults;
