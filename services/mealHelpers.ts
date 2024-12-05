export const extractIngredients = (meal: any) => {
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push(`${measure ? measure : ""} ${ingredient}`);
    }
  }

  return ingredients;
};
