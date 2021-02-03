import React, { useContext } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Recipes from '../pages/Recipes';
import RecipesDetail from '../pages/RecipesDetail';
import RecipesAdd from '../pages/RecipesAdd';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import { AuthContext } from '../context/AuthContext';

const Routes = () => {
  const { user, signOut } = useContext(AuthContext);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Social Kitchen</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/add">Add recipe</Link>
              </li>
              <li>
                <Link to={`/profile/${user.uid}`}>Profile</Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <Switch>
        <PublicRoute exact path="/" component={Home} />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute exact path="/recipes" component={Recipes} />
        <PrivateRoute exact path="/recipes/:id" component={RecipesDetail} />
        <PrivateRoute path="/add" component={RecipesAdd} />
        <PrivateRoute path="/profile/:id" component={Profile} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
};

export default Routes;
