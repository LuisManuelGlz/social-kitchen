import React, { createContext, ReactNode, useState } from 'react';
import { firestore } from '../firebase/config';
import RecipeType from '../types/recipe';

type RecipesContextType = {
  recipes: RecipeType[];
  fetchRecipes: () => Promise<void>;
  fetchRecipe: (id: string) => Promise<RecipeType | null>;
};

interface Props {
  children: ReactNode;
}

export const RecipesContext = createContext({} as RecipesContextType);

const RecipesProvider = ({ children }: Props) => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const fetchRecipes = async () => {
    const recipesFetched: RecipeType[] = [];
    try {
      const querySnapshot = await firestore.collection('recipes').get();
      querySnapshot.forEach((doc) => {
        recipesFetched.push({ id: doc.id, ...doc.data() } as RecipeType);
      });
      setRecipes(recipesFetched);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecipe = async (id: string) => {
    let recipe = null;
    try {
      const doc = await firestore.collection('recipes').doc(id).get();
      recipe = { id: doc.id, ...doc.data() } as RecipeType;
    } catch (error) {
      console.log(error);
    }
    return recipe;
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        fetchRecipes,
        fetchRecipe,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
