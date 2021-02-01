import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import RecipeType from '../../types/recipe';

const RecipesDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchRecipe } = useContext(RecipesContext);

  useEffect(() => {
    setIsLoading(true);
    fetchRecipe(id).then((doc) => {
      setRecipe(doc);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>{recipe?.name}</div>
      <div>{recipe?.description}</div>
      <ul>
        {recipe?.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesDetail;
