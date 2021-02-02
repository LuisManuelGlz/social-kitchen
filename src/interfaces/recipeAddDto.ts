export interface RecipeAddDto {
  name: string;
  description: string;
  image: any;
  videoURL?: string;
  steps: string[];
  tags: any[];
};
