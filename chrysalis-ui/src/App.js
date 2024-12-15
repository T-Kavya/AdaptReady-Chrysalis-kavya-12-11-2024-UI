import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DishesList from './components/DishesList';
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
        <Route path="/suggest" element={<DishSuggester />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;