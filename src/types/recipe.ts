import UserType from "./user";

type RecipeType = {
  id: string;
  name: string;
  nameNormalize: string;
  description: string;
  imageURL: string;
  videoURL: string;
  ingredients: string[];
  steps: string[];
  tags: any[];
  user: UserType;
};

export default RecipeType;
