import React from 'react';
import { Link } from 'react-router-dom';

function Recipes() {
  return (
    <div>
      Recipes
      <Link to="/recipes/1">Details</Link>
    </div>
  );
}

export default Recipes;
