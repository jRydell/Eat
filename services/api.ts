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

export async function fetchMealById(idMeal: string) {
  try {
    const response = await axios.get(`${API_URL}/lookup.php?i=${idMeal}`);
    const data = response.data as { meals: any[] };
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    return null;
  }
}
