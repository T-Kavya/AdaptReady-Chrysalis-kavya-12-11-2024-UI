

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchDishes } from '../api/api';
import logoImage from "../assets/Logo.jpeg";
import { TextField } from '@mui/material';



const Header = () => {


  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();



  const handleSearchChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      const { data } = await searchDishes(e.target.value);
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      console.log(suggestions);
      navigate('/search', { state: { dishes: suggestions } });
      setSuggestions([]);
    }
  };

  const navigateMenu = [
    {
      title: "Dishes",
      url: "/dishlist",
    },
    {
      title: "Suggestor",
      url: "/suggest",
    },
  ];
  const navigateRoute = (route) => {
    navigate(`/${route}`);
  };

  return (
    <header>
      <div class="headers">
        <div class="headers--left">
          <div class="headers--left--logo">
            <a class='logo' role="link" href="/" onClick={() => navigateRoute("")}>
              Chrysalis
            </a>
          </div>
          <div class="headers--left--items">
            <ul>
              {navigateMenu.map((item, index) => (
                <li>
                  <a href={item.url} onClick={() => navigateRoute(item.url)}>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search dishes..."
          />
          {suggestions.length > 0 && (
            
            <ul className="suggestions">
              {suggestions.map(sugg => (
                <li key={sugg.id} onClick={() => navigate(`/dish/${sugg.id}`)}>
                  {sugg.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <hr />
    </header>
  );
}

export default Header;

