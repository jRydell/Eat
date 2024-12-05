type Ingredient = {
  [key: string]: string | undefined;
};

export const extractIngredients = (ingredient: Ingredient) => {
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ing = ingredient[`strIngredient${i}`];
    const measure = ingredient[`strMeasure${i}`];

    if (ing) {
      ingredients.push(`${measure ? measure : ""} ${ing}`);
    }
  }

  return ingredients;
};
