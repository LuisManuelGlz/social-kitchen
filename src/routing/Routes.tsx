import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Recipes from '../pages/Recipes';
import RecipesDetail from '../pages/RecipesDetail';
import RecipesAdd from '../pages/RecipesAdd';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Social Kitchen</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/add">Add recipe</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <Switch>
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute exact path="/recipes" component={Recipes} />
          <PublicRoute exact path="/recipes/:id" component={RecipesDetail} />
          <PublicRoute path="/add" component={RecipesAdd} />
          <PublicRoute path="/profile" component={Profile} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          {/* <PrivateRoute path="/" component={Box} /> */}
          <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default Routes;
