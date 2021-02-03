import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import { UserContext } from '../../context/UserContext';
import RecipeType from '../../types/recipe';
import UserType from '../../types/user';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchUserById } = useContext(UserContext);
  const { fetchRecipesByUserId } = useContext(RecipesContext);
  const [user, setUser] = useState<UserType | null>(null);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    fetchUserById(id).then((userFetched) => {
      setUser(userFetched);
    });
    fetchRecipesByUserId(id).then((recipesFetched) => {
      setRecipes(recipesFetched);
    });
  }, []);

  return (
    <div>
      Profile
      {user?.photoURL}
      {user?.displayName}
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

export default Profile;
