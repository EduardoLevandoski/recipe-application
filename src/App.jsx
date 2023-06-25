import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
