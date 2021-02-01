import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';

const Recipes = () => {
  const { recipes, fetchRecipes } = useContext(RecipesContext);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      Recipes
      <ul>
        {recipes.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/recipes/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
