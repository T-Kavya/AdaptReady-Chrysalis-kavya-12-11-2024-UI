## Introduction
Design and implement web application systems to assist users interested in exploring the Indian cuisine

## Technologies used
- [ReactJS](https://react.dev/) - Its an ReactJS application for Frontend application.
    - [Material UI](https://mui.com/material-ui/) - For UI layouts, themes and components
-[NodeJS](https://nodejs.org/en) -  Its an NodeJS application for backend application.
- [ExpressJS] (https://nodejs.org/en) - some Features

## This project contains the following Modules and components

    * Dashboard
        * Quick glace on all functionalities.
        * It has 2 cards for explore all dishes and to Ask the suggestions based on ingredients
    * Dishes
        * On first load you can see the table which gives all DIshes deatils.
        * Can apply the filters based on fields like Diet, State, Region, Flavor_profiles.
        * Can see the details based on filters applied.
        * Can CLEAR filters by clicking on CLEAR FILTER.
    * Suggest
        * on first load you can search for the ingredients of your taste.
        * upon entering  the ingredient and click on Suggest Dishes button, it will show all the dishes that all contains your ingredient 
        * Shows in tabular format, can sort the fields and it includes pagination.
    * Search
        * In Header you can see search bar, where you can type anything based on that it will show all dishes with respective.
        * Upon clicking the enter button it will show the dishes in tabular format.
        * In table it includes sorting and pagination and you can easily access data.


## Project Structure
Created API and UI structure using NodeJs and ReactJS.
src/ ├── components/ 
	│ ├── Header.jsx 
	│ ├── DishesList.jsx 
	│ ├── DishDetails.jsx 
	│ ├── DishSuggester.jsx 
	├── pages/ 
	│ ├── Home.jsx 
	│ ├── DishDetailsPage.jsx 
	│ ├── DishSuggesterPage.jsx 
    ├── scss/
    │ ├── App.scss
    │ ├── Card.scss
    │ ├── Dashboard.scss
    │ ├── DishList.scss
    │ ├── DishSearchDetails.scss
    │ ├── DishSuggester.scss
    │ ├── Header.scss
	├── App.jsx
    ├── App.test.js
    ├── index.css 
	├── index.js 
    ├── reportWebVitals.js
    ├── setupTests.js
	├── api/ 
	│ ├── api.js 
	└── styles/ ├── styles.css

## Local Provisioning UI

1. Install Dependencies
    - Run npm i to install dependencies.
2. Launch the App:
    - Run npm start
    - Access the chrysalis UI at [https://localhost:3000](https://localhost:3000)

## Local Provisioning API

2. Install local dependencies by using npm i.
3. Spin up this API repo locally by running npm index.js.

## Scripts
Created script to convert the CSV file format to JSOn file format. 
•⁠  ⁠In Script file handled all special cases for
	- converting ingrediets to array of strings format
	- handling '-1' value for all attributes like prep_time, cook_time, flavor_profiles, region and state.
•⁠  ⁠After handling all cases converted to JSON format and created file in the same folder.