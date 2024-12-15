// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import DishDetailsPage from './pages/DishDetailsPage';
// import DishSuggesterPage from './pages/DishSuggesterPage';
// import Header from './components/Header';

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dish/:id" element={<DishDetailsPage />} />
//         <Route path="/suggest" element={<DishSuggesterPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from './components/Header';
// import DishesList from './components/DishesList';
// import DishDetails from './components/DishDetails';
// import DishSuggester from './components/DishSuggester';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Switch>
//           <Route exact path="/" component={DishesList} />
//           <Route path="/dish/:id" component={DishDetails} />
//           <Route path="/suggester" component={DishSuggester} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DishesList from './components/DishesList';
import DishDetails from './components/DishDetails';
import DishSuggester from './components/DishSuggester';
import Header from './components/Header';
import SearchResults from './components/DishSearchDetails';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/dishlist" element={<DishesList />} />
        <Route path="/dish/:id" element={<DishDetails />} />
        <Route path="/suggest" element={<DishSuggester />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;