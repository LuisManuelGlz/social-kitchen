import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import RecipesProvider from './context/RecipesContext';
import Routes from './routing/Routes';

function App() {
  return (
    <AuthProvider>
      <RecipesProvider>
        <Router>
          <Routes />
        </Router>
      </RecipesProvider>
    </AuthProvider>
  );
}

export default App;
