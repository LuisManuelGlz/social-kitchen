export interface RecipeAddDto {
  name: string;
  description: string;
  image: any;
  videoURL?: string;
  ingredients: string[];
  steps: string[];
  tags: any[];
};
