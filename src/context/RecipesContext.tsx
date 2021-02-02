import React, { createContext, ReactNode, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { firestore, storage } from '../firebase/config';
import RecipeType from '../types/recipe';
import { AuthContext } from './AuthContext';
import { RecipeAddDto } from '../interfaces/recipeAddDto';

type RecipesContextType = {
  recipes: RecipeType[];
  fetchRecipes: () => Promise<void>;
  fetchRecipe: (id: string) => Promise<RecipeType | null>;
  addRecipe: (recipe: RecipeAddDto) => Promise<void>;
};

interface Props {
  children: ReactNode;
}

export const RecipesContext = createContext({} as RecipesContextType);

const RecipesProvider = ({ children }: Props) => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const { user } = useContext(AuthContext);

  const uploadImage = async (file: any) => {
    const fileId = uuidv4();
    const storageRef = storage.ref();
    return await storageRef
      .child(`${user?.uid}/${fileId}`)
      .put(file, { contentType: 'image/jpg' });
  };

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

  const addRecipe = async ({
    name,
    description,
    image,
    steps,
    tags,
  }: RecipeAddDto) => {
    try {
      const snapshot = await uploadImage(image);
      const imageURL = await snapshot.ref.getDownloadURL();

      const recipe = {
        name,
        nameNormalized: name.toLocaleUpperCase(),
        description,
        imageURL,
        steps,
        tags,
        user: firestore.doc(`users/${user?.uid}`),
      };

      const docRef = await firestore.collection('recipes').add(recipe);
      const doc = await docRef.get();
      setRecipes((recipes) => [
        { id: doc.id, ...doc.data() } as RecipeType,
        ...recipes,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        fetchRecipes,
        fetchRecipe,
        addRecipe,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
