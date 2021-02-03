import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import RecipesProvider from './context/RecipesContext';
import UserProvider from './context/UserContext';
import Routes from './routing/Routes';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RecipesProvider>
          <Router>
            <Routes />
          </Router>
        </RecipesProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
