import { Meal } from "@/types/meal";

export const extractIngredients = (meal: Meal) => {
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (meal) {
      ingredients.push(`${measure ? measure : ""} ${ingredient}`);
    }
  }

  return ingredients;
};
