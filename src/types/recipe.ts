type RecipeType = {
  id: string;
  name: string;
  nameNormalize: string;
  description: string;
  imageURL: string;
  videoURL: string;
  steps: string[];
  tags: any[];
};

export default RecipeType;
