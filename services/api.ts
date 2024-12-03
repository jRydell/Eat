import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRandomMeal() {
  try {
    const response = await axios.get(`${API_URL}/random.php`);
    const data = response.data as { meals: any[] };
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching meal:", error);
    return null;
  }
}

export const extractIngredients = (meal: any) => {
  const ingredients: string[] = [];

  // Loop through the ingredients (MealDB provides ingredients as ingredientX and measureX)
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    // If the ingredient exists, add it to the list with the measure (if available)
    if (ingredient) {
      ingredients.push(`${measure ? measure : ""} ${ingredient}`);
    }
  }

  return ingredients;
};
